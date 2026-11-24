import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Citrix: the brand purple #452170 (Simple Icons, from brand.citrix.com) and its dot-over-X mark.
// Dark mode sinks the purple to near-black surfaces and lifts it to a lavender accent so it reads;
// light mode keeps the true brand purple as the accent on lilac-white paper.
export const citrix = makeColors({
  label: 'Citrix',
  id: 'citrix',
  roles: { accent: '#9d74e0', danger: '#ff5f78', success: '#3ec79a', warning: '#f2b84b', pro: '#c49bff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0f0819',
        'surface-1': '#150c22',
        'surface-2': '#1b112d',
        'surface-3': '#211535',
        'text-primary': '#efe9f8',
        'text-secondary': '#c9bce0',
        'text-muted': '#a596c6',
      },
    },
    git: { added: '#3ec79a', removed: '#ff5f78', modified: '#f2b84b', merged: '#c49bff' },
  },
  light: {
    gray: {
      anchors: {
        'surface-0': '#ece6f4',
        'surface-1': '#f5f1fa',
        'surface-2': '#fbf9fd',
        'text-primary': '#1f0f36',
        'text-secondary': '#3a2860',
        'text-muted': '#5d4d80',
      },
    },
    roles: { accent: '#452170', danger: '#c8243e', success: '#16795a', warning: '#8a5a00', pro: '#6b3fb0' },
    git: { added: '#16795a', removed: '#c8243e', modified: '#8a5a00', merged: '#6b3fb0' },
  },
})

export const CITRIX_SCENE = 'citrix-mark'

export const CITRIX_LOOK: ThemeSetArgs = {
  colors: citrix.theme,
  backdrop: { scene: CITRIX_SCENE, glass: { blur: 16, opacity: 0.7 } },
}
