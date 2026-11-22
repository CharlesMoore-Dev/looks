import { expect, test } from 'claude-code/testing'

// Mounting runs the engine's backdrop check on each scene: an unsafe Svg throws.
for (const scene of ['osaka-jade-dusk', 'tokyo-skyline', 'retropc-amber-tube', 'vantablack-dot-hands']) {
  test(`the ${scene} scene draws as the backdrop on desktop and mobile`, async ($, on) => {
    // Nothing beneath the mod draws a backdrop in the test host.
    on('ui.render', () => ({ value: null }))

    for (const surface of ['desktop', 'mobile'] as const) {
      const ui = await $.ui.mount({
        plugin: 'looks',
        component: 'Backdrop',
        requestId: 'look',
        surface,
        props: { scene, plugin: 'looks', glass: { blur: 18, opacity: 0.72 } },
      })

      expect(JSON.stringify(await ui.drawn())).toContain('Svg')
    }
  })
}

test('/look switches and remembers the look', async ($, on) => {
  on('ui.render', () => ({ value: null }))
  on('command.register', () => ({ value: { command: 'look' } }))
  on('command.run', () => ({}))
  on('theme.set', () => ({ value: { isDrawn: true, requestId: 'look' } }))
  const store = new Map<string, unknown>()
  on('store.get', (_, e) => ({ value: store.get(e.key) }))
  on('store.set', (_, e) => {
    store.set(e.key, e.value)
    return { value: undefined }
  })

  const listed = await $.command.run({ command: 'look', args: '' })
  expect(listed.text).toContain('osaka-jade')

  const switched = await $.command.run({ command: 'look', args: 'tokyo-night' })
  expect(switched.text).toBe('Look switched to tokyo-night.')
  expect(store.get('look')).toBe('tokyo-night')

  const bad = await $.command.run({ command: 'look', args: 'nope' })
  expect(bad.text).toContain('No look named')
})
