#!/usr/bin/env bash
# int-sd-website — bump version (git tag) + build & deploy.
#
# Interactive: prompts for the new version and a release-notes description.
# Pass -y/--yes to accept every [Y/n] confirmation and default value without
# prompting (propagated to ai-update-changelog.sh and scripts/deploy.sh
# too) — still stops and fails outright on a real error (dirty tree, missing
# CHANGELOG entry, build/deploy failure), it only skips the confirmations.
#
# The git tag is the version source of truth (mirrors
# ../mint/firmware/scripts/release.sh): CUR_VER/SUGGEST come from `git
# describe --tags --match v*`, not from package.json. package.json's
# "version" field is kept in sync as a side effect (committed right before
# the tag, so the tag always points at a commit whose package.json agrees
# with it) — mint has no equivalent step since it has no manifest file.
#
# The signed... er, built site is deployed via scripts/deploy.sh, which can
# also be re-run alone to redeploy the current tag's build.
#
# Run from any shell:
#   ~/projects/int-sd-website/scripts/release.sh

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
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GIT_REMOTE="origin"
CHANGELOG_HELPER="$HOME/scripts/ai-update-changelog.sh"

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
cd "$REPO_DIR"
command -v git >/dev/null || die "git not found"
git rev-parse --git-dir >/dev/null 2>&1 || die "not a git repo: $REPO_DIR"
command -v npm >/dev/null || die "npm not found"
[[ -z "$(git status --porcelain)" ]] || \
  die "working tree is dirty — commit or stash first."

CUR_TAG="$(git describe --tags --match 'v*' --abbrev=0 2>/dev/null || echo '')"
if [[ -n "$CUR_TAG" ]]; then
  CUR_VER="${CUR_TAG#v}"
else
  # No release tag yet — fall back to package.json's version instead of
  # mint's 0.0.0 baseline, so a repo with real released history (like this
  # one, already at 1.0.0) doesn't get suggested a downgrade on first run.
  CUR_VER="$(npm pkg get version | tr -d '"')"
fi
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

CHANGELOG="$REPO_DIR/CHANGELOG.md"
if [[ ! -f "$CHANGELOG" ]]; then
  info "CHANGELOG.md not found — creating it"
  printf '# Changelog\n\nAll notable changes to this project are documented here.\n' > "$CHANGELOG"
fi

TAG_ONELINE=""
if ! grep -qF "## [$VERSION]" "$CHANGELOG"; then
  echo "⚠ CHANGELOG.md has no '## [$VERSION]' entry."
  confirm "Run $CHANGELOG_HELPER now to generate it?" run_helper
  if [[ "${run_helper:-y}" =~ ^[Yy]$ ]]; then
    [[ -x "$CHANGELOG_HELPER" ]] || die "$CHANGELOG_HELPER not found or not executable"
    HELPER_OUT="$(mktemp)"
    # Pass the version being released so the helper preselects
    # "## [$VERSION]" instead of its own previous-tag+1 guess, which would
    # land the bullets under a different heading than the one checked right
    # below. -y is forwarded so the whole chain stays non-interactive.
    HELPER_ARGS=("$VERSION"); [[ "$AUTO_YES" -eq 1 ]] && HELPER_ARGS+=(-y)
    CHANGELOG_HELPER_OUTPUT="$HELPER_OUT" "$CHANGELOG_HELPER" "${HELPER_ARGS[@]}"
    # shellcheck source=/dev/null
    [[ -s "$HELPER_OUT" ]] && source "$HELPER_OUT"
    rm -f "$HELPER_OUT"
    grep -qF "## [$VERSION]" "$CHANGELOG" || \
      die "CHANGELOG.md still has no '## [$VERSION]' entry after running the helper — document it manually before tagging."
  else
    die "CHANGELOG.md has no '## [$VERSION]' entry — document it before tagging."
  fi
fi

if [[ -n "$TAG_ONELINE" ]]; then
  echo
  info "Suggested release notes (from ai-update-changelog.sh):"
  echo "  $TAG_ONELINE"
  confirm "Use this as release notes?" use_notes
  [[ "${use_notes:-y}" =~ ^[Yy]$ ]] && NOTES="$TAG_ONELINE"
fi
# -y with no TAG_ONELINE to fall back on: skip the interactive multiline
# collection too (it has no sensible "yes") and drop straight to the
# "int-sd-website $VERSION" default below.
if [[ -z "${NOTES:-}" && "$AUTO_YES" -ne 1 ]]; then
  NOTES="$(read_multiline "Release notes")"
fi
[[ -n "${NOTES:-}" ]] || NOTES="int-sd-website $VERSION"

echo
echo "──────────────────────────────────────────────"
echo "  Version : v$VERSION   (was $CUR_VER)"
echo "  Notes   :"
echo "$NOTES" | sed 's/^/            /'
echo "──────────────────────────────────────────────"
confirm "Bump version, tag, build and deploy?" ok
[[ "${ok:-y}" =~ ^[Yy]$ ]] || die "aborted."

# 1. keep package.json's "version" field in sync and commit it, so the tag
#    below points at a commit whose package.json actually agrees with it.
if [[ "$(npm pkg get version | tr -d '"')" != "$VERSION" ]]; then
  info "Bumping package.json version to $VERSION"
  npm pkg set version="$VERSION" >/dev/null
  git add package.json
fi
if ! git diff --cached --quiet; then
  git commit -m "chore(release): v$VERSION"
fi

# 2. annotated tag (the version source of truth)
info "Creating annotated tag v$VERSION"
git tag -a -f "v$VERSION" -m "$NOTES"

# 3. build & deploy — split out into scripts/deploy.sh so this exact step
#    can be re-run standalone (e.g. to redeploy the current tag's build).
info "Building and deploying"
DEPLOY_ARGS=(); [[ "$AUTO_YES" -eq 1 ]] && DEPLOY_ARGS+=(-y)
if ! "$REPO_DIR/scripts/deploy.sh" "${DEPLOY_ARGS[@]}"; then
  git tag -d "v$VERSION" >/dev/null
  die "deploy failed — tag v$VERSION removed."
fi

# 4. push commit + tag (last step)
confirm "Push commit + tag v$VERSION to $GIT_REMOTE?" pushok
if [[ "${pushok:-y}" =~ ^[Yy]$ ]]; then
  info "Pushing to $GIT_REMOTE"
  git push "$GIT_REMOTE" HEAD
  git push "$GIT_REMOTE" "v$VERSION"
else
  echo "✓ Not pushed. To push later, run:"
  echo "    git push $GIT_REMOTE HEAD && git push $GIT_REMOTE v$VERSION"
fi
