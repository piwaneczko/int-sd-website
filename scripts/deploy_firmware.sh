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
#   3. Deploys the whole site (npm run build && rsync)

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

# Deploy site
bash "$SCRIPT_DIR/deploy.sh"
