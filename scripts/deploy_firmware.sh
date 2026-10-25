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
#   2. Updates public/ota/manifest.json with new version + size + imageHash
#   3. Publishes ONLY those two files directly to int-sd.net/ota/ — this is
#      deliberately decoupled from the full site deploy (build + public
#      changelog sanitization + full rsync), which now only happens via this
#      repo's own `scripts/deploy.sh` (or `npm run deploy`), not as a side
#      effect of a firmware release. OTA delivery is must-have on every
#      firmware release; a full site/changelog redeploy is not.
#   4. Purges the CDN cache for both files (see PURGING, below)
#
# PURGING — why step 4 exists
# ---------------------------
# Every release is published at the SAME two URLs, so the bytes behind them are
# the one part of a release a cache can answer with the PREVIOUS version of.
# That is not theoretical: Cloudflare served a four-hour-old firmware.bin
# (`cf-cache-status: HIT`, `age 3933`, `max-age=14400`) beside a manifest that
# already described the new release, and the app dutifully uploaded to the
# device the very image it was already running.
#
# Needs CF_ZONE_ID and CF_API_TOKEN (a token with the "Zone → Cache Purge"
# permission). Read from the environment or ~/.cloudflarerc; never stored here.
# Without them the publish still happens and the step is SKIPPED LOUDLY — the
# app defends itself as well (it requests the image with a per-version query
# string and verifies size and imageHash), but a stale public URL is still
# wrong for anything else that fetches it.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

FIRMWARE_BIN="${1:-}"
VERSION="${2:-}"
RELEASE_NOTES="${3:-MINT firmware $VERSION}"

if [[ -z "$FIRMWARE_BIN" || -z "$VERSION" ]]; then
    echo "Usage: $0 <signed-firmware.bin> <version> [release notes]"
    echo "  version format: major.minor.patch[+tweak]  (e.g. 1.1.0, 1.2.0+4)"
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

# Read the image's OWN identity out of the MCUboot header/TLV: the SHA-256 the
# bootloader records for it, and the version imgtool signed it with.
#
# The hash goes into the manifest because it is the only field that IDENTIFIES
# the image rather than describing it — the app compares it against what it
# downloaded, and it is the same value the device reports for each of its slots.
#
# The version is only compared, and only warned about: it is baked in by
# release.sh (via the Zephyr VERSION file) and is 0.0.0+0 for an ad-hoc dev
# build, which is a legitimate thing to publish for a test. But publishing an
# image whose header says one release while the manifest announces another is
# how "the update reinstalled itself forever" started, so it should never pass
# silently.
read -r IMAGE_HASH HEADER_VERSION <<<"$(env -u PYTHONHOME -u PYTHONPATH python3 - "$OTA_DIR/firmware.bin" <<'PY'
import struct, sys

data = open(sys.argv[1], 'rb').read()
magic, _load, hdr_size, prot_tlv, img_size = struct.unpack_from('<IIHHI', data, 0)
if magic != 0x96f3b83d:
    sys.exit('not an MCUboot-signed image (bad magic) — did you pass '
             'zephyr.signed.bin?')

major, minor, revision, build = struct.unpack_from('<BBHI', data, 20)
version = f'{major}.{minor}.{revision}' + (f'+{build}' if build else '')

tlv_start = hdr_size + img_size + prot_tlv
tlv_magic, tlv_total = struct.unpack_from('<HH', data, tlv_start)
if tlv_magic != 0x6907:
    sys.exit('image has no TLV area — is it signed?')

image_hash = ''
pos = tlv_start + 4
while pos + 4 <= tlv_start + tlv_total:
    tlv_type = data[pos]
    tlv_len = struct.unpack_from('<H', data, pos + 2)[0]
    pos += 4
    if tlv_type == 0x10 and tlv_len == 32:      # IMAGE_TLV_SHA256
        image_hash = data[pos:pos + tlv_len].hex()
        break
    pos += tlv_len
if not image_hash:
    sys.exit('image carries no SHA-256 TLV')

print(image_hash, version)
PY
)"

if [[ "$HEADER_VERSION" != "$VERSION" ]]; then
    echo "⚠ The image says it is $HEADER_VERSION but you are publishing it as $VERSION."
    if [[ "$HEADER_VERSION" == "0.0.0" ]]; then
        echo "  (0.0.0 = a plain dev build; release.sh is what bakes the real version in.)"
    fi
    echo "  The app compares the version the DEVICE reports against this manifest,"
    echo "  so a mismatch here means the update can be offered again after a"
    echo "  perfectly successful install."
fi

# Update manifest (python3 builds the JSON so release notes with quotes/newlines
# are escaped correctly).
# Unset PYTHONHOME/PYTHONPATH: if the calling shell ran the NCS `ncs()` macro
# without a matching `ncs-off`, they point at the toolchain's bundled Python
# 3.12 stdlib, which mismatches system python3's compiled _sre extension and
# aborts with "AssertionError: SRE module mismatch".
env -u PYTHONHOME -u PYTHONPATH python3 - "$VERSION" "$SIZE" "$RELEASE_NOTES" "$IMAGE_HASH" > "$OTA_DIR/manifest.json" <<'PY'
import json, sys
version, size, notes, image_hash = sys.argv[1], int(sys.argv[2]), sys.argv[3], sys.argv[4]
print(json.dumps({
    "version": version,
    "url": "https://int-sd.net/ota/firmware.bin",
    "size": size,
    "imageHash": image_hash,
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

# Drop the CDN's copy of both files. Both hostnames: the manifest names the
# apex, and the app resolves the binary against the host it fetched the
# manifest from, so whichever one it used must not stay stale.
if [[ -f "$HOME/.cloudflarerc" ]]; then
    set -a; . "$HOME/.cloudflarerc"; set +a
fi
if [[ -n "${CF_ZONE_ID:-}" && -n "${CF_API_TOKEN:-}" ]]; then
    echo "Purging the CDN cache for the OTA files ..."
    PURGE_RESULT="$(curl -sS -X POST \
        "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache" \
        -H "Authorization: Bearer ${CF_API_TOKEN}" \
        -H "Content-Type: application/json" \
        --data '{"files":[
            "https://int-sd.net/ota/firmware.bin",
            "https://int-sd.net/ota/manifest.json",
            "https://www.int-sd.net/ota/firmware.bin",
            "https://www.int-sd.net/ota/manifest.json"
        ]}')" || PURGE_RESULT=''
    if [[ "$PURGE_RESULT" == *'"success":true'* ]]; then
        echo "✓ CDN cache purged."
    else
        echo "⚠ CDN purge did not report success — the public URL may serve the"
        echo "  PREVIOUS image for up to its max-age (4 h at the time of writing)."
        echo "  Response: ${PURGE_RESULT:-<no response>}"
    fi
else
    echo "⚠ CDN cache NOT purged: CF_ZONE_ID / CF_API_TOKEN are not set."
    echo "  https://int-sd.net/ota/firmware.bin can keep serving the previous"
    echo "  release for up to its max-age. Put them in ~/.cloudflarerc:"
    echo "      CF_ZONE_ID=<zone id from the Cloudflare dashboard>"
    echo "      CF_API_TOKEN=<API token with Zone → Cache Purge>"
    echo "  Verify with:  curl -sI https://www.int-sd.net/ota/firmware.bin | grep -i 'cf-cache-status\\|age:'"
fi
