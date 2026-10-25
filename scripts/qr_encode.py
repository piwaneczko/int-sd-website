"""
Minimal QR Code encoder (ISO/IEC 18004, byte mode, versions 1-10, no
dependencies). Enough for a short URL on a sticker.

    matrix = qr_matrix('https://www.int-sd.net/mint?id=abc', 'M')   # list of rows of 0/1

The result has no quiet zone; the caller adds one (4 modules is the standard).
"""

# (blocks, codewords per block, data codewords per block) groups, by version and
# error-correction level.
EC_BLOCKS = {
    1: {'L': ((1, 26, 19),), 'M': ((1, 26, 16),), 'Q': ((1, 26, 13),), 'H': ((1, 26, 9),)},
    2: {'L': ((1, 44, 34),), 'M': ((1, 44, 28),), 'Q': ((1, 44, 22),), 'H': ((1, 44, 16),)},
    3: {'L': ((1, 70, 55),), 'M': ((1, 70, 44),), 'Q': ((2, 35, 17),), 'H': ((2, 35, 13),)},
    4: {'L': ((1, 100, 80),), 'M': ((2, 50, 32),), 'Q': ((2, 50, 24),), 'H': ((4, 25, 9),)},
    5: {'L': ((1, 134, 108),), 'M': ((2, 67, 43),), 'Q': ((2, 33, 15), (2, 34, 16)),
        'H': ((2, 33, 11), (2, 34, 12))},
    6: {'L': ((2, 86, 68),), 'M': ((4, 43, 27),), 'Q': ((4, 43, 19),), 'H': ((4, 43, 15),)},
    7: {'L': ((2, 98, 78),), 'M': ((4, 49, 31),), 'Q': ((2, 32, 14), (4, 33, 15)),
        'H': ((4, 39, 13), (1, 40, 14))},
    8: {'L': ((2, 121, 97),), 'M': ((2, 60, 38), (2, 61, 39)), 'Q': ((4, 40, 18), (2, 41, 19)),
        'H': ((4, 40, 14), (2, 41, 15))},
    9: {'L': ((2, 146, 116),), 'M': ((3, 58, 36), (2, 59, 37)), 'Q': ((4, 36, 16), (4, 37, 17)),
        'H': ((4, 36, 12), (4, 37, 13))},
    10: {'L': ((2, 86, 68), (2, 87, 69)), 'M': ((4, 69, 43), (1, 70, 44)),
         'Q': ((6, 43, 19), (2, 44, 20)), 'H': ((6, 43, 15), (2, 44, 16))},
}
ALIGNMENT = {1: (), 2: (6, 18), 3: (6, 22), 4: (6, 26), 5: (6, 30), 6: (6, 34), 7: (6, 22, 38),
             8: (6, 24, 42), 9: (6, 26, 46), 10: (6, 28, 50)}
ECL_BITS = {'L': 0b01, 'M': 0b00, 'Q': 0b11, 'H': 0b10}
MAX_VERSION = 10

# --- Reed-Solomon over GF(256), polynomial 0x11D ---------------------------
_EXP = [0] * 512
_LOG = [0] * 256
_x = 1
for _i in range(255):
    _EXP[_i] = _x
    _LOG[_x] = _i
    _x <<= 1
    if _x & 0x100:
        _x ^= 0x11D
for _i in range(255, 512):
    _EXP[_i] = _EXP[_i - 255]


def _gf_mul(a, b):
    return 0 if a == 0 or b == 0 else _EXP[_LOG[a] + _LOG[b]]


def _rs_generator(n):
    g = [1]
    for i in range(n):
        nxt = [0] * (len(g) + 1)
        for j, c in enumerate(g):
            nxt[j] ^= c
            nxt[j + 1] ^= _gf_mul(c, _EXP[i])
        g = nxt
    return g


def _rs_remainder(data, n):
    gen = _rs_generator(n)
    rem = [0] * n
    for byte in data:
        factor = byte ^ rem[0]
        rem = rem[1:] + [0]
        for i in range(n):
            rem[i] ^= _gf_mul(gen[i + 1], factor)
    return rem


def _data_capacity(version, ecl):
    return sum(n * d for n, _, d in EC_BLOCKS[version][ecl])


def _count_bits(version):
    return 8 if version <= 9 else 16


def _bch(value, poly, bits):
    """Remainder of value * 2^bits divided by poly (BCH check bits)."""
    v = value << bits
    top = poly.bit_length() - 1
    for i in range(v.bit_length() - 1, top - 1, -1):
        if v >> i & 1:
            v ^= poly << (i - top)
    return v


def _format_bits(ecl, mask):
    data = ECL_BITS[ecl] << 3 | mask
    return ((data << 10) | _bch(data, 0x537, 10)) ^ 0x5412


def _version_bits(version):
    return (version << 12) | _bch(version, 0x1F25, 12)


