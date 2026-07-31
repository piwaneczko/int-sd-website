#!/usr/bin/env bash
# int-sd-website — bump version, tag, update CHANGELOG.md, build & deploy.
#
# Interactive: prompts for the new version and release notes.
# Pass -y/--yes to accept every [Y/n] confirmation and default value without
# prompting (propagated to scripts/deploy.sh too) — still stops and fails
# outright on a real error (dirty tree, invalid version, build/deploy
# failure), it only skips the confirmations.
#
# Steps: bump package.json "version" -> add/update the CHANGELOG.md entry ->
# commit -> annotated git tag vX.Y.Z -> build & deploy (scripts/deploy.sh) ->
# push commit + tag to origin.
#
# Run from anywhere:
#   ~/projects/int-sd-website/scripts/release.sh [-y]

set -euo pipefail

# --- args -------------------------------------------------------------
AUTO_YES=0
for arg in "$@"; do
  case "$arg" in
    -y|--yes) AUTO_YES=1 ;;
    *) echo "✗ unknown argument: $arg" >&2; exit 1 ;;
  esac
done

# --- config -----------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
CHANGELOG="$REPO_ROOT/CHANGELOG.md"
GIT_REMOTE="origin"

# --- helpers ------------------------------------------------------------
die()  { echo "✗ $*" >&2; exit 1; }
info() { echo "▸ $*"; }

# Answers a [Y/n] prompt. With -y/--yes, skips the read and answers "y"
# (still echoed, so the transcript shows what was decided and why).
confirm() {
  local prompt="$1" __var="$2"
  if [[ "$AUTO_YES" -eq 1 ]]; then
    printf -v "$__var" 'y'
    echo "▸ ${prompt} [Y/n]: y (auto, -y)"
  else
    read -rp "${prompt} [Y/n]: " "$__var"
  fi
}

read_multiline() {
  # $1 = prompt; echoes the collected text on stdout, prompt goes to stderr.
  local line notes=""
  echo "$1 (finish with a single '.' on its own line):" >&2
  while IFS= read -r line; do
    [[ "$line" == "." ]] && break
    notes+="$line"$'\n'
  done
  printf '%s' "${notes%$'\n'}"
}

# --- preconditions --------------------------------------------------------
cd "$REPO_ROOT"
command -v git >/dev/null || die "git not found"
git rev-parse --git-dir >/dev/null 2>&1 || die "not a git repo: $REPO_ROOT"
command -v npm >/dev/null || die "npm not found"
[[ -z "$(git status --porcelain)" ]] || \
  die "working tree is dirty — commit or stash first (release commits only the version bump)."

CUR_VER="$(npm pkg get version | tr -d '"')"
IFS=. read -r MA MI PA <<<"$CUR_VER"
SUGGEST="${MA:-0}.${MI:-0}.$(( ${PA:-0} + 1 ))"

# --- prompts --------------------------------------------------------------
echo "Current version: $CUR_VER"
if [[ "$AUTO_YES" -eq 1 ]]; then
  VERSION="$SUGGEST"
  echo "▸ New version [${SUGGEST}]: $VERSION (auto, -y)"
else
  read -rp "New version [${SUGGEST}]: " VERSION
  VERSION="${VERSION:-$SUGGEST}"
fi
[[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || \
  die "invalid version '$VERSION' (expected MAJOR.MINOR.PATCH)"
git rev-parse "v$VERSION" >/dev/null 2>&1 && die "tag v$VERSION already exists"

# --- CHANGELOG.md -----------------------------------------------------
if [[ ! -f "$CHANGELOG" ]]; then
  info "CHANGELOG.md not found — creating it"
  cat > "$CHANGELOG" <<'EOF'
# Changelog

All notable changes to this project are documented here.

EOF
fi

NOTES=""
if grep -qF "## [$VERSION]" "$CHANGELOG"; then
  info "CHANGELOG.md already has a '## [$VERSION]' entry — leaving it as-is."
else
  if [[ "$AUTO_YES" -ne 1 ]]; then
    NOTES="$(read_multiline "Release notes for v$VERSION")"
  fi
  [[ -n "$NOTES" ]] || NOTES="- Release v$VERSION"
  ENTRY="## [$VERSION] - $(date +%Y-%m-%d)"$'\n\n'"$NOTES"$'\n'
  # Header is exactly 4 lines (title, blank, description, blank) — insert the
  # new entry right after it, ahead of any previous entries.
  { head -n 4 "$CHANGELOG"; echo "$ENTRY"; tail -n +5 "$CHANGELOG"; } > "$CHANGELOG.tmp"
  mv "$CHANGELOG.tmp" "$CHANGELOG"
fi
[[ -n "$NOTES" ]] || NOTES="Release v$VERSION"

npm pkg set version="$VERSION" >/dev/null

echo
echo "──────────────────────────────────────────────"
echo "  Version : v$VERSION   (was $CUR_VER)"
echo "  Notes   :"
echo "$NOTES" | sed 's/^/            /'
echo "──────────────────────────────────────────────"
confirm "Commit, tag, build and deploy?" ok
if [[ ! "${ok:-y}" =~ ^[Yy]$ ]]; then
  git checkout -- package.json "$CHANGELOG"
  die "aborted."
fi

# 1. commit the version bump (+ changelog entry) — the tag is created on top
#    of this commit so `git describe` on it resolves cleanly.
info "Committing version bump"
git add package.json "$CHANGELOG"
git commit -m "chore(release): v$VERSION"

# 2. annotated tag (the version source of truth)
info "Creating annotated tag v$VERSION"
git tag -a "v$VERSION" -m "$NOTES"

# 3. build & deploy — -y is forwarded so the whole chain stays non-interactive.
info "Building and deploying"
DEPLOY_ARGS=(); [[ "$AUTO_YES" -eq 1 ]] && DEPLOY_ARGS+=(-y)
"$SCRIPT_DIR/deploy.sh" "${DEPLOY_ARGS[@]}"

# 4. push commit + tag (last step)
confirm "Push commit + tag to $GIT_REMOTE?" pushok
if [[ "${pushok:-y}" =~ ^[Yy]$ ]]; then
  info "Pushing to $GIT_REMOTE"
  git push "$GIT_REMOTE" HEAD
  git push "$GIT_REMOTE" "v$VERSION"
else
  echo "✓ Not pushed. To push later, run:"
  echo "    git push $GIT_REMOTE HEAD && git push $GIT_REMOTE v$VERSION"
fi
