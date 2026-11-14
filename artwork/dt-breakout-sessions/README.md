# DT Breakout Sessions One-Pager

Print-ready one-pager for the two breakout sessions at the Northeast Entrepreneurship Summit.

## Files

| File | Contents |
| --- | --- |
| `dt-breakout-sessions-index.html` | Landscape 11 x 8.5 in layout with hero images, session copy, logos, and bio. |
| `dt-breakout-sessions.pdf` | Rendered PDF, one page, landscape letter. |
| `dt-breakout-sessions.md` | Markdown version of the same content. |
| `hero-pmf.jpg`, `hero-team.jpg` | Downscaled hero images used by the HTML and PDF. |
| `dt-breakout-sessions-preview.png` | First-page preview. |
| `social/` | LinkedIn (1200 × 630) and square (1080 × 1080) share cards for both sessions, plus combined double-bill variants using the post OG art. Open [`social/index.html`](social/index.html) for the review page. |

## Render

The PDF was rendered with Chrome headless:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --allow-file-access-from-files \
  --virtual-time-budget=3000 \
  --print-to-pdf="artwork/dt-breakout-sessions/dt-breakout-sessions.pdf" \
  "file:///Users/dthyresson/projects/dthyresson/thyresson-io/artwork/dt-breakout-sessions/dt-breakout-sessions-index.html"
```

To print from a browser instead: open `dt-breakout-sessions-index.html`, choose landscape, 11 x 8.5 in, and set margins to none.
