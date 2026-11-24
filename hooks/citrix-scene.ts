// Citrix backdrop: the dot-over-X mark (Simple Icons' citrix.svg path, 24x24) drawn large in the
// brand purple, glowing over a deep purple field, with small marks drifting up behind it.

const MARK =
  'M11.983 0a1.78 1.78 0 0 0-1.78 1.78 1.78 1.78 0 0 0 1.78 1.78 1.78 1.78 0 0 0 1.78-1.78A1.78 1.78 0 0 0 11.983 0zM5.17 5.991a1.026 1.026 0 0 0-1.095 1.027c0 .308.136.616.376.822l6.162 7.086-6.401 7.258a1.084 1.084 0 0 0-.309.787c0 .582.48 1.027 1.062 1.027.342 0 .684-.17.89-.444l6.128-7.19 6.162 7.19c.205.274.547.444.89.444.582.035 1.062-.445 1.062-1.027a1.14 1.14 0 0 0-.309-.787l-6.402-7.258 6.162-7.086c.24-.206.377-.514.377-.822v-.034c0-.582-.513-1.027-1.095-.993-.343 0-.65.171-.856.445l-5.957 7.018L6.06 6.436a1.07 1.07 0 0 0-.855-.445z'

// Small marks behind the big one: x, y, scale, opacity, drift seconds, delay.
const SMALL: [number, number, number, number, number, number][] = [
  [120, 760, 2.2, 0.1, 38, 0],
  [300, 260, 1.4, 0.08, 46, -12],
  [520, 860, 1.8, 0.07, 42, -25],
  [640, 120, 1.1, 0.06, 50, -8],
  [1460, 820, 1.6, 0.08, 40, -18],
  [1520, 140, 1.2, 0.07, 48, -30],
  [220, 520, 1, 0.06, 44, -36],
  [760, 620, 1.3, 0.05, 52, -4],
]

const small = SMALL.map(
  ([x, y, s, o, dur, delay]) =>
    `<g transform="translate(${x} ${y})"><g class="drift" style="animation-duration:${dur}s;animation-delay:${delay}s">` +
    `<path d="${MARK}" transform="scale(${s}) translate(-12 -12)" fill="#9d74e0" opacity="${o}"/></g></g>`,
).join('')

export const CITRIX_SCENE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">' +
  '<style>' +
  '.dot { animation: pulse 6s ease-in-out infinite; transform-origin: 1118px 214px; }' +
  '.halo { animation: breathe 9s ease-in-out infinite; }' +
  '.drift { animation-name: drift; animation-timing-function: linear; animation-iteration-count: infinite; }' +
  '@keyframes pulse { 0%, 100% { opacity: 0.85; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }' +
  '@keyframes breathe { 0%, 100% { opacity: 0.45; } 50% { opacity: 0.7; } }' +
  '@keyframes drift { from { transform: translateY(60px); opacity: 0; } 15%, 85% { opacity: 1; } to { transform: translateY(-120px); opacity: 0; } }' +
  '</style>' +
  '<defs>' +
  '<radialGradient id="field" cx="0.68" cy="0.42" r="0.85">' +
  '<stop offset="0" stop-color="#2c1650"/><stop offset="0.45" stop-color="#1a0d30"/>' +
  '<stop offset="1" stop-color="#0a0512"/></radialGradient>' +
  '<linearGradient id="ink" x1="0" y1="0" x2="1" y2="1">' +
  '<stop offset="0" stop-color="#8a5fd1"/><stop offset="0.55" stop-color="#5a2e92"/>' +
  '<stop offset="1" stop-color="#452170"/></linearGradient>' +
  '<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">' +
  '<stop offset="0" stop-color="#9d74e0" stop-opacity="0.55"/><stop offset="1" stop-color="#9d74e0" stop-opacity="0"/></radialGradient>' +
  '<filter id="blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="0.9"/></filter>' +
  '</defs>' +
  '<rect width="1600" height="1000" fill="url(#field)"/>' +
  small +
  '<ellipse class="halo" cx="1118" cy="520" rx="420" ry="420" fill="url(#glow)"/>' +
  // The big mark: 30x the 24-unit icon, its dot centred at (1118, 214).
  `<g transform="translate(758 161) scale(30)">` +
  `<path d="${MARK}" fill="#6b3fb0" opacity="0.5" filter="url(#blur)"/>` +
  `<path d="M5.17 5.991a1.026 1.026 0 0 0-1.095 1.027c0 .308.136.616.376.822l6.162 7.086-6.401 7.258a1.084 1.084 0 0 0-.309.787c0 .582.48 1.027 1.062 1.027.342 0 .684-.17.89-.444l6.128-7.19 6.162 7.19c.205.274.547.444.89.444.582.035 1.062-.445 1.062-1.027a1.14 1.14 0 0 0-.309-.787l-6.402-7.258 6.162-7.086c.24-.206.377-.514.377-.822v-.034c0-.582-.513-1.027-1.095-.993-.343 0-.65.171-.856.445l-5.957 7.018L6.06 6.436a1.07 1.07 0 0 0-.855-.445z" fill="url(#ink)" opacity="0.62"/>` +
  '</g>' +
  `<g class="dot"><g transform="translate(758 161) scale(30)">` +
  `<circle cx="11.983" cy="1.78" r="1.78" fill="#b892f0" opacity="0.8"/></g></g>` +
  '</svg>'
