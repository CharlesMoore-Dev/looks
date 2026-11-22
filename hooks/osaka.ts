import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Osaka Jade, from Omarchy's themes/osaka-jade/colors.toml (omacom/omarchy):
// background #111c18, foreground #C1C497, accent #509475, cursor #D7C995,
// ANSI red #FF5345, green #63b07a, yellow #E5C736, cyan #2DD5B7, magenta #D2689C.
// Dark only, like the original.
export const osaka = makeColors({
  label: 'Osaka Jade',
  id: 'osaka-jade',
  only: 'dark',
  roles: { accent: '#509475', danger: '#FF5345', success: '#63b07a', warning: '#E5C736', pro: '#2DD5B7' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0c1411',
        'surface-1': '#111c18',
        'surface-2': '#15231e',
        'surface-3': '#172620',
        'text-primary': '#d6d5bc',
        'text-secondary': '#c1c497',
        'text-muted': '#8f9a7f',
      },
    },
    git: { added: '#549e6a', removed: '#FF5345', modified: '#E5C736', merged: '#2DD5B7', conflicting: '#D2689C' },
  },
})

export const OSAKA_SCENE = 'osaka-jade-dusk'

export const OSAKA_LOOK: ThemeSetArgs = {
  colors: osaka.theme,
  backdrop: { scene: OSAKA_SCENE, glass: { blur: 18, opacity: 0.72 } },
}
