import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
const thumbsDir = path.join(dir, 'thumbs');
fs.mkdirSync(thumbsDir, { recursive: true });

const items = [];

for (const art of manifest.artwork) {
  const thumb = 'thumbs/' + path.basename(art.file, '.png') + '.webp';
  const src = path.join(dir, art.file);
  const out = path.join(dir, thumb);
  const stale = !fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(src).mtimeMs;

  if (stale) {
    await sharp(src)
      .resize({ width: 900, height: 510, fit: 'inside' })
      .webp({ quality: 82 })
      .toFile(out);
  }

  items.push({ ...art, thumb });
}

const data = JSON.stringify(items).replace(/</g, '\\u003c');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Artwork Review — Startups as a Band: Smells Like Team Spirit</title>
<style>
  :root {
    --paper: #f4f1e8;
    --ink: #111;
    --muted: #6b6b63;
    --line: #111;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  header {
    padding: 56px clamp(20px, 5vw, 76px) 28px;
    border-bottom: 2px solid var(--line);
  }
  .eyebrow {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
    letter-spacing: .18em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  h1 {
    margin: 0;
    font-size: clamp(48px, 9vw, 132px);
    line-height: .84;
    letter-spacing: -.045em;
    text-transform: uppercase;
    font-weight: 900;
  }
  .subtitle {
    margin: 10px 0 0;
    font-size: clamp(20px, 3vw, 34px);
    font-weight: 700;
    letter-spacing: -.01em;
    text-transform: uppercase;
  }
  .lede {
    max-width: 74ch;
    margin: 22px 0 0;
    color: var(--muted);
    line-height: 1.55;
    font-size: 15px;
  }
  .lede a { color: var(--ink); }
  .stats {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 26px;
    margin-top: 22px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
    color: var(--muted);
  }
  .stats b { color: var(--ink); font-weight: 600; }
  main { padding: 30px clamp(20px, 5vw, 76px) 80px; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    gap: 24px;
  }
  .card {
    display: flex;
    flex-direction: column;
    background: var(--paper);
    border: 2px solid var(--line);
  }
  .thumb {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #e7e3d8;
    border-bottom: 2px solid var(--line);
    cursor: zoom-in;
  }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .45s cubic-bezier(.2, .7, .3, 1);
  }
  .card:hover .thumb img { transform: scale(1.025); }
  .badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--ink);
    color: var(--paper);
    padding: 5px 8px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
  .badge.alt {
    background: var(--paper);
    color: var(--ink);
    border: 1px solid var(--ink);
  }
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 18px 20px 20px;
    flex: 1;
  }
  .meta {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 10px;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .card h2 {
    margin: 0;
    font-size: 22px;
    line-height: 1.05;
    letter-spacing: -.01em;
    text-transform: uppercase;
  }
  .crop {
    color: var(--ink);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
  }
  details {
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid var(--line);
  }
  summary {
    cursor: pointer;
    font-size: 10px;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--muted);
    user-select: none;
  }
  summary:hover { color: var(--ink); }
  pre {
    margin: 10px 0 0;
    padding: 12px;
    max-height: 250px;
    overflow: auto;
    background: #e7e3d8;
    border: 1px solid var(--line);
    color: #222;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
    line-height: 1.55;
    white-space: pre-wrap;
    word-break: break-word;
  }
  .copy {
    margin-top: 9px;
    appearance: none;
    border: 1px solid var(--line);
    background: transparent;
    color: var(--ink);
    padding: 6px 10px;
    font: inherit;
    font-size: 10px;
    letter-spacing: .1em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .copy:hover { background: var(--ink); color: var(--paper); }
  .note {
    max-width: 74ch;
    margin-top: 36px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-size: 13px;
    line-height: 1.55;
  }
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(10, 10, 10, .95);
  }
  .lightbox.open { display: flex; }
  .lb-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    max-width: min(1200px, 94vw);
    max-height: 94vh;
  }
  .lb-stage img {
    max-width: 100%;
    max-height: 78vh;
    object-fit: contain;
    display: block;
  }
  .lb-cap {
    color: #ddd;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
    letter-spacing: .08em;
    text-transform: uppercase;
    text-align: center;
  }
  .lb-cap a { color: #fff; }
  .lb-close, .lb-prev, .lb-next {
    position: absolute;
    appearance: none;
    border: 1px solid #555;
    background: rgba(0, 0, 0, .6);
    color: #fff;
    width: 44px;
    height: 44px;
    font-size: 20px;
    cursor: pointer;
    display: grid;
    place-items: center;
  }
  .lb-close { top: 18px; right: 18px; }
  .lb-prev { left: 18px; top: 50%; transform: translateY(-50%); }
  .lb-next { right: 18px; top: 50%; transform: translateY(-50%); }
  .lb-close:hover, .lb-prev:hover, .lb-next:hover { border-color: #fff; }
  @media (max-width: 520px) {
    .grid { grid-template-columns: 1fr; }
    .lb-prev { left: 8px; }
    .lb-next { right: 8px; }
  }
</style>
</head>
<body>
<header>
  <div class="eyebrow">Artwork review · fal.ai · google/nano-banana-2.1</div>
  <h1>Startups as a <em>Band</em></h1>
  <div class="subtitle">Smells Like Team Spirit</div>
  <p class="lede">
    Black-and-white hero directions for the Eleven Society breakout post. This review is kept
    separate from the <a href="../pmf-is-gonna-rock-you/index.html">KLF PMF artwork review</a>. Click either hero to
    inspect it full size; expand <strong>Prompt</strong> to read or copy the generation prompt.
  </p>
  <div class="stats">
    <span><b id="total">2</b> hero options</span>
    <span>16:9 · 2752 × 1536</span>
    <span>Hero A is wired into the post</span>
  </div>
</header>

<main>
  <div class="grid" id="grid"></div>
  <p class="note">
    Hero A (shapes) is the post hero; Hero B is the shapes alternate. Poster A/B are earlier
    gig-poster directions, kept as alternates.
  </p>
</main>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Artwork preview">
  <button class="lb-close" id="lbClose" aria-label="Close">×</button>
  <button class="lb-prev" id="lbPrev" aria-label="Previous">‹</button>
  <button class="lb-next" id="lbNext" aria-label="Next">›</button>
  <div class="lb-stage">
    <img id="lbImg" alt="">
    <div class="lb-cap" id="lbCap"></div>
  </div>
</div>

<script>
var ART = ${data};
var current = 0;

function esc(value) {
  return String(value).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

function cardHTML(item, index) {
  var badge = item.recommended
    ? '<span class="badge">In post</span>'
    : '<span class="badge alt">Alternate</span>';
  var crop = item.socialCrop
    ? '<a class="crop" href="' + item.socialCrop + '" target="_blank" rel="noopener">1200×630 social crop</a>'
    : '';
  return '<article class="card">' +
    '<div class="thumb" data-index="' + index + '" role="button" tabindex="0" aria-label="Open ' + esc(item.concept) + '">' +
      '<img loading="lazy" src="' + item.thumb + '" alt="' + esc(item.concept) + '">' + badge +
    '</div>' +
    '<div class="card-body">' +
      '<div class="meta">Hero · ' + item.dimensions.width + '×' + item.dimensions.height + ' · 16:9</div>' +
      '<h2>' + esc(item.concept) + '</h2>' +
      crop +
      '<details><summary>Prompt</summary>' +
        '<pre>' + esc(item.prompt) + '</pre>' +
        '<button class="copy" data-index="' + index + '" type="button">Copy prompt</button>' +
      '</details>' +
    '</div>' +
  '</article>';
}

function render() {
  document.getElementById('grid').innerHTML = ART.map(cardHTML).join('');
  document.getElementById('total').textContent = String(ART.length);

  Array.prototype.forEach.call(document.querySelectorAll('.thumb'), function (thumb) {
    thumb.addEventListener('click', function () {
      openLightbox(Number(thumb.dataset.index));
    });
    thumb.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(Number(thumb.dataset.index));
      }
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('.copy'), function (button) {
    button.addEventListener('click', copyPrompt);
  });
}

function fallbackCopy(text) {
  var area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  try { document.execCommand('copy'); } catch (error) {}
  area.remove();
}

function copyPrompt(event) {
  event.preventDefault();
  event.stopPropagation();
  var button = event.currentTarget;
  var item = ART[Number(button.dataset.index)];
  var done = function () {
    button.textContent = 'Copied';
    setTimeout(function () { button.textContent = 'Copy prompt'; }, 1500);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(item.prompt).then(done, function () {
      fallbackCopy(item.prompt); done();
    });
  } else {
    fallbackCopy(item.prompt); done();
  }
}

function openLightbox(index) {
  current = index;
  var item = ART[current];
  document.getElementById('lbImg').src = item.file;
  document.getElementById('lbImg').alt = item.concept;
  document.getElementById('lbCap').innerHTML =
    esc(item.concept) + ' · <a href="' + item.file + '" target="_blank" rel="noopener">open original</a>';
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lbImg').src = '';
  document.body.style.overflow = '';
}

function step(direction) {
  if (!ART.length) return;
  current = (current + direction + ART.length) % ART.length;
  openLightbox(current);
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', function () { step(-1); });
document.getElementById('lbNext').addEventListener('click', function () { step(1); });
document.getElementById('lightbox').addEventListener('click', function (event) {
  if (event.target === event.currentTarget) closeLightbox();
});
document.addEventListener('keydown', function (event) {
  var open = document.getElementById('lightbox').classList.contains('open');
  if (!open) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') step(-1);
  if (event.key === 'ArrowRight') step(1);
});

render();
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log('Wrote index.html with', items.length, 'hero options.');
