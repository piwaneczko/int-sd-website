#!/bin/bash
# Deploy script for I.N.T. Software Development
# Deploy target: synology:/volume1/web
#
# Usage: scripts/deploy.sh [-y|--yes] [-ncu|--no-changelog-update] [-h|--help]
# Run it with -h for the options. -y skips every confirmation (used when this
# script is called non-interactively, e.g. from scripts/release.sh).

set -e

usage() {
  cat <<'EOF'
Usage: scripts/deploy.sh [options]

Builds the site and deploys it to the Synology (rsync), then purges the CDN.

Before building it asks whether to refresh the public MINT changelog from the
sibling ../mint checkout (sanitizes each repo's CHANGELOG.md into its
CHANGELOG.public.md, then rebuilds src/data/mint-changelog.json). It also asks
before touching the server.

Options:
  -y,   --yes                  Answer yes to every question: update the public
                               changelog (unless -ncu is given) and deploy,
                               without prompting. Used by scripts/release.sh.
  -ncu, --no-changelog-update  Do not update the public changelog and do not ask
                               about it; build with the existing
                               src/data/mint-changelog.json. Works with or
                               without -y.
  -h,   --help                 Show this help and exit.

Examples:
  scripts/deploy.sh                # asks about the changelog, then about deploying
  scripts/deploy.sh -y             # updates the changelog and deploys, no questions
  scripts/deploy.sh -y -ncu        # deploys without touching the changelog, no questions
EOF
}

# --- args -------------------------------------------------------------
AUTO_YES=0
UPDATE_CHANGELOG=ask # ask | no
for arg in "$@"; do
  case "$arg" in
    -y|--yes) AUTO_YES=1 ;;
    -ncu|--no-changelog-update) UPDATE_CHANGELOG=no ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown argument: $arg" >&2; echo >&2; usage >&2; exit 1 ;;
  esac
done

# Run from the repo root regardless of the caller's cwd.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$REPO_ROOT"

echo "=========================================="
echo "  I.N.T. Software Development - Deploy"
echo "=========================================="

# Configuration
TARGET_HOST="synology"
TARGET_PATH="/volume1/web"
BUILD_DIR="./dist"
LOG_FILE="./deploy.log"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1"
}

# Answers a [Y/n] prompt. With -y/--yes, skips the read and answers "y"
# (still logged, so the transcript shows what was decided and why).
confirm() {
    local prompt="$1" reply
    if [ "$AUTO_YES" -eq 1 ]; then
        log "${prompt} [Y/n]: y (auto, -y)"
        return 0
    fi
    read -rp "${prompt} [Y/n]: " reply
    [[ -z "$reply" || "$reply" =~ ^[Yy]$ ]]
}

# Refresh the public MINT changelog from the sibling ../mint checkout, if
# present. This is the ONLY place ~/scripts/ai-sanitize-changelog.sh runs —
# it used to also run from each mint repo's own scripts/release.sh, but that
# coupled a firmware/app release to a website deploy (and to whatever
# AI-backend hiccups the sanitizer hits) for no good reason. Now a mint
# release only fills in CHANGELOG.md itself (ai-update-changelog.sh, run
# from release.sh); turning that into the public CHANGELOG.public.md happens
# here, right before it's actually published.
#
# For each mint repo present, (re)generate CHANGELOG.public.md from its
# CHANGELOG.md, then copy the sanitized files into a gitignored scratch dir
# and re-render the public data file consumed by the site
# (src/data/mint-changelog.json). Never touches ../mint's CHANGELOG.md
# itself — ai-sanitize-changelog.sh only ever writes CHANGELOG.public.md +
# its cache file in that repo.
if [ "$UPDATE_CHANGELOG" = no ]; then
    log "Skipping the public changelog update (-ncu), using the existing src/data/mint-changelog.json"
elif ! confirm "Update the public MINT changelog from ../mint?"; then
    log "Skipping the public changelog update, using the existing src/data/mint-changelog.json"
