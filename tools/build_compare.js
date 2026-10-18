// Side-by-side comparison: old text (right column) vs new text (left column), chapter by chapter.
// usage: node build_compare.js old.txt new.txt report.md out.docx
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, PageOrientation, HeadingLevel, PageBreak, Footer, PageNumber, CharacterSet } = require('docx');
const S = __dirname + '/../';
const [,, OLD, NEW, REP, OUT] = process.argv;
const FONT = 'Amiri';
const clean = s => s.replace(/⟦fn:[a-z0-9_]+⟧/g, '');
function sections(file) {
  const out = []; let cur = { key: 'front', title: 'الافتتاح', lines: [] };
  for (const l of fs.readFileSync(file, 'utf8').split('\n').filter(x => x.trim())) {
    const f = l.split('|');
    if (['#CH', '#PART', '#INTRO', '#APPENDIX', '#PROLOGUE'].includes(f[0])) {
      out.push(cur);
      const key = f[0] === '#CH' ? 'CH' + f[1] : f[0] === '#INTRO' ? 'IN' + f[2] : f[0] === '#PART' ? 'PA' + f[1] : f[0];
      cur = { key, title: f.slice(1).filter(Boolean).join(' — '), lines: [] }; continue;
    }
    if (l.startsWith('#EPIGRAPH')) { cur.lines.push(f.slice(1).join(' ')); continue; }
    if (l.startsWith('#')) { cur.lines.push('【' + f.slice(1).join(' — ') + '】'); continue; }
    if (l.startsWith('@')) { cur.lines.push('[صورة: ' + (f[2] || f[1]) + ']'); continue; }
    cur.lines.push(clean(l));
  }
  out.push(cur); return out.filter(s => s.lines.length || s.key !== 'front');
}
const A = sections(OLD), B = sections(NEW);
const P = (t, o = {}) => new Paragraph({ bidirectional: true, alignment: o.align || AlignmentType.BOTH, spacing: { after: o.after ?? 50, line: o.line || 260, before: o.before || 0 }, heading: o.heading, pageBreakBefore: o.pb,
  children: [new TextRun({ text: t, rightToLeft: true, font: FONT, size: o.size || 19, bold: o.bold, color: o.color || '2B2118' })] });
const W = 15840, H = 12240, M = 720, TW = W - 2 * M, CW = Math.floor(TW / 2);
const border = { style: BorderStyle.SINGLE, size: 4, color: 'B9A27A' };
const cell = (paras, shade) => new TableCell({ width: { size: CW, type: WidthType.DXA }, borders: { top: border, bottom: border, left: border, right: border },
  shading: shade ? { fill: shade, type: ShadingType.CLEAR, color: 'auto' } : undefined, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: paras });
const wc = s => s.lines.join(' ').split(/\s+/).filter(Boolean).length;
const body = [];
// report
body.push(P('مقارنة بين النصّين: «أرصادٌ وأَطْوار» قبل المراجعة وبعدها بأسلوب «عزازيل»', { size: 36, bold: true, align: AlignmentType.CENTER, color: '6B4A1A', heading: HeadingLevel.HEADING_1, after: 200 }));
for (let l of fs.readFileSync(REP, 'utf8').split('\n')) {
  if (!l.trim()) continue;
  const h = l.match(/^(#+)\s*(.*)/);
  if (h) { body.push(P(h[2].replace(/\*\*/g, ''), { size: h[1].length === 1 ? 30 : 24, bold: true, color: '6B4A1A', before: 160, after: 80, heading: h[1].length <= 2 ? HeadingLevel.HEADING_2 : undefined })); continue; }
  l = l.replace(/^\s*[-*]\s+/, '• ').replace(/\*\*/g, '').replace(/`/g, '');
  body.push(P(l, { size: 22, line: 300, after: 80 }));
}
// side by side
body.push(P('النصّان جنبًا إلى جنب', { size: 32, bold: true, align: AlignmentType.CENTER, color: '6B4A1A', heading: HeadingLevel.HEADING_1, pb: true, after: 120 }));
body.push(P('العمود الأيمن: النصّ قبل المراجعة. العمود الأيسر: النصّ الجديد. والهوامش محذوفة من المقارنة، وتبقى في ملف الرواية.', { size: 20, align: AlignmentType.CENTER, after: 200 }));
const keysB = new Map(B.map(s => [s.key, s]));
const used = new Set();
const order = [];
for (const s of A) { order.push([s, keysB.get(s.key)]); used.add(s.key); }
for (const s of B) if (!used.has(s.key)) order.push([null, s]);
let tw = [0, 0];
for (const [a, b] of order) {
  const title = (b || a).title;
  const na = a ? wc(a) : 0, nb = b ? wc(b) : 0; tw[0] += na; tw[1] += nb;
  body.push(P(title + (a && b && a.title !== b.title ? '   (كان: ' + a.title + ')' : ''), { size: 26, bold: true, color: '6B4A1A', heading: HeadingLevel.HEADING_2, pb: true, after: 60 }));
  body.push(P('قبل: ' + na.toLocaleString('ar-EG') + ' كلمة — بعد: ' + nb.toLocaleString('ar-EG') + ' كلمة', { size: 18, color: '8A6A3A', after: 120 }));
  const pa = (a ? a.lines : ['—']).map(t => P(t)), pb = (b ? b.lines : ['—']).map(t => P(t));
  body.push(new Table({ width: { size: TW, type: WidthType.DXA }, columnWidths: [CW, CW], visuallyRightToLeft: true,
    rows: [new TableRow({ tableHeader: true, children: [cell([P('قبل', { bold: true, align: AlignmentType.CENTER })], 'E9D9B0'), cell([P('بعد', { bold: true, align: AlignmentType.CENTER })], 'E9D9B0')] }),
           new TableRow({ children: [cell(pa, 'F7F0E0'), cell(pb)] })] }));
}
body.splice(1, 0, P('مجموع الكلمات قبل: ' + tw[0].toLocaleString('ar-EG') + ' — وبعد: ' + tw[1].toLocaleString('ar-EG'), { size: 20, align: AlignmentType.CENTER, after: 200 }));
const doc = new Document({ fonts: [{ name: FONT, data: fs.readFileSync(S + 'fonts/Amiri-Regular.ttf'), characterSet: CharacterSet.ARABIC }, { name: FONT, data: fs.readFileSync(S + 'fonts/Amiri-Bold.ttf'), characterSet: CharacterSet.ARABIC }], styles: { default: { document: { run: { font: FONT, size: 19, rightToLeft: true }, paragraph: { bidirectional: true } } } },
  sections: [{ properties: { page: { size: { width: H, height: W, orientation: PageOrientation.LANDSCAPE }, margin: { top: M, bottom: M, left: M, right: M } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 18 })] })] }) },
    children: body }] });
Packer.toBuffer(doc).then(b => { fs.writeFileSync(OUT, b); console.log('written', OUT, (b.length / 1e6).toFixed(2), 'MB'); });
