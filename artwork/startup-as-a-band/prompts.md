# Prompts — Smells Like Team Spirit: Startups as a Band

Black-and-white artwork for the Eleven Society breakout post. The primary hero is a graffiti wall in
the style of the famous “Kurt smells like teen spirit” wall; the closing image is an 80s classifieds
page with a red marker circle.

**Model:** `google/nano-banana-2.1` (heroes and ads) / `google/nano-banana-2.1/edit` (red circles)
**Settings:** `aspect_ratio: 16:9 / 3:4`, `resolution: 2K`, `output_format: png`, `thinking_level: high`, `safety_tolerance: 4`

## Hero A — graffiti wall (used in post)
**File:** `hero-a.png`
**Social crop:** `hero-a-1200x630.png`

```text
Wide 16:9 black-and-white documentary photograph of a weathered, peeling exterior wall, shot straight on, like the famous 'Kurt smells like teen spirit' graffiti wall. Rough hand-painted black graffiti in uneven capital letters across the center: 'SMELLS LIKE' on the first line, 'TEAM SPIRIT' on the second, and a smaller scrawl below: 'STARTUPS AS A BAND'. A small dark plaque on the right edge reads '11'. Grimy concrete, chipped paint, stains, cracked plaster, harsh daylight. Grainy black-and-white film, high contrast, documentary photography. Render all quoted text exactly, correctly spelled and legible, hand-painted and slightly uneven. No real logos, no signatures.
```

## Hero B — STARTUPS SMELL LIKE TEAM SPIRIT
**File:** `hero-b.png`

```text
Wide 16:9 black-and-white documentary photograph of a weathered wall, like the famous 'Kurt smells like teen spirit' graffiti wall. Rough black hand-painted capitals across the wall: 'STARTUPS' on the first line, 'SMELL LIKE' on the second, 'TEAM SPIRIT' on the third. Smaller scrawl below: 'A BAND, PROBABLY'. Small plaque on the right reads '11'. Peeling paint, stains, cracked plaster, harsh daylight. Grainy black-and-white film, high contrast. Render all quoted text exactly, correctly spelled and legible, hand-painted and slightly uneven. No real logos, no signatures.
```

## Hero C — STARTUPS AS A BAND wall
**File:** `hero-c.png`

```text
Wide 16:9 black-and-white documentary photograph of a weathered wall, like the famous 'Kurt smells like teen spirit' graffiti wall. Rough black hand-painted capitals: 'STARTUPS AS A BAND' large across the wall, with a smaller line below: 'SMELLS LIKE TEAM SPIRIT'. Small plaque on the right reads '11'. Peeling paint, stains, cracked plaster, harsh daylight. Grainy black-and-white film, high contrast. Render all quoted text exactly, correctly spelled and legible, hand-painted and slightly uneven. No real logos, no signatures.
```

## Classifieds — clean page
**File:** `ad-b.png`

```text
Wide 16:9 scan of a 1980s Village Voice classifieds page, black ink on aged newsprint. A small headline at the top: 'CLASSIFIEDS'. Three boxed ads in a row with thick black borders. Left box: 'WANTED: DRUMMER. Influences: Diamond Head, Iron Maiden, shipping. No junior Ginger Bakers.' Middle box: 'WANTED: TECH CO-FOUNDER. Equity only. Influences: Aerosmith, Alice Cooper. No time wasters.' Right box: 'WANTED: DREAMER. No experience necessary. Must have a point of view.' Along the bottom, a small typewriter line: 'START A BAND. OR A COMPANY.' Halftone dots, photocopy grain, torn paper edge. Black and white only. Render all quoted text exactly, correctly spelled and legible. No real logos, no signatures.
```

## Classifieds — red circle around all three (used in post)
**File:** `ad-circle-all.png`
**Edit prompt:**

```text
Add a loose hand-drawn red marker circle around all three 'WANTED' ads as one group. Keep the aged newsprint background, all ad text and the layout exactly unchanged. The circle should look like a real red marker stroke, slightly rough, with a small overshoot at the ends. Do not change any text.
```