elif [ -d "../mint" ]; then
    SANITIZER="$HOME/scripts/ai-sanitize-changelog.sh"
    SANITIZER_ARGS=()
    [ "$AUTO_YES" -eq 1 ] && SANITIZER_ARGS+=(-y)
    for repo in firmware software; do
        if [ -d "../mint/$repo" ]; then
            log "Sanitizing ../mint/$repo/CHANGELOG.md -> CHANGELOG.public.md"
            ( cd "../mint/$repo" && "$SANITIZER" "${SANITIZER_ARGS[@]}" )
        else
            log_warning "../mint/$repo not found — skipping its changelog"
        fi
    done
    log "Refreshing MINT changelog from ../mint..."
    npm run mint-changelog
else
    log_warning "../mint not found — skipping changelog refresh, using existing src/data/mint-changelog.json"
fi

# Always build before deploy
log "Building project..."
npm run build

# Check if rsync is available
if ! command -v rsync &> /dev/null; then
    log_error "rsync not found. Please install rsync."
    exit 1
fi

# Check if SSH key is available
if [ ! -f ~/.ssh/id_rsa ] && [ ! -f ~/.ssh/id_ed25519 ]; then
    log_warning "No SSH key found. Please set up SSH authentication to $TARGET_HOST."
fi

# Create target directory if not exists
log "Ensuring target directory exists: $TARGET_PATH"
ssh $TARGET_HOST "mkdir -p $TARGET_PATH"

confirm "Deploy to $TARGET_HOST:$TARGET_PATH?" || { log_warning "Deployment cancelled."; exit 0; }

# Sync files
log "Deploying files to: $TARGET_HOST:$TARGET_PATH"

# Sync build files (excluding .gitkeep)
# Vite already copies everything from public/ into dist/ at build time, so
# dist/ is the single source of truth here — a separate public/ sync is not
# needed (and combined with --delete it would actively delete index.html and
# assets/, since those don't exist under public/).
# --delete removes files on the server that no longer exist locally (e.g. old
# favicon, removed placeholders). ota/ is merely PROTECTED from that deletion
# (not excluded from transfer) because it's gitignored and may not exist on
# every machine that runs a deploy — a plain --exclude would also block a
# present dist/ota/ (e.g. built by scripts/deploy_firmware.sh) from ever being
# uploaded, silently leaving the server's firmware.bin/manifest.json stale.
rsync -avz --delete --exclude='.gitkeep' --filter='P /ota/' --filter='P /ota/**' "$BUILD_DIR/" "$TARGET_HOST:$TARGET_PATH/"

# Drop the CDN's copy of the whole zone so it re-fetches from the freshly
# synced origin. Purging everything (rather than just the changed paths) is
# deliberate: the site is small, and it also evicts any copy the CDN grabbed
# mid-upload — a request that hits an asset while rsync is still writing it
# gets cached truncated for the full max-age (4 h at the time of writing).
# Credentials are shared with scripts/deploy_firmware.sh. A failed purge only
# warns: the files are already deployed at this point.
if [[ -f "$HOME/.cloudflarerc" ]]; then
    set -a; . "$HOME/.cloudflarerc"; set +a
fi
if [[ -n "${CF_ZONE_ID:-}" && -n "${CF_API_TOKEN:-}" ]]; then
    log "Purging the CDN cache..."
    PURGE_RESULT="$(curl -sS -X POST \
        "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache" \
        -H "Authorization: Bearer ${CF_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data '{"purge_everything":true}')" || PURGE_RESULT=''
    if [[ "$PURGE_RESULT" == *'"success":true'* ]]; then
        log "CDN cache purged."
    else
        log_warning "CDN purge did not report success — the public URL may serve"
        log_warning "previous (or truncated) files for up to their max-age."
        log_warning "Response: ${PURGE_RESULT:-<no response>}"
    fi
else
    log_warning "CDN cache NOT purged: CF_ZONE_ID / CF_API_TOKEN are not set."
    log_warning "Put them in ~/.cloudflarerc (see scripts/deploy_firmware.sh)."
fi

# Log deployment
echo "Deployment completed at $(date)" >> "$LOG_FILE"

log "=========================================="
log "  Deployment successful!"
log "  Target: $TARGET_HOST:$TARGET_PATH"
log "=========================================="

# Show files deployed
log "Deployed files:"
ssh $TARGET_HOST "ls -la $TARGET_PATH"
