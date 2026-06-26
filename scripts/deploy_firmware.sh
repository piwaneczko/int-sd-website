#!/usr/bin/env bash
# Deploy a new MINT firmware binary to int-sd.net/ota/
#
# Usage:
#   ./scripts/deploy_firmware.sh <path/to/app_update.bin> <version>
#
# Example:
#   ./scripts/deploy_firmware.sh ~/projects/mint/firmware/build/src/zephyr/app_update.bin 1.1.0
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

if [[ -z "$FIRMWARE_BIN" || -z "$VERSION" ]]; then
    echo "Usage: $0 <app_update.bin> <version>"
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

# Update manifest
cat > "$OTA_DIR/manifest.json" <<EOF
{
  "version": "$VERSION",
  "url": "https://int-sd.net/ota/firmware.bin",
  "size": $SIZE,
  "releaseNotes": "MINT firmware $VERSION"
}
EOF

echo "Manifest updated:"
cat "$OTA_DIR/manifest.json"
echo ""

# Deploy site
cd "$REPO_ROOT"
bash deploy.sh
