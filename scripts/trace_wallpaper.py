"""Traces a wallpaper photo into a layered vector SVG for a look's backdrop.

Claude's backdrop takes pure vector SVG only (no <image>, no base64) under 131,072
characters, so the picture is posterized into K colours and each colour band is traced
to paths. Layers stack darkest to brightest, each covering every pixel at least that
bright, so there are no gaps between them. The brightest band (lit windows) breathes
slowly and a soft mist drifts across the middle.

Needs Pillow, NumPy and OpenCV (opencv-python-headless).

    python scripts/trace_wallpaper.py <image> [--crop-top 56] [--width 640] [--colors 14]
        [--epsilon 0.9] [--min-area 6] [--out hooks/osaka-scene.ts]

Keep a traced wallpaper to your own machine: the art belongs to its maker.
"""
import argparse
from pathlib import Path

import cv2
import numpy as np

LIMIT = 131072
HERE = Path(__file__).resolve().parent.parent

p = argparse.ArgumentParser()
p.add_argument('image')
p.add_argument('--crop-top', type=int, default=0, help='pixels to cut from the top (a status bar)')
p.add_argument('--width', type=int, default=640, help='working width; more is more detail and size')
p.add_argument('--colors', type=int, default=14)
p.add_argument('--epsilon', type=float, default=0.9, help='path simplification, in working pixels')
p.add_argument('--min-area', type=float, default=6, help='drop specks smaller than this, in working pixels')
p.add_argument('--sharpen', type=float, default=0.8, help='unsharp amount after smoothing; 0 for none')
p.add_argument('--keep-bright', type=int, default=4, help='brightest bands that keep their small specks')
p.add_argument('--scale', type=int, default=2, help='viewBox units per working pixel')
p.add_argument('--out', default=str(HERE / 'hooks' / 'osaka-scene.ts'))
p.add_argument('--html', help='also write a preview page here')
args = p.parse_args()

img = cv2.imread(args.image, cv2.IMREAD_COLOR)
assert img is not None, f'cannot read {args.image}'
img = img[args.crop_top:, :]
h0, w0 = img.shape[:2]
W = args.width
H = round(h0 * W / w0)
small = cv2.resize(img, (W, H), interpolation=cv2.INTER_AREA)
small = cv2.bilateralFilter(small, 7, 40, 7)
# Sharpen after the smoothing so small lit windows survive the colour bands.
blurred = cv2.GaussianBlur(small, (0, 0), 1.2)
small = cv2.addWeighted(small, 1 + args.sharpen, blurred, -args.sharpen, 0)

# K-means in Lab, so the bands follow how the eye sees them.
lab = cv2.cvtColor(small, cv2.COLOR_BGR2LAB).reshape(-1, 3).astype(np.float32)
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 40, 0.5)
_, labels, centers = cv2.kmeans(lab, args.colors, None, criteria, 4, cv2.KMEANS_PP_CENTERS)
order = np.argsort(centers[:, 0])  # darkest first
rank = np.empty_like(order)
rank[order] = np.arange(len(order))
ranked = rank[labels.flatten()].reshape(H, W)
rgb = cv2.cvtColor(centers[order].reshape(1, -1, 3).astype(np.uint8), cv2.COLOR_LAB2RGB)[0]
hexes = ['#%02x%02x%02x' % tuple(int(v) for v in c) for c in rgb]

S = args.scale
kernel = np.ones((2, 2), np.uint8)


def path_of(mask, min_area):
    contours, _ = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    parts = []
    for c in contours:
        if abs(cv2.contourArea(c)) < min_area:
            continue
        c = cv2.approxPolyDP(c, args.epsilon, True).reshape(-1, 2)
        if len(c) < 3:
            continue
        pts = (c * S).astype(int)
        seg = [f'M{pts[0][0]} {pts[0][1]}']
        rel = np.diff(pts, axis=0)
        seg.append('l' + ' '.join(f'{dx} {dy}' for dx, dy in rel if dx or dy))
        parts.append(''.join(seg) + 'z')
    return ''.join(parts).replace(' -', '-')


layers = []
for i in range(1, args.colors):
    mask = (ranked >= i).astype(np.uint8) * 255
    # The brightest bands are the lit windows: keep their specks, which the rest drop.
    bright = i >= args.colors - args.keep_bright
    if not bright:
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    d = path_of(mask, 0.5 if bright else args.min_area)
    if d:
        cls = ' class="lit"' if i == args.colors - 1 else ''
        layers.append(f'<path{cls} fill="{hexes[i]}" fill-rule="evenodd" d="{d}"/>')

VW, VH = W * S, H * S
style = ('<style>'
         '.lit { animation: breathe 9s ease-in-out infinite; }'
         '.mist { animation: drift 80s ease-in-out infinite alternate; }'
         '@keyframes breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.72; } }'
         '@keyframes drift { from { transform: translateX(-80px); } to { transform: translateX(80px); } }'
         '</style>')
mist = (f'<defs><filter id="m" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="{VW // 24}"/></filter></defs>'
        f'<g filter="url(#m)" opacity="0.22"><ellipse class="mist" cx="{VW * 0.55:.0f}" cy="{VH * 0.6:.0f}" rx="{VW * 0.32:.0f}" ry="{VH * 0.06:.0f}" fill="#4fbf8e"/></g>')
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VW} {VH}" preserveAspectRatio="xMidYMid slice">'
       f'{style}<rect width="{VW}" height="{VH}" fill="{hexes[0]}"/>' + ''.join(layers) + mist + '</svg>')

for bad in ('<image', 'href', 'data:', '\\', '<![', "'"):
    assert bad not in svg, bad
print(f'{len(svg)} chars of {LIMIT} ({W}x{H}, {args.colors} colours, epsilon {args.epsilon})')
if len(svg) >= LIMIT:
    raise SystemExit('too big: lower --width or --colors, or raise --epsilon or --min-area')

Path(args.out).write_text(
    '// Generated by scripts/trace_wallpaper.py from a wallpaper photo; rerun it to change.\n'
    '// The art belongs to its maker: keep this to your own machine.\n'
    f'export const OSAKA_SCENE_SVG = {svg!r}\n', encoding='utf-8', newline='\n')
if args.html:
    Path(args.html).write_text('<!doctype html><html><body style="margin:0;background:#000"><div style="width:100vw;height:100vh">'
                               + svg.replace('<svg ', '<svg width="100%" height="100%" ', 1) + '</div></body></html>', encoding='utf-8')
