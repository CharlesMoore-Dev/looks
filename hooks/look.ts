import type { ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Tokyo Night: deep indigo night with neon blue, cyan, green and amber.
// Light mode is Tokyo Night Day: cool lavender-grey paper with ink-blue text.
export const { theme, problems } = makeColors({
  label: 'Tokyo Night',
  id: 'tokyo-night',
  roles: { accent: '#7aa2f7', danger: '#f7768e', success: '#9ece6a', warning: '#e0af68', pro: '#7dcfff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#16161e',
        'surface-1': '#1a1b26',
        'surface-2': '#1f2335',
        'surface-3': '#212437',
        'text-primary': '#c0caf5',
        'text-secondary': '#a9b1d6',
        'text-muted': '#8f98c6',
      },
    },
    git: { added: '#9ece6a', removed: '#f7768e', modified: '#e0af68', merged: '#7dcfff' },
  },
  light: {
    gray: {
      anchors: {
        'surface-0': '#d5d6db',
        'surface-1': '#e1e2e7',
        'surface-2': '#e9e9ed',
        'text-primary': '#273156',
        'text-secondary': '#3a4573',
        'text-muted': '#545d86',
      },
    },
    roles: { accent: '#2e7de9', danger: '#f52a65', success: '#587539', warning: '#8c6c3e', pro: '#007197' },
    git: { added: '#587539', removed: '#f52a65', modified: '#8c6c3e', merged: '#007197' },
  },
})

export const SCENE_NAME = 'tokyo-skyline'

// The app frosts its panels over the skyline, so text stays readable.
export const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: SCENE_NAME, glass: { blur: 18, opacity: 0.72 } },
}
