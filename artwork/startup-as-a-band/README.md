# Startups as a Band: Smells Like Team Spirit — artwork

Separate from the KLF / PMF artwork review in the parent folder. The post reuses the earlier
Startup as a Service slides; the hero uses the same simple shaded-shapes aesthetic.

| Path | Contents |
| --- | --- |
| `index.html` | Black-and-white review page. Open directly in a browser. |
| `manifest.json` | Hero metadata: prompts, model, request IDs, source URLs. |
| `prompts.md` | Editable prompts for Hero A and Hero B. |
| `hero-a.png` | In-post shapes hero (16:9 master, 2752 × 1536). |
| `hero-a-1200x630.png` | Exact OG/social crop. |
| `hero-b.png` | Alternate shapes hero (title left). |
| `poster-a.png`, `poster-b.png` | Earlier gig-poster directions, kept as alternates. |
| `sources/R-990295-1556911978-2799.jpg` | Nirvana — "Smells Like Teen Spirit" single cover, used as the title/design reference. |
| `thumbs/` | Review thumbnails. |
| `build-review.mjs` | Regenerates `index.html` and thumbnails. |

```sh
node artwork/startup-as-a-band/build-review.mjs
```
