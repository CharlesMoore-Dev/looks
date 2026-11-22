"""Generates hooks/scene.ts for tokyo-night-look: a night-city SVG backdrop.

Run from anywhere:  python scripts/make_scene.py  (or pass another output path).
The mod reloads by itself once scene.ts changes. Change the seed for a new city.
"""
import random
import sys
from pathlib import Path

OUTPUT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / 'hooks' / 'scene.ts'

random.seed(1923)
W, H = 1600, 1000
out = []
a = out.append

a(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">')
a('<style>')
a('''
svg { --s0: #0d0e16; --s1: #16161e; --s2: #18213a; --glowA: #7aa2f7; --glowB: #3d59a1;
  --city0: #10111a; --city1: #151724; --lit: #e0af68; --lit2: #7dcfff; --star: #c0caf5; --moon: #e6e9f8; --starOn: 1; }
@media (prefers-color-scheme: light) {
  svg { --s0: #c9cde0; --s1: #d9dbe6; --s2: #e6ebf3; --glowA: #2e7de9; --glowB: #4a6fc7;
    --city0: #b4b9cf; --city1: #c3c7da; --lit: #f2d9a8; --lit2: #cfe6f5; --star: #ffffff; --moon: #ffffff; --starOn: 0; }
}
.k0 { stop-color: var(--s0); } .k1 { stop-color: var(--s1); } .k2 { stop-color: var(--s2); }
.ga { fill: var(--glowA); } .gb { fill: var(--glowB); }
.c0 { fill: var(--city0); } .c1 { fill: var(--city1); }
.st { fill: var(--star); opacity: calc(0.75 * var(--starOn)); animation: tw 6s ease-in-out infinite; }
.moon { fill: var(--moon); opacity: calc(0.15 + 0.75 * var(--starOn)); }
.w { fill: var(--lit); opacity: 0.55; }
.w2 { fill: var(--lit2); opacity: 0.45; }
.f { animation: fl 9s ease-in-out infinite; }
.haze { animation: drift 60s ease-in-out infinite alternate; }
.haze2 { animation: drift2 80s ease-in-out infinite alternate; }
.shoot { opacity: 0; stroke: var(--star); animation: shoot 17s linear infinite; }
.d1 { animation-delay: -1s; } .d2 { animation-delay: -2.5s; } .d3 { animation-delay: -4s; }
.d4 { animation-delay: -5.5s; } .d5 { animation-delay: -7s; } .d6 { animation-delay: -8.5s; }
@keyframes tw { 0%, 100% { opacity: calc(0.75 * var(--starOn)); } 50% { opacity: calc(0.2 * var(--starOn)); } }
@keyframes fl { 0%, 100% { opacity: 0.55; } 45% { opacity: 0.55; } 55% { opacity: 0.08; } 85% { opacity: 0.08; } }
@keyframes drift { from { transform: translateX(-60px); } to { transform: translateX(90px); } }
@keyframes drift2 { from { transform: translateX(70px); } to { transform: translateX(-80px); } }
@keyframes shoot { 0%, 88% { opacity: 0; transform: translate(0, 0); }
  90% { opacity: calc(0.8 * var(--starOn)); } 96% { opacity: 0; transform: translate(-260px, 130px); } 100% { opacity: 0; transform: translate(-260px, 130px); } }
''')
a('</style>')

# Sky and haze.
a('<defs>')
a('<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">'
  '<stop offset="0" class="k0"/><stop offset="0.55" class="k1"/><stop offset="1" class="k2"/></linearGradient>')
a('<filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter>')
a('</defs>')
a(f'<rect width="{W}" height="{H}" fill="url(#sky)"/>')
a('<g filter="url(#blur)" opacity="0.28">')
a('<ellipse class="ga haze" cx="300" cy="760" rx="420" ry="120"/>')
a('<ellipse class="gb haze2" cx="1300" cy="720" rx="460" ry="130"/>')
a('</g>')

# Stars, kept to the top half and away from the middle column where text sits.
a('<g>')
for _ in range(110):
    x = random.uniform(0, W)
    y = random.uniform(0, H * 0.55)
    if 520 < x < 1080 and random.random() < 0.6:
        continue
    r = random.choice([0.8, 1.0, 1.2, 1.6])
    d = random.randint(1, 6)
    a(f'<circle class="st d{d}" cx="{x:.0f}" cy="{y:.0f}" r="{r}"/>')
a('</g>')

# Crescent moon, top right.
a('<defs><mask id="cres"><rect width="1600" height="1000" fill="#fff"/>'
  '<circle cx="1378" cy="138" r="44" fill="#000"/></mask></defs>')
a('<circle class="moon" cx="1355" cy="150" r="48" mask="url(#cres)"/>')
a('<line class="shoot" x1="1180" y1="90" x2="1230" y2="66" stroke-width="1.4" stroke-linecap="round"/>')

# Two skyline layers along the foot.
def skyline(cls, base, hmin, hmax, wmin, wmax, windows):
    x = -20
    while x < W + 20:
        bw = random.randint(wmin, wmax)
        bh = random.randint(hmin, hmax)
        top = base - bh
        a(f'<rect class="{cls}" x="{x}" y="{top}" width="{bw}" height="{bh + 200}"/>')
        if random.random() < 0.18:  # antenna
            a(f'<rect class="{cls}" x="{x + bw // 2 - 1}" y="{top - 26}" width="2" height="26"/>')
        if windows:
            for wy in range(top + 10, base - 6, 14):
                for wx in range(x + 6, x + bw - 8, 11):
                    if random.random() < 0.13:
                        kind = 'w2' if random.random() < 0.3 else 'w'
                        flick = f' f d{random.randint(1, 6)}' if random.random() < 0.25 else ''
                        a(f'<rect class="{kind}{flick}" x="{wx}" y="{wy}" width="4" height="6"/>')
        x += bw + random.randint(0, 6)

a('<g>')
skyline('c1', 905, 90, 230, 50, 110, False)
a('</g><g>')
skyline('c0', 1000, 60, 190, 40, 95, True)
a('</g>')
a('</svg>')

svg = ''.join(line.strip() if not line.startswith('\n') else line for line in out)
svg = ' '.join(svg.split())
assert len(svg) < 131072, len(svg)
for bad in ('<image', 'href', 'data:', '\\', '<!['):
    assert bad not in svg, bad

ts = ("// Generated by scripts/make_scene.py: a Tokyo skyline at night, a pale dawn in light mode.\n"
      "// Don't edit by hand; change the script and rerun it.\n"
      f"export const SCENE = {svg!r}\n")
OUTPUT.write_text(ts, encoding='utf-8', newline='\n')
print(f'{len(svg)} chars -> {OUTPUT}')
