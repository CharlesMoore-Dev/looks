# looks

Personal looks for the Claude desktop app. Loaded in every session through
`CLAUDE_CODE_PLUGIN_DIRS` in `~/.claude/settings.json`.

- `/look` shows the current look; `/look osaka-jade`, `/look tokyo-night`, `/look retropc`, `/look vantablack` or `/look citrix` switches (remembered).
- **Osaka Jade**: colours from Omarchy's `themes/osaka-jade/colors.toml` (omacom/omarchy), dark only.
  Backdrop traced from `source/osaka-jade-wallpaper.jpg` by `scripts/trace_wallpaper.py`.
- **RetroPC**: amber CRT colours from rondilley/omarchy-retropc-theme, dark only. Backdrop rebuilt
  from its `amber_tube.jpg` by `scripts/make_retropc_scene.py` (scanlines, rolling band, cursor).
- **Vantablack**: Omarchy's pure-black monochrome (`themes/vantablack/colors.toml`), dark only. Backdrop is
  its dot-hands wallpaper redrawn dot for dot by `scripts/make_vantablack_scene.py`, with a slow light sweep.
- **Citrix**: Citrix brand purple `#452170`, light and dark. Backdrop is the dot-over-X mark in `hooks/citrix-scene.ts`.
- **Tokyo Night**: Tokyo Night / Tokyo Night Day colours, skyline backdrop from `scripts/make_scene.py`.

Colours live in `hooks/osaka.ts`, `hooks/retropc.ts`, `hooks/vantablack.ts`, `hooks/citrix.ts` and `hooks/look.ts` (Tokyo Night). Edits reload by themselves.

Retrace the wallpaper (needs `pip install pillow numpy opencv-python-headless`):

    python scripts/trace_wallpaper.py source/osaka-jade-wallpaper.jpg --crop-top 56 --width 900 --colors 20 --epsilon 1.0 --min-area 5 --keep-bright 4 --sharpen 0.3

## Credits

The colours and wallpapers come from these themes; the backdrops are redrawn from their wallpapers.

- **Osaka Jade** and **Vantablack**: colours and wallpapers from [Omarchy](https://github.com/omacom/omarchy)
  (`themes/osaka-jade`, `themes/vantablack`).
- **RetroPC**: colours and the `amber_tube.jpg` backdrop from
  [rondilley/omarchy-retropc-theme](https://github.com/rondilley/omarchy-retropc-theme).
- **Tokyo Night**: palette from [Tokyo Night](https://github.com/enkia/tokyo-night-vscode-theme) by enkia, and
  Tokyo Night Day from [folke/tokyonight.nvim](https://github.com/folke/tokyonight.nvim). The skyline is original.
- **Citrix**: brand colour and mark from [Simple Icons](https://simpleicons.org) (`citrix.svg`, source brand.citrix.com).
  Citrix and its logo are trademarks of Cloud Software Group; this is an unofficial personal theme.
