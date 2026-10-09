// shared helpers for the plates (deterministic randomness, stars, silhouettes)
const NS = 'http://www.w3.org/2000/svg';
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function el(parent, tag, attrs, text) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (text !== undefined) e.textContent = text;
  parent.appendChild(e); return e;
}
function stars(g, n, x0, y0, w, h, seed, maxR = 1.8, color = '#fff') {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const rad = Math.pow(r(), 3) * maxR + 0.4;
    el(g, 'circle', { cx: x0 + r() * w, cy: y0 + Math.pow(r(), 1.3) * h, r: rad, fill: color, opacity: 0.35 + r() * 0.65 });
  }
}
// generic silhouettes (facing right) in local coordinates
const HORSE = 'M20,90 C25,70 45,60 70,62 L120,60 C135,45 140,30 150,22 L158,10 L162,22 C170,25 178,32 182,40 L176,44 C168,40 162,42 158,48 L150,70 C152,80 150,92 146,100 L150,150 L142,150 L136,104 L118,108 L112,150 L104,150 L102,106 L70,104 L62,150 L54,150 L52,104 L40,100 L34,150 L26,150 L28,98 C18,100 10,108 4,118 C8,104 14,96 20,90 Z';
const CAMEL = 'M10,100 C14,84 34,66 58,64 C66,40 92,36 102,60 C112,62 118,56 122,48 L130,28 C134,20 148,18 152,26 L156,34 L146,36 L140,52 C138,66 132,76 124,82 L126,150 L118,150 L112,92 L72,94 L66,150 L58,150 L54,98 C42,100 32,106 24,114 L28,150 L20,150 L18,112 C12,110 8,106 10,100 Z';
const DONKEY = 'M24,70 C30,58 50,54 70,56 L104,54 C112,44 116,34 122,28 L118,8 L126,22 L132,8 L132,26 C140,30 146,38 148,46 L142,50 C136,46 130,48 126,52 L120,66 C120,74 118,82 114,88 L117,124 L110,124 L104,90 L88,92 L84,124 L77,124 L75,92 L56,90 L52,124 L45,124 L43,88 L36,86 L32,124 L25,124 L27,84 C18,86 12,92 8,100 C10,88 16,78 24,70 Z';
function figure(g, x, y, s, fill, opts = {}) {
  // standing robed figure, feet at (x,y), height ~ 120*s
  const t = el(g, 'g', { transform: `translate(${x},${y}) scale(${s})`, fill });
  el(t, 'path', { d: 'M-16,0 L-12,-60 C-12,-80 -6,-88 0,-88 C6,-88 12,-80 12,-60 L16,0 Z' });
  el(t, 'circle', { cx: 0, cy: -98, r: 11 });
  if (opts.turban) el(t, 'ellipse', { cx: 0, cy: -106, rx: 14, ry: 9 });
  if (opts.armsUp) {
    el(t, 'path', { d: 'M-9,-78 L-34,-128 L-28,-131 L-3,-84 Z' });
    el(t, 'path', { d: 'M9,-78 L34,-128 L28,-131 L3,-84 Z' });
  }
  return t;
}
function kneeling(g, x, y, s, fill) {
  const t = el(g, 'g', { transform: `translate(${x},${y}) scale(${s})`, fill });
  el(t, 'path', { d: 'M-22,0 C-22,-20 -14,-40 0,-44 C12,-44 18,-30 20,-14 L26,0 Z' });
  el(t, 'circle', { cx: 4, cy: -52, r: 10 });
  return t;
}
function glowDefs(svg, id, color, std = 6) {
  const defs = svg.querySelector('defs') || el(svg, 'defs', {});
  const f = el(defs, 'filter', { id, x: '-200%', y: '-200%', width: '500%', height: '500%' });
  el(f, 'feGaussianBlur', { stdDeviation: std, result: 'b' });
  const m = el(f, 'feMerge', {});
  el(m, 'feMergeNode', { in: 'b' }); el(m, 'feMergeNode', { in: 'SourceGraphic' });
  return f;
}
