# Artwork — PMF Is Gonna Rock Ya!

KLF-inspired sleeve artwork generated with `google/nano-banana-2.1` on fal for the blog post
`src/content/blog/post-pmf-is-gonna-rock-you.mdx`.

See also the [Startup as a Band artwork](../startup-as-a-band/).

## Folders

| Path | Contents |
| --- | --- |
| `klf-source/` | Original KLF / The Timelords sleeve scans (from Discogs) used as design reference. Moved here from `public/klf/`. |
| `./` | Generated covers in this folder. Square album art is 2048 × 2048 PNG, the intro book cover is 1792 × 2400 (3:4), and the OG hero master is 2752 × 1536 with a 1200 × 630 social crop. Multiple variants per company plus hero options. |

## Files

- **`index.html`** — self-contained visual review page: filter by company, inspect full size, read/copy each prompt. Open it directly in a browser.
- **`prompts.md`** — the exact prompt used for every image, in editable form.
- **`manifest.json`** — machine-readable metadata: file, concept, company, album reference, model, request ID, source URL, and prompt.
- **`thumbs/`** — 720 px WebP thumbnails used by the review page.
- **`build-review.mjs`** — regenerates `index.html` and the thumbnails from `manifest.json`:

  ```sh
  node artwork/build-review.mjs
  ```

## Source references

| Scan | Release | Link |
| --- | --- | --- |
| `R-142447-1148417810.jpg`, `R-142447-1301460989.jpg` | The Timelords — *Doctorin' the Tardis* (1988) | https://www.discogs.com/release/142447 |
| `R-64061-1158584786.jpg`, `R-64061-1164005042.jpg` | The KLF — *Justified & Ancient* (1991) | https://www.discogs.com/release/64061 |
| `R-92768-1191859145.jpg`, `R-92768-1459735552-7495.jpg` | The KLF — *What Time Is Love? (Pure Trance 1)* (1988) + green "THE KLF" promo sleeve | https://www.discogs.com/release/92768 |
| `R-159933-1256590664.jpg`, `R-159933-1256590676.jpg`, `R-159933-1256590696.jpg` | The KLF — *3 A.M. Eternal* (1991) | https://www.discogs.com/release/159933 |
| `R-112781-1259349301.jpg` | The KLF — *Kylie Said to Jason* (1989) | https://www.discogs.com/release/112781 |
| `R-194588-1615141234-6380.jpg` | The KLF — *The White Room* (1991) | https://www.discogs.com/release/194588 |
| `R-144646-1357739118-4048.jpg` | The KLF — *Make It Rain / No More Tears* 12" promo (1991) | https://www.discogs.com/release/144646 |
| `R-38520075-1790264297-8844.jpg` | The KLF — *The White Room* (1989 Director's Cut purple sleeve) | https://www.discogs.com/release/38520075 |
| `R-38520741-1790268421-9844.jpg` | The KLF — *Come Down Dawn* (1991) | https://www.discogs.com/release/38520741 |
| `9781899858651-us.jpg` | *The Manual: How to Have a Number One the Easy Way* — Jimmy Cauty & Bill Drummond (1988) | https://en.wikipedia.org/wiki/The_Manual |
| `9798342963251-us.jpg` | *The Manual* — leyline cover variant | — |

## Design language extracted

- Flat spot colours: black, fluorescent chartreuse/lime `#C6FF00`, safety orange, cream, acid green, electric violet-purple.
- Massive tightly-tracked condensed grotesque capitals, often italic, often cropped by the sleeve edge.
- Stacked word columns: one enormous word per line, edge to edge, no imagery.
- One giant letterform or numeral as the whole composition.
- Repetition grids of the same word, cropped by the sleeve, with a circular record label dropped in the centre.
- The pyramid emblem: brick-wall base + boombox + ram's-horn silhouette inside a circle.
- Tiny Helvetica credits and a catalogue code in the corners.
- Book-cover typography: giant stacked title, bracketed subtitle, small line-art emblem and a PWV Press imprint.
- Photocopy grain, halftone dots, worn paper and creased sleeve edges.

## Recommended picks

| Slot | Pick | Why |
| --- | --- | --- |
| Intro — The Manual | `manual-a.png` + `manual-b.png` | Both are used: A (stark) introduces the book, B (branded) closes the Manual section. |
| OG / social hero | `hero-og-purple.png` (16:9 master), `hero-og-purple-1200x630.png` (exact OG crop) | Title is readable at social-preview size and the purple palette appears nowhere else. |
| Square hero alternates | `hero-d-pmf-grid.png`, `hero-e-pmf-purple-stacked.png`, `hero-f-pmf-split.png` | Repetition wall / square purple / split-colour album art. |
| Cursor — Doctorin' the Product | `cursor-a-doctorin-the-product.png` | Police car + jagged speech bubble; the direct *Doctorin' the Tardis* parody. |
| fal — Last Train to Model Central | `fal-b-last-train-to-model-central.png` | Viaduct + giant cropped lime FAL. |
| Turso — What Time Is Fit? | `turso-b-what-time-is-fit.png` | Orange *Pure Trance* rework; the database icon in "FIT" is the clearest joke. |
| Workbrew — 3 A.M. Eternal | `workbrew-b-3am-eternal.png` | Pint-glass terminal is more original than the inset office. |
| Zoo — Justified & Validated | `zoo-a-justified-and-validated.png` | Ice-cream van with the condensed ZOO wordmark. |
| Jura — It's Grim Pre-Fit | `jura-b-its-grim-pre-fit.png` | Close-up burning £50 is a cleaner read than the suitcase. |

These nine are inlined in the post: `manual-a.png`, `manual-b.png`, `hero-og-purple.png`, `cursor-a`, `fal-b`, `turso-b`, `workbrew-b`, `zoo-a`, `jura-b`. The square hero alternates remain available for the OG card or a different layout.

The first-pass heroes (`hero-a`, `hero-b`, `hero-c`) are superseded as hero picks. `hero-b` and
`hero-c` repeated the police-car and glowing *3 A.M. Eternal* treatments used by the section covers;
they remain in the folder as alternates. The landscape grid and split attempts were dropped because
their bottom copy clipped or duplicated — their square versions remain as album art.

## Wiring the hero

The post hero should use the 16:9 master: `hero-og-purple.png`. The site renders the post card at
`1024×576` and generates the OG tag at `1200×630`, so the landscape master fits both. Use
`hero-og-purple-1200x630.png` only for a direct social upload.

## Regenerating

Every image was generated with:

- model: `google/nano-banana-2.1`
- `aspect_ratio`: `1:1` for album art, `16:9` for the OG hero, `3:4` for the intro book cover
- `resolution`: `2K`
- `output_format`: `png`
- `thinking_level`: `high`
- `safety_tolerance`: `4`

The OG master is cropped to the exact social size with sharp:
`sharp(src).resize(1200, 630, { fit: 'cover' })`.

To make a new take, edit the prompt in `prompts.md`, submit the same settings, and save the result
with an incremented suffix (`-a`, `-b`, `-c`, …). The Nano Banana base route is text-to-image only;
for image-reference variants use `google/nano-banana-2.1/edit` with `image_urls`.
