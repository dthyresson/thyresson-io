# Smells Like Team Spirit: PMF Is Gonna Rock Ya! — artwork

Hero and social cards for the combined post at
`src/content/blog/post-find-your-band-find-your-fit.mdx`.

## Chosen hero

`hero.png` is `variants/hero-klf-a.png`. It is a wide KLF Communications-style 12-inch
sleeve: flat violet field, ultra-condensed white type, a black-and-white halftone
band/van inset, lime accents, the brick-wall/boombox pyramid emblem, and photocopy grain.

The first direction, a generic purple and graffiti split-van image, is kept in
`variants/hero-a.png` through `variants/hero-c.png`. It was rejected because it lost the
KLF sleeve language. The KLF edit variants are `variants/hero-klf-a.png` through
`variants/hero-klf-c.png`; A is the chosen hero.

## Files

| Path                                              | Contents                                                           |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| `hero.png`                                        | Chosen wide hero, 2752 x 1536.                                     |
| `variants/hero-klf-a.png`                         | Chosen KLF sleeve variant.                                         |
| `variants/hero-klf-b.png`, `hero-klf-c.png`       | KLF sleeve alternates.                                             |
| `variants/hero-a.png`, `hero-b.png`, `hero-c.png` | Rejected split-van alternates.                                     |
| `social-wide.html`                                | 1200 x 630 OG layout with the sleeve on a blurred sleeve backdrop. |
| `social-wide-1200x630.png`                        | Rendered wide OG.                                                  |
| `social-wide-2400x1260.png`                       | Rendered wide OG at 2x.                                            |
| `social-square.html`                              | 1080 x 1080 square social card with summit/date credits.           |
| `social-square-1080x1080.png`                     | Rendered square card.                                              |
| `social-square-2160x2160.png`                     | Rendered square card at 2x.                                        |
| `manifest.json`                                   | Model, request IDs, references, and output URLs.                   |
| `prompts.md`                                      | Exact edit prompt and settings.                                    |

## Render

```sh
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --allow-file-access-from-files --force-device-scale-factor=1 \
  --window-size=1200,630 \
  --screenshot="artwork/find-your-band-find-your-fit/social-wide-1200x630.png" \
  "file:///Users/dthyresson/projects/dthyresson/thyresson-io/artwork/find-your-band-find-your-fit/social-wide.html"

"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --allow-file-access-from-files --force-device-scale-factor=1 \
  --window-size=1080,1080 \
  --screenshot="artwork/find-your-band-find-your-fit/social-square-1080x1080.png" \
  "file:///Users/dthyresson/projects/dthyresson/thyresson-io/artwork/find-your-band-find-your-fit/social-square.html"
```

Use `--force-device-scale-factor=2` for the 2x files.
