import type { EngineInterface, Register, ThemeSetArgs } from 'claude-code'

import { LOOK as TOKYO_LOOK, problems as tokyoProblems, SCENE_NAME as TOKYO_SCENE } from './look.js'
import { OSAKA_LOOK, OSAKA_SCENE, osaka } from './osaka.js'
import { OSAKA_SCENE_SVG } from './osaka-scene.js'
import { RETROPC_LOOK, RETROPC_SCENE, retropc } from './retropc.js'
import { RETROPC_SCENE_SVG } from './retropc-scene.js'
import { SCENE as TOKYO_SCENE_SVG } from './scene.js'
import { VANTABLACK_LOOK, VANTABLACK_SCENE, vantablack } from './vantablack.js'
import { VANTABLACK_SCENE_SVG } from './vantablack-scene.js'

type Entry = { look: ThemeSetArgs; scene: string; svg: string; alt: string; problems: string[] }

const LOOKS: Record<string, Entry> = {
  'osaka-jade': {
    look: OSAKA_LOOK,
    scene: OSAKA_SCENE,
    svg: OSAKA_SCENE_SVG,
    alt: 'A hillside town at dusk under a jade-green sky: a lit house, utility poles and wires, mountains and a far city',
    problems: osaka.problems,
  },
  'tokyo-night': {
    look: TOKYO_LOOK,
    scene: TOKYO_SCENE,
    svg: TOKYO_SCENE_SVG,
    alt: 'A Tokyo skyline at night under a crescent moon and twinkling stars',
    problems: tokyoProblems,
  },
  retropc: {
    look: RETROPC_LOOK,
    scene: RETROPC_SCENE,
    svg: RETROPC_SCENE_SVG,
    alt: 'An old amber CRT screen glowing faintly in its bezel, with scanlines and a blinking cursor',
    problems: retropc.problems,
  },
  vantablack: {
    look: VANTABLACK_LOOK,
    scene: VANTABLACK_SCENE,
    svg: VANTABLACK_SCENE_SVG,
    alt: 'Two hands reaching toward each other, drawn in white dots on pure black',
    problems: vantablack.problems,
  },
}

const DEFAULT = 'retropc'
const NAMES = Object.keys(LOOKS)

async function chosen($: EngineInterface): Promise<string> {
  const stored = await $.store.get('look')

  return typeof stored === 'string' && stored in LOOKS ? stored : DEFAULT
}

async function apply($: EngineInterface, name: string): Promise<void> {
  const entry = LOOKS[name] ?? LOOKS[DEFAULT]!
  // A line that would stop Desktop painting the look at all.
  const unpainted = entry.problems.find(line => line.startsWith("Desktop won't paint"))

  if (unpainted !== undefined) {
    $.ui.toast(`${name}: ${unpainted}`)
  }

  try {
    const set = await $.theme.set(entry.look)

    $.ui.status(set.isDrawn ? undefined : `${name}: ${set.reason}`)
  } catch (error) {
    // A host that refuses part of the look says why, rather than failing the command.
    $.ui.status(`${name}: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'look', description: `Switch the app's look: ${NAMES.join(', ')}` })
    await apply($, await chosen($))

    return next(e)
  })

  on('command.run', { command: 'look' }, async ($, e) => {
    const want = e.args.trim().toLowerCase()
    const current = await chosen($)

    if (want === '') {
      return { text: `Look: ${current}. Others: ${NAMES.filter(n => n !== current).join(', ')}. Use /look <name>.` }
    }

    if (!(want in LOOKS)) {
      return { text: `No look named "${want}". Choose one of: ${NAMES.join(', ')}.` }
    }

    await $.store.set('look', want)
    await apply($, want)

    return { text: `Look switched to ${want}.` }
  })

  // The chosen look's scene behind the conversation, on the desktop and mobile apps.
  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    const entry = Object.values(LOOKS).find(one => one.scene === e.props.scene)

    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || entry === undefined) {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    return <Svg source={entry.svg} alt={entry.alt} isInteractive />
  })
}