def _encode_codewords(data, version, ecl):
    capacity = _data_capacity(version, ecl)
    bits = '0100' + format(len(data), f'0{_count_bits(version)}b')
    bits += ''.join(format(b, '08b') for b in data)
    bits += '0' * min(4, capacity * 8 - len(bits))
    bits += '0' * (-len(bits) % 8)
    words = [int(bits[i:i + 8], 2) for i in range(0, len(bits), 8)]
    pad = (0xEC, 0x11)
    while len(words) < capacity:
        words.append(pad[(len(words) - len(bits) // 8) % 2])

    blocks, ec_blocks, pos = [], [], 0
    for count, total, dcount in EC_BLOCKS[version][ecl]:
        for _ in range(count):
            block = words[pos:pos + dcount]
            pos += dcount
            blocks.append(block)
            ec_blocks.append(_rs_remainder(block, total - dcount))
    out = []
    for i in range(max(len(b) for b in blocks)):
        out += [b[i] for b in blocks if i < len(b)]
    for i in range(len(ec_blocks[0])):
        out += [b[i] for b in ec_blocks]
    return out


class _Grid:
    def __init__(self, version):
        self.n = 17 + 4 * version
        self.m = [[0] * self.n for _ in range(self.n)]
        self.fn = [[False] * self.n for _ in range(self.n)]  # function-pattern modules

    def set(self, x, y, dark, fn=True):
        self.m[y][x] = 1 if dark else 0
        if fn:
            self.fn[y][x] = True


def _draw_function_patterns(g, version):
    n = g.n
    for i in range(n):  # timing
        g.set(6, i, i % 2 == 0)
        g.set(i, 6, i % 2 == 0)
    for cx, cy in ((3, 3), (n - 4, 3), (3, n - 4)):  # finders with separators
        for dy in range(-4, 5):
            for dx in range(-4, 5):
                x, y = cx + dx, cy + dy
                if 0 <= x < n and 0 <= y < n:
                    dist = max(abs(dx), abs(dy))
                    g.set(x, y, dist not in (2, 4))
    centers = ALIGNMENT[version]
    for cy in centers:
        for cx in centers:
            if (cx == 6 and cy == 6) or (cx == 6 and cy == n - 7) or (cx == n - 7 and cy == 6):
                continue
            for dy in range(-2, 3):
                for dx in range(-2, 3):
                    g.set(cx + dx, cy + dy, max(abs(dx), abs(dy)) != 1)
    # reserve the format areas (filled per mask later) and the dark module
    for i in range(9):
        if i == 6:  # the timing pattern runs through here, not format bits
            continue
        g.set(8, i, False)
        g.set(i, 8, False)
    for i in range(8):
        g.set(n - 1 - i, 8, False)
        g.set(8, n - 1 - i, False)
    g.set(8, n - 8, True)
    if version >= 7:
        bits = _version_bits(version)
        for i in range(18):
            dark = bits >> i & 1
            a, b = n - 11 + i % 3, i // 3
            g.set(a, b, dark)
            g.set(b, a, dark)


def _draw_format(g, ecl, mask):
    n = g.n
    bits = _format_bits(ecl, mask)
    bit = lambda i: bits >> i & 1
    for i in range(6):
        g.set(8, i, bit(i))
    g.set(8, 7, bit(6))
    g.set(8, 8, bit(7))
    g.set(7, 8, bit(8))
    for i in range(9, 15):
        g.set(14 - i, 8, bit(i))
    for i in range(8):
        g.set(n - 1 - i, 8, bit(i))
    for i in range(8, 15):
        g.set(8, n - 15 + i, bit(i))
    g.set(8, n - 8, True)


def _place_data(g, codewords):
    n = g.n
    bits = ''.join(format(c, '08b') for c in codewords)
    i, x, up = 0, n - 1, True
    while x > 0:
        if x == 6:
            x -= 1
        ys = range(n - 1, -1, -1) if up else range(n)
        for y in ys:
            for dx in (0, 1):
                xx = x - dx
                if not g.fn[y][xx]:
                    g.m[y][xx] = int(bits[i]) if i < len(bits) else 0
                    i += 1
        x -= 2
        up = not up


_MASKS = (
    lambda x, y: (x + y) % 2 == 0,
    lambda x, y: y % 2 == 0,
    lambda x, y: x % 3 == 0,
    lambda x, y: (x + y) % 3 == 0,
    lambda x, y: (x // 3 + y // 2) % 2 == 0,
    lambda x, y: x * y % 2 + x * y % 3 == 0,
    lambda x, y: (x * y % 2 + x * y % 3) % 2 == 0,
    lambda x, y: ((x + y) % 2 + x * y % 3) % 2 == 0,
)


def _penalty(m):
    n = len(m)
    score = 0
    for rows in (m, [list(c) for c in zip(*m)]):
        for row in rows:
            run = 1
            for i in range(1, n):
                if row[i] == row[i - 1]:
                    run += 1
                    continue
                if run >= 5:
                    score += run - 2
                run = 1
            if run >= 5:
                score += run - 2
            s = ''.join(map(str, row))
            score += 40 * (s.count('10111010000') + s.count('00001011101'))
    for y in range(n - 1):
        for x in range(n - 1):
            if m[y][x] == m[y][x + 1] == m[y + 1][x] == m[y + 1][x + 1]:
                score += 3
    dark = sum(map(sum, m))
    score += 10 * (abs(dark * 20 - n * n * 10) // (n * n))
    return score


def qr_matrix(text, ecl='M', mask=None):
    """The QR symbol for [text] (UTF-8, byte mode) as rows of 0/1 (1 = dark)."""
    data = text.encode('utf-8')
    for version in range(1, MAX_VERSION + 1):
        if len(data) * 8 + 4 + _count_bits(version) <= _data_capacity(version, ecl) * 8:
            break
    else:
        raise ValueError(f'{len(data)} bytes do not fit in a version-{MAX_VERSION} QR code')
    codewords = _encode_codewords(data, version, ecl)

    best = None
    for k in (range(8) if mask is None else (mask,)):
        g = _Grid(version)
        _draw_function_patterns(g, version)
        _place_data(g, codewords)
        for y in range(g.n):
            for x in range(g.n):
                if not g.fn[y][x] and _MASKS[k](x, y):
                    g.m[y][x] ^= 1
        _draw_format(g, ecl, k)
        score = _penalty(g.m)
        if best is None or score < best[0]:
            best = (score, g.m)
    return best[1]
