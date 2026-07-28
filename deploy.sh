#!/bin/bash
# Deploy script for I.N.T. Software Development
# Deploy target: synology:/volume1/web

set -e

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

# Refresh the public MINT changelog from the sibling ../mint checkout, if
# present. This only copies raw internal CHANGELOG.md files into a gitignored
# scratch dir and re-renders the curated, public-safe data file consumed by
# the site (src/data/mint-changelog.json) — it never touches ../mint itself.
if [ -d "../mint" ]; then
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

# Sync files
log "Deploying files to: $TARGET_HOST:$TARGET_PATH"

# Sync build files (excluding .gitkeep)
# Vite already copies everything from public/ into dist/ at build time, so
# dist/ is the single source of truth here — a separate public/ sync is not
# needed (and combined with --delete it would actively delete index.html and
# assets/, since those don't exist under public/).
# --delete removes files on the server that no longer exist locally (e.g. old
# favicon, removed placeholders). ota/ is excluded from deletion because it's
# gitignored and may not exist on every machine that runs a deploy.
rsync -avz --delete --exclude='.gitkeep' --exclude='ota/' "$BUILD_DIR/" "$TARGET_HOST:$TARGET_PATH/"

# Log deployment
echo "Deployment completed at $(date)" >> "$LOG_FILE"

log "=========================================="
log "  Deployment successful!"
log "  Target: $TARGET_HOST:$TARGET_PATH"
log "=========================================="

# Show files deployed
log "Deployed files:"
ssh $TARGET_HOST "ls -la $TARGET_PATH"
