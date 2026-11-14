import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));

const recommended = new Set([
  'manual-a.png',
  'manual-b.png',
  'pmf-b-same-book.png',
  'hero-og-purple.png',
  'hero-d-pmf-grid.png',
  'hero-e-pmf-purple-stacked.png',
  'hero-f-pmf-split.png',
  'cursor-a-doctorin-the-product.png',
  'fal-b-last-train-to-model-central.png',
  'turso-b-what-time-is-fit.png',
  'workbrew-b-3am-eternal.png',
  'zoo-a-justified-and-validated.png',
  'jura-b-its-grim-pre-fit.png'
]);

const groupOrder = ['Intro', 'PMF', 'Hero', 'Cursor', 'fal', 'Turso', 'Workbrew', 'Zoo', 'Jura'];
const labels = {
  manual: 'Intro',
  pmf: 'PMF',
  hero: 'Hero',
  cursor: 'Cursor',
  fal: 'fal',
  turso: 'Turso',
  workbrew: 'Workbrew',
  zoo: 'Zoo',
  jura: 'Jura'
};

const thumbsDir = path.join(dir, 'thumbs');
fs.mkdirSync(thumbsDir, { recursive: true });

const items = [];

for (const art of manifest.artwork) {
  const slug = path.basename(art.file, '.png').split('-')[0];
  const thumbName = path.basename(art.file, '.png') + '.webp';
  const thumb = 'thumbs/' + thumbName;
  const src = path.join(dir, art.file);
  const out = path.join(dir, thumb);

  const stale = !fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(src).mtimeMs;
  if (stale) {
    await sharp(src)
      .resize({ width: 720, height: 720, fit: 'inside' })
      .webp({ quality: 82 })
      .toFile(out);
  }

  items.push({
    ...art,
    slug,
    group: labels[slug] || 'Other',
    thumb,
    wide: art.aspect === '16:9' || /-og-/.test(art.file),
    portrait: art.aspect === '3:4',
    recommended: recommended.has(art.file)
  });
}

items.sort((a, b) => {
  const ga = groupOrder.indexOf(a.group);
  const gb = groupOrder.indexOf(b.group);
  if (ga !== gb) return ga - gb;
  if (a.group === 'Hero' && a.wide !== b.wide) return a.wide ? -1 : 1;
  return a.file.localeCompare(b.file);
});

const sources = manifest.sourceReferences.map((group) => ({
  release: group.release,
  year: group.year,
  discogs: group.discogs,
  files: group.files.map((file) => ({ path: file, name: path.basename(file) }))
}));

