import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// RetroPC, from rondilley/omarchy-retropc-theme (alacritty.toml, mako.ini, walker.css):
// background #0A0A08, foreground #FFB000, dim #996600, accent #CC9900, cursor #FFCC00,
// selection #2A1F00, notification panel #1A1612. An amber monochrome CRT, dark only.
// The theme has no red or green, so roles stay in amber and lean on hue steps:
// danger the theme's orange-red, success its gold, warning its yellow.
export const retropc = makeColors({
  label: 'RetroPC',
  id: 'retropc',
  only: 'dark',
  roles: { accent: '#FFB000', danger: '#FF7A00', success: '#D4AA00', warning: '#FFDD00', pro: '#CC9900' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0a0a08',
        'surface-1': '#110f0a',
        'surface-2': '#1a1612',
        'surface-3': '#1b1712',
        'text-primary': '#ffb000',
        'text-secondary': '#d49a00',
        'text-muted': '#a87800',
      },
    },
    git: { added: '#FFCC00', removed: '#FF8800', modified: '#FFD700', merged: '#CC9900' },
  },
})

export const RETROPC_SCENE = 'retropc-amber-tube'

export const RETROPC_LOOK: ThemeSetArgs = {
  colors: retropc.theme,
  backdrop: { scene: RETROPC_SCENE, glass: { blur: 14, opacity: 0.66 } },
}
