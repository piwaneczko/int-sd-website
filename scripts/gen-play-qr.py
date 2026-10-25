#!/usr/bin/env python3
"""
Draws the QR code of the MINT app's Google Play page, with the Android head in
the middle, as public/images/mint-play-qr.svg.

The address comes from src/utils/mint-app.js (MINT_APP_PACKAGE), the one place
the store link is defined, so after changing it just run:

    python3 scripts/gen-play-qr.py

No dependencies (scripts/qr_encode.py is a minimal QR encoder). The code uses
error correction level H, which survives the centre being covered by the icon.
"""

import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

from qr_encode import qr_matrix  # noqa: E402

DARK = '#0c1a2b'
ANDROID_GREEN = '#3ddc84'
QUIET = 3  # modules of white around the code (4 is the standard; 3 scans fine and looks tighter)


def play_url():
    with open(os.path.join(ROOT, 'src/utils/mint-app.js'), encoding='utf-8') as f:
        package = re.search(r"MINT_APP_PACKAGE\s*=\s*'([^']+)'", f.read()).group(1)
    return f'https://play.google.com/store/apps/details?id={package}'


def in_finder(x, y, n):
    return (x < 8 and y < 8) or (x >= n - 8 and y < 8) or (x < 8 and y >= n - 8)


def finder(x, y):
    """A finder pattern as three nested rounded squares at module (x, y)."""
    return (
        f'<rect x="{x + 0.5}" y="{y + 0.5}" width="6" height="6" rx="1.6" fill="none" '
        f'stroke="{DARK}" stroke-width="1"/>'
        f'<rect x="{x + 2}" y="{y + 2}" width="3" height="3" rx="0.8" fill="{DARK}"/>'
    )


def android_head(cx, cy, size):
    """The Android robot's head, centred on (cx, cy), about [size] modules wide."""
    s = size / 24.0
    return (
        f'<g transform="translate({cx - 12 * s} {cy - 11 * s}) scale({s})">'
        f'<path d="M4 15a8 8 0 0 1 16 0z" fill="{ANDROID_GREEN}"/>'
        f'<path d="M8 7 6.2 4.2M16 7l1.8-2.8" stroke="{ANDROID_GREEN}" stroke-width="1.4" '
        f'stroke-linecap="round" fill="none"/>'
        f'<circle cx="9.2" cy="11.2" r="1.05" fill="#fff"/>'
        f'<circle cx="14.8" cy="11.2" r="1.05" fill="#fff"/>'
        f'</g>'
    )


def main():
    url = play_url()
    m = qr_matrix(url, 'H')
    n = len(m)
    size = n + 2 * QUIET
    logo = round(n * 0.26)  # the knocked-out square, in modules; level H recovers ~30 %
    logo += (n - logo) % 2  # keep it centred on the module grid
    lo = (n - logo) // 2

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" '
        f'width="{size * 10}" height="{size * 10}" role="img" '
        f'aria-label="QR code: MINT on Google Play">',
        f'<title>MINT on Google Play: {url}</title>',
        f'<rect width="{size}" height="{size}" rx="2.5" fill="#fff"/>',
        f'<g transform="translate({QUIET} {QUIET})">',
    ]
    for y in range(n):
        for x in range(n):
            if not m[y][x] or in_finder(x, y, n):
                continue
            if lo <= x < lo + logo and lo <= y < lo + logo:
                continue
            parts.append(f'<circle cx="{x + 0.5}" cy="{y + 0.5}" r="0.47" fill="{DARK}"/>')
    parts += [finder(0, 0), finder(n - 7, 0), finder(0, n - 7)]
    c = n / 2
    parts.append(f'<rect x="{lo + 0.4}" y="{lo + 0.4}" width="{logo - 0.8}" height="{logo - 0.8}" '
                 f'rx="1.6" fill="#fff"/>')
    parts.append(android_head(c, c, logo * 0.72))
    parts += ['</g>', '</svg>']

    out = os.path.join(ROOT, 'public/images/mint-play-qr.svg')
    with open(out, 'w', encoding='utf-8') as f:
        f.write(''.join(parts) + '\n')
    print(f'{out}  ({n}x{n} modules, version {(n - 17) // 4}, {url})')


if __name__ == '__main__':
    main()