const artData = JSON.stringify(items).replace(/</g, '\\u003c');
const sourceData = JSON.stringify(sources).replace(/</g, '\\u003c');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Artwork Review — PMF Is Gonna Rock Ya!</title>
<style>
  :root {
    --bg: #080808;
    --panel: #131313;
    --ink: #f2f0e6;
    --muted: #8f8f86;
    --lime: #c6ff00;
    --orange: #ff6b00;
    --line: #2b2b2b;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  header {
    padding: 56px clamp(20px, 5vw, 76px) 28px;
    border-bottom: 1px solid var(--line);
  }
  .eyebrow {
    font-size: 11px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--lime);
    margin-bottom: 14px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  h1 {
    margin: 0;
    font-size: clamp(46px, 9vw, 132px);
    line-height: .84;
    letter-spacing: -.045em;
    text-transform: uppercase;
    font-weight: 900;
  }
  h1 em { color: var(--lime); font-style: normal; }
  .lede {
    max-width: 74ch;
    margin: 22px 0 0;
    color: var(--muted);
    line-height: 1.55;
    font-size: 15px;
  }
  .lede strong { color: var(--ink); font-weight: 600; }
  .stats {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 26px;
    margin-top: 22px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
    color: var(--muted);
  }
  .stats b { color: var(--lime); font-weight: 600; }
  .filters {
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 14px clamp(20px, 5vw, 76px);
    background: rgba(8, 8, 8, .94);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
  }
  .filters button {
    appearance: none;
    border: 1px solid var(--line);
    background: transparent;
    color: var(--muted);
    padding: 7px 13px;
    font: inherit;
    font-size: 11px;
    letter-spacing: .1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: .15s ease;
  }
  .filters button:hover { color: var(--ink); border-color: var(--muted); }
  .filters button.active {
    background: var(--lime);
    border-color: var(--lime);
    color: #000;
  }
  main { padding: 30px clamp(20px, 5vw, 76px) 90px; }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    gap: 22px;
  }
  .card {
    display: flex;
    flex-direction: column;
    background: var(--panel);
    border: 1px solid var(--line);
  }
  .thumb {
    position: relative;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    background: #000;
    cursor: zoom-in;
  }
  .thumb.wide { aspect-ratio: 16 / 9; }
  .thumb.portrait { aspect-ratio: 3 / 4; }
  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .45s cubic-bezier(.2, .7, .3, 1);
  }
  .card:hover .thumb img { transform: scale(1.035); }
  .badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--lime);
    color: #000;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: 5px 8px;
  }
  .badge.og {
    left: auto;
    right: 12px;
    background: var(--orange);
  }
  .badge.book {
    left: auto;
    right: 12px;
    background: var(--ink);
  }
  .crop {
    color: var(--lime);
    text-decoration: none;
    border-bottom: 1px solid currentColor;
  }
  .crop:hover { color: var(--ink); }
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 9px;
    padding: 16px 18px 18px;
    flex: 1;
  }
  .meta {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 10px;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--muted);
    line-height: 1.5;
  }
  .card h2 {
    margin: 0;
    font-size: 21px;
    line-height: 1.05;
    letter-spacing: -.01em;
    text-transform: uppercase;
  }
  .cat {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
    color: var(--lime);
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
    background: #0b0b0b;
    border: 1px solid var(--line);
    color: #cfcfc6;
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
    color: var(--lime);
    padding: 6px 10px;
    font: inherit;
    font-size: 10px;
    letter-spacing: .1em;
    text-transform: uppercase;
    cursor: pointer;
  }
  .copy:hover { border-color: var(--lime); }
  .section-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin: 54px 0 18px;
    padding-top: 22px;
    border-top: 1px solid var(--line);
  }
  .section-head h2 {
    margin: 0;
    font-size: 24px;
    letter-spacing: -.01em;
    text-transform: uppercase;
  }
  .section-head span {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px;
    color: var(--muted);
  }
  .sources {
    display: flex;
    gap: 14px;
    overflow-x: auto;
    padding-bottom: 12px;
  }
  .source {
    flex: 0 0 190px;
    color: inherit;
    text-decoration: none;
    border: 1px solid var(--line);
    background: var(--panel);
  }
  .source img {
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    background: #000;
  }
  .source p {
    margin: 0;
    padding: 9px 10px;
    font-size: 11px;
    line-height: 1.35;
    color: var(--muted);
  }
  .source:hover p { color: var(--ink); }
  .source:hover { border-color: var(--lime); }
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(0, 0, 0, .95);
  }
  .lightbox.open { display: flex; }
  .lb-stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    max-width: min(1100px, 94vw);
    max-height: 94vh;
  }
  .lb-stage img {
    max-width: 100%;
    max-height: 78vh;
    object-fit: contain;
    display: block;
    box-shadow: 0 30px 80px rgba(0, 0, 0, .6);
  }
  .lb-cap {
    font-size: 12px;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--muted);
    text-align: center;
  }
  .lb-cap a { color: var(--lime); }
  .lb-close, .lb-prev, .lb-next {
    position: absolute;
    appearance: none;
    border: 1px solid var(--line);
    background: rgba(0, 0, 0, .6);
    color: var(--ink);
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
  .lb-close:hover, .lb-prev:hover, .lb-next:hover { border-color: var(--lime); color: var(--lime); }
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
  <h1>PMF Is Gonna <em>Rock Ya!</em></h1>
  <p class="lede">
    KLF-inspired artwork for the <strong>PMF Is Gonna Rock Ya!</strong> blog post. Each piece
    connects a company to a KLF album or single. The wide purple card is the SEO/OG social hero, the
    3:4 book cover is the intro, and the square pieces are album art. See also the
    <a href="../smells-like-team-spirit/index.html">Smells Like Team Spirit review</a>. Click any sleeve to inspect it
    full size, expand <strong>Prompt</strong> to read or copy the exact generation prompt.
  </p>
  <div class="stats">
    <span><b id="total">23</b> pieces</span>
    <span><b id="recs">0</b> recommended picks</span>
    <span>OG 16:9 + book 3:4 + square album art</span>
    <span id="count">23 of 23 pieces</span>
  </div>
</header>

<nav class="filters" id="filters" aria-label="Filter artwork"></nav>

<main>
  <div class="grid" id="grid"></div>

  <div class="section-head">
    <h2>Source references</h2>
    <span>Discogs scans used as design inspiration</span>
  </div>
  <div class="sources" id="sources"></div>
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
var ART = ${artData};
var SOURCES = ${sourceData};

var groupOrder = ['Intro', 'PMF', 'Hero', 'Cursor', 'fal', 'Turso', 'Workbrew', 'Zoo', 'Jura'];
var filter = 'All';
var visible = [];
var current = 0;

function esc(value) {
  return String(value).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

function renderFilters() {
  var bar = document.getElementById('filters');
  var values = ['All', 'Recommended'].concat(groupOrder);
  bar.innerHTML = '';
  values.forEach(function (value) {
    var button = document.createElement('button');
    button.textContent = value;
    button.dataset.filter = value;
    if (value === filter) button.classList.add('active');
    button.addEventListener('click', function () {
      filter = value;
      renderFilters();
      render();
    });
    bar.appendChild(button);
  });
}

function cardHTML(item, index) {
  var badge = item.recommended ? '<span class="badge">Recommended</span>' : '';
  var og = item.wide ? '<span class="badge og">OG 16:9</span>' : '';
  var book = item.portrait ? '<span class="badge book">Book 3:4</span>' : '';
  var company = item.company ? ' · ' + esc(item.company) : '';
  var crop = item.socialCrop ? '<div class="meta"><a class="crop" href="' + item.socialCrop + '" target="_blank" rel="noopener">1200×630 social crop</a></div>' : '';
  return '<article class="card">' +
    '<div class="thumb' + (item.wide ? ' wide' : item.portrait ? ' portrait' : '') + '" data-index="' + index + '" role="button" tabindex="0" aria-label="Open ' + esc(item.concept) + '">' +
      '<img loading="lazy" src="' + item.thumb + '" alt="' + esc(item.concept) + '">' + badge + og + book +
    '</div>' +
    '<div class="card-body">' +
      '<div class="meta">' + esc(item.group) + company + ' · ' + esc(item.catalogCode) + '</div>' +
      '<h2>' + esc(item.concept) + '</h2>' +
      '<div class="meta">' + esc(item.albumReference) + '</div>' +
      '<div class="cat">' + esc(item.file) + '</div>' +
      crop +
      '<details><summary>Prompt</summary>' +
        '<pre>' + esc(item.prompt) + '</pre>' +
        '<button class="copy" data-prompt-index="' + index + '" type="button">Copy prompt</button>' +
      '</details>' +
    '</div>' +
  '</article>';
}

function render() {
  visible = ART.filter(function (item) {
    if (filter === 'All') return true;
    if (filter === 'Recommended') return item.recommended;
    return item.group === filter;
  });

  document.getElementById('grid').innerHTML = visible.map(cardHTML).join('');
  document.getElementById('count').textContent = visible.length + ' of ' + ART.length + ' pieces';

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
  var item = visible[Number(button.dataset.promptIndex)];
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
  var item = visible[current];
  document.getElementById('lbImg').src = item.file;
  document.getElementById('lbImg').alt = item.concept;
  document.getElementById('lbCap').innerHTML =
    esc(item.concept) + ' · ' + esc(item.catalogCode) +
    ' · <a href="' + item.file + '" target="_blank" rel="noopener">open original</a>';
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lbImg').src = '';
  document.body.style.overflow = '';
}

function step(direction) {
  if (!visible.length) return;
  current = (current + direction + visible.length) % visible.length;
  openLightbox(current);
}

function renderSources() {
  var host = document.getElementById('sources');
  SOURCES.forEach(function (group) {
    group.files.forEach(function (file) {
      var link = document.createElement('a');
      link.className = 'source';
      link.href = file.path;
      link.target = '_blank';
      link.rel = 'noopener';
      link.innerHTML = '<img loading="lazy" src="' + file.path + '" alt="' + esc(group.release) + '">' +
        '<p>' + esc(group.release) + ' <span>(' + group.year + ')</span></p>';
      host.appendChild(link);
    });
  });
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

document.getElementById('total').textContent = String(ART.length);
document.getElementById('recs').textContent = String(ART.filter(function (item) { return item.recommended; }).length);
renderFilters();
render();
renderSources();
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log('Wrote index.html with', items.length, 'artwork entries and', sources.length, 'source groups.');
