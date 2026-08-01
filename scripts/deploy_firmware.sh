#!/usr/bin/env bash
# Deploy a new MINT firmware binary to int-sd.net/ota/
#
# Usage:
#   ./scripts/deploy_firmware.sh <path/to/signed-firmware.bin> <version>
#
# The binary must be the MCUboot-SIGNED image (the app's OTA verifies the
# MCUboot image header + SHA256 TLV). With the current sysbuild layout that is
# build/src/firmware/zephyr/zephyr.signed.bin (NOT build/src/zephyr/app_update.bin,
# which only exists in a non-sysbuild build).
#
# Example:
#   ./scripts/deploy_firmware.sh ~/projects/mint/firmware/build/src/firmware/zephyr/zephyr.signed.bin 1.1.0
#
# The script:
#   1. Copies the binary to public/ota/firmware.bin
#   2. Updates public/ota/manifest.json with new version + size
#   3. Publishes ONLY those two files directly to int-sd.net/ota/ — this is
#      deliberately decoupled from the full site deploy (build + public
#      changelog sanitization + full rsync), which now only happens via this
#      repo's own `scripts/deploy.sh` (or `npm run deploy`), not as a side
#      effect of a firmware release. OTA delivery is must-have on every
#      firmware release; a full site/changelog redeploy is not.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

FIRMWARE_BIN="${1:-}"
VERSION="${2:-}"
RELEASE_NOTES="${3:-MINT firmware $VERSION}"

if [[ -z "$FIRMWARE_BIN" || -z "$VERSION" ]]; then
    echo "Usage: $0 <signed-firmware.bin> <version> [release notes]"
    echo "  version format: major.minor.patch  (e.g. 1.1.0)"
    exit 1
fi

if [[ ! -f "$FIRMWARE_BIN" ]]; then
    echo "Error: firmware file not found: $FIRMWARE_BIN"
    exit 1
fi

OTA_DIR="$REPO_ROOT/public/ota"
mkdir -p "$OTA_DIR"

# Copy binary
cp "$FIRMWARE_BIN" "$OTA_DIR/firmware.bin"
SIZE=$(stat -c%s "$OTA_DIR/firmware.bin" 2>/dev/null || stat -f%z "$OTA_DIR/firmware.bin")

# Update manifest (python3 builds the JSON so release notes with quotes/newlines
# are escaped correctly).
# Unset PYTHONHOME/PYTHONPATH: if the calling shell ran the NCS `ncs()` macro
# without a matching `ncs-off`, they point at the toolchain's bundled Python
# 3.12 stdlib, which mismatches system python3's compiled _sre extension and
# aborts with "AssertionError: SRE module mismatch".
env -u PYTHONHOME -u PYTHONPATH python3 - "$VERSION" "$SIZE" "$RELEASE_NOTES" > "$OTA_DIR/manifest.json" <<'PY'
import json, sys
version, size, notes = sys.argv[1], int(sys.argv[2]), sys.argv[3]
print(json.dumps({
    "version": version,
    "url": "https://int-sd.net/ota/firmware.bin",
    "size": size,
    "releaseNotes": notes,
}, indent=2))
PY

echo "Manifest updated:"
cat "$OTA_DIR/manifest.json"
echo ""

# Publish just the OTA files directly (mirrors the minimal `deploy:recipes`
# pattern for public/recipes.json) — no build, no changelog, no full rsync.
TARGET_HOST="synology"
TARGET_PATH="/volume1/web"
echo "Publishing OTA files to $TARGET_HOST:$TARGET_PATH/ota/ ..."
ssh "$TARGET_HOST" "mkdir -p $TARGET_PATH/ota"
rsync -avz "$OTA_DIR/" "$TARGET_HOST:$TARGET_PATH/ota/"
echo "✓ OTA published: https://int-sd.net/ota/manifest.json"
