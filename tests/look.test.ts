import { expect, test } from 'claude-code/testing'

import { problems as tokyo, theme as tokyoTheme } from '../hooks/look.js'
import { citrix } from '../hooks/citrix.js'
import { checkColors } from '../hooks/make-colors.js'
import { osaka } from '../hooks/osaka.js'
import { retropc } from '../hooks/retropc.js'
import { vantablack } from '../hooks/vantablack.js'

// Contrast notes under the design system's bar still paint; only this line stops Desktop.
const blocking = (lines: string[]) => lines.filter(line => line.startsWith("Desktop won't paint"))

test('Desktop paints the Tokyo Night look', async () => {
  expect(blocking(tokyo)).toEqual([])
  expect(blocking(checkColors(tokyoTheme))).toEqual([])
})

test('Desktop paints the Osaka Jade look', async () => {
  for (const line of osaka.problems.filter(l => /text-(primary|secondary|muted)/.test(l))) {
    console.log(line)
  }

  expect(blocking(osaka.problems)).toEqual([])
  expect(blocking(checkColors(osaka.theme))).toEqual([])
})

test('Desktop paints the RetroPC look', async () => {
  for (const line of retropc.problems.filter(l => /text-(primary|secondary|muted)|Desktop won/.test(l))) {
    console.log(line)
  }

  expect(blocking(retropc.problems)).toEqual([])
  expect(blocking(checkColors(retropc.theme))).toEqual([])
})

test('Desktop paints the Vantablack look', async () => {
  for (const line of vantablack.problems.filter(l => /text-(primary|secondary|muted)|Desktop won/.test(l))) {
    console.log(line)
  }

  expect(blocking(vantablack.problems)).toEqual([])
  expect(blocking(checkColors(vantablack.theme))).toEqual([])
})

test('Desktop paints the Citrix look', async () => {
  for (const line of citrix.problems.filter(l => /text-(primary|secondary|muted)|Desktop won/.test(l))) {
    console.log(line)
  }

  expect(blocking(citrix.problems)).toEqual([])
  expect(blocking(checkColors(citrix.theme))).toEqual([])
})
