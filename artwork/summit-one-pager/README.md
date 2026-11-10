# Summit One-Pager

Print-ready one-pager for the two breakout sessions at the Northeast Entrepreneurship Summit.

## Files

| File | Contents |
| --- | --- |
| `index.html` | Landscape 11 x 8.5 in layout with hero images, session copy, logos, and bio. |
| `one-pager.pdf` | Rendered PDF, one page, landscape letter. |
| `one-pager.md` | Markdown version of the same content. |
| `hero-pmf.jpg`, `hero-team.jpg` | Downscaled hero images used by the HTML and PDF. |
| `preview.png` | First-page preview. |

## Render

The PDF was rendered with Chrome headless:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --allow-file-access-from-files \
  --virtual-time-budget=3000 \
  --print-to-pdf="artwork/summit-one-pager/one-pager.pdf" \
  "file:///Users/dthyresson/projects/dthyresson/thyresson-io/artwork/summit-one-pager/index.html"
```

To print from a browser instead: open `index.html`, choose landscape, 11 x 8.5 in, and set margins to none.