## Classifieds — focused circles and single ad
- `ad-circle-tech.png`: circle the middle “WANTED: TECH CO-FOUNDER” ad.
- `ad-circle-drummer.png`: circle the left “WANTED: DRUMMER” ad.
- `ad-circle-single.png`: circle the entire portrait “WANTED” box.
- `ad-a.png`: clean portrait single ad.

All three focused edits use the same instruction as above with the target ad named, and “Do not
change any text.”

## Perfect Co-Founder — ELEVEN (used in post)
**File:** `perfect-cofounder-eleven.png`

```text
Landscape 4:3 scan of a vintage 1971 Melody Maker classified ad, black ink on aged yellowed newsprint, a small rectangular clipping with a thick black border and pieces of aged tape at the corners. At the top, bold black serif type in quotes: 'The Perfect Co-Founder'. Below, smaller bold sans-serif: 'for AVANT-ROCK STARTUP'. Then a block of italic serif text: 'Original, creative, adaptable, technical, fast, slow, elegant, witty, scary, stable, tricky'. Below, bold condensed caps: 'QUALITY PEOPLE ONLY'. At the bottom, bold type: '"ELEVEN" 223 0296'. Slight stains, worn paper, photocopy grain. Aged newsprint tone with black ink. Render all quoted text exactly, correctly spelled and legible. No real logos, no signatures.
```

## Perfect Co-Founder — PWV (alternate)
**File:** `perfect-cofounder-pwv.png`

```text
Landscape 4:3 scan of a vintage 1971 Melody Maker classified ad, black ink on aged yellowed newsprint, a small rectangular clipping with a thick black border and pieces of aged tape at the corners. At the top, bold black serif type in quotes: 'The Perfect Co-Founder'. Below, smaller bold sans-serif: 'for AVANT-ROCK COMPANY'. Then a block of italic serif text: 'Original, creative, adaptable, technical, fast, slow, elegant, witty, scary, stable, tricky'. Below, bold condensed caps: 'QUALITY PEOPLE ONLY'. At the bottom, bold type: '"PWV" 223 0296'. Slight stains, worn paper, photocopy grain. Aged newsprint tone with black ink. Render all quoted text exactly, correctly spelled and legible. No real logos, no signatures.
```

## Influences — list (used in post)
**File:** `influences-list.png`

```text
Landscape 4:3 scan of a vintage 1980s NME or Village Voice classified ad, black ink on aged yellowed newsprint, a small rectangular clipping with a thick black border and aged tape at the corners. At the top, huge bold black condensed capitals: 'INFLUENCES'. Below, a centered list in bold black type, one band per line: 'PIXIES', 'STONE ROSES', 'GALAXIE 500', 'B-52S', 'NEW ORDER', 'DEBBIE HARRY', 'HAPPY MONDAYS'. At the bottom, small bold type: 'QUALITY PEOPLE ONLY. START A BAND. OR A COMPANY.' Slight stains, photocopy grain, worn paper. Black and white. Render all quoted text exactly, correctly spelled and legible. No real logos, no signatures.
```

## Influences — bullet run (alternate)
**File:** `influences-run.png`

```text
Landscape 4:3 scan of a vintage 1980s NME or Village Voice classified ad, black ink on aged yellowed newsprint, a small rectangular clipping with a thick black border and aged tape at the corners. At the top, huge bold black condensed capitals: 'INFLUENCES'. Below, a centered run of bold black band names separated by bullets: 'PIXIES · STONE ROSES · GALAXIE 500 · B-52S · NEW ORDER · DEBBIE HARRY · HAPPY MONDAYS'. At the bottom, small bold type: 'QUALITY PEOPLE ONLY. START A BAND. OR A COMPANY.' Slight stains, photocopy grain, worn paper. Black and white. Render all quoted text exactly, correctly spelled and legible. No real logos, no signatures.
```

## Other variants
The shapes slides (`shapes-a.png`, `shapes-b.png`) and the poster alternates (`poster-a.png`,
`poster-b.png`) keep their exact prompts in `manifest.json`.
