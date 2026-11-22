import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Vantablack, from Omarchy's themes/vantablack/colors.toml (omacom/omarchy):
// background #000000, dark #090909, darker #070707, lighter #1a1a1a, foreground #ffffff,
// light #ececec, muted #7a7a7a, accent #8d8d8d. Pure monochrome: even its "red",
// "green" and "yellow" are greys, so errors, success and warnings differ by lightness only.
export const vantablack = makeColors({
  label: 'Vantablack',
  id: 'vantablack',
  only: 'dark',
  roles: { accent: '#8d8d8d', danger: '#a4a4a4', success: '#b6b6b6', warning: '#cecece', pro: '#9b9b9b' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#000000',
        'surface-1': '#070707',
        'surface-2': '#090909',
        'surface-3': '#101010',
        'text-primary': '#ffffff',
        'text-secondary': '#b0b0b0',
        'text-muted': '#7a7a7a',
      },
    },
    git: { added: '#b6b6b6', removed: '#a4a4a4', modified: '#cecece', merged: '#9b9b9b', conflicting: '#b9b9b9' },
  },
})

export const VANTABLACK_SCENE = 'vantablack-dot-hands'

export const VANTABLACK_LOOK: ThemeSetArgs = {
  colors: vantablack.theme,
  backdrop: { scene: VANTABLACK_SCENE, glass: { blur: 16, opacity: 0.6 } },
}
