# looks

Personal looks for the Claude desktop app. Loaded in every session through
`CLAUDE_CODE_PLUGIN_DIRS` in `~/.claude/settings.json`.

- `/look` shows the current look; `/look osaka-jade`, `/look tokyo-night`, `/look retropc` or `/look vantablack` switches (remembered).
- **Osaka Jade**: colours from Omarchy's `themes/osaka-jade/colors.toml` (omacom/omarchy), dark only.
  Backdrop traced from `source/osaka-jade-wallpaper.jpg` by `scripts/trace_wallpaper.py`.
- **RetroPC**: amber CRT colours from rondilley/omarchy-retropc-theme, dark only. Backdrop rebuilt
  from its `amber_tube.jpg` by `scripts/make_retropc_scene.py` (scanlines, rolling band, cursor).
- **Vantablack**: Omarchy's pure-black monochrome (`themes/vantablack/colors.toml`), dark only. Backdrop is
  its dot-hands wallpaper redrawn dot for dot by `scripts/make_vantablack_scene.py`, with a slow light sweep.
- **Tokyo Night**: Tokyo Night / Tokyo Night Day colours, skyline backdrop from `scripts/make_scene.py`.

Colours live in `hooks/osaka.ts`, `hooks/retropc.ts`, `hooks/vantablack.ts` and `hooks/look.ts` (Tokyo Night). Edits reload by themselves.

Retrace the wallpaper (needs `pip install pillow numpy opencv-python-headless`):

    python scripts/trace_wallpaper.py source/osaka-jade-wallpaper.jpg --crop-top 56 --width 900 --colors 20 --epsilon 1.0 --min-area 5 --keep-bright 4 --sharpen 0.3

The wallpaper art belongs to its maker: keep this mod private, don't publish it.
