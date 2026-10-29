// Side-by-side comparison with word-level differences in red. usage: node build_compare_red.js rows.json report.md out.docx
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ShadingType, PageOrientation, HeadingLevel, Footer, PageNumber, CharacterSet } = require('docx');
const [,, ROWS, REP, OUT] = process.argv;
const S = __dirname + '/../';
const FONT = 'Amiri', RED = 'C00000';
const P = (t, o = {}) => new Paragraph({ bidirectional: true, alignment: o.align || AlignmentType.BOTH, spacing: { after: o.after ?? 40, line: o.line || 260, before: o.before || 0 }, heading: o.heading, pageBreakBefore: o.pb,
  children: [new TextRun({ text: t, rightToLeft: true, font: FONT, size: o.size || 19, bold: o.bold, color: o.color || '2B2118' })] });
const segP = (segs, side) => new Paragraph({ bidirectional: true, alignment: AlignmentType.BOTH, spacing: { after: 30, line: 260 },
  children: segs.flatMap((s, i) => [new TextRun({ text: (i ? ' ' : '') + s[0], rightToLeft: true, font: FONT, size: 19,
    color: s[1] ? RED : '2B2118', bold: !!s[1] && side === 'n', strike: !!s[1] && side === 'o' })]) });
const W = 15840, H = 12240, M = 720, TW = W - 2 * M, CW = Math.floor(TW / 2);
const border = { style: BorderStyle.SINGLE, size: 2, color: 'D8C9A8' };
const cell = (paras, shade) => new TableCell({ width: { size: CW, type: WidthType.DXA }, borders: { top: border, bottom: border, left: border, right: border },
  shading: shade ? { fill: shade, type: ShadingType.CLEAR, color: 'auto' } : undefined, margins: { top: 40, bottom: 40, left: 100, right: 100 }, children: paras.length ? paras : [new Paragraph({ children: [] })] });
const data = JSON.parse(fs.readFileSync(ROWS, 'utf8'));
const body = [];
body.push(P('مقارنة بين النصّين — الفروق باللون الأحمر', { size: 36, bold: true, align: AlignmentType.CENTER, color: '6B4A1A', heading: HeadingLevel.HEADING_1, after: 120 }));
const tot = data.reduce((a, s) => [a[0] + s.wo, a[1] + s.wn], [0, 0]);
const nch = data.reduce((a, s) => a + s.rows.filter(r => r.c).length, 0);
body.push(P('العمود الأيمن: قبل — والكلمات المحذوفة أو المغيَّرة فيه حمراءُ مشطوبة. العمود الأيسر: بعد — والكلمات الجديدة أو المغيَّرة فيه حمراءُ بالخطّ العريض. الفقرات التي لم تتغيّر بلونها العاديّ.', { size: 20, align: AlignmentType.CENTER, after: 80 }));
body.push(P('مجموع الكلمات قبل: ' + tot[0].toLocaleString('ar-EG') + ' — وبعد: ' + tot[1].toLocaleString('ar-EG') + ' — والفقرات المتغيّرة: ' + nch.toLocaleString('ar-EG'), { size: 20, align: AlignmentType.CENTER, after: 200 }));
for (let l of fs.readFileSync(REP, 'utf8').split('\n')) {
  if (!l.trim()) continue;
  const h = l.match(/^(#+)\s*(.*)/);
  if (h) { body.push(P(h[2].replace(/\*\*/g, ''), { size: 24, bold: true, color: '6B4A1A', before: 120, after: 60 })); continue; }
  body.push(P(l.replace(/^\s*[-*]\s+/, '• ').replace(/\*\*/g, ''), { size: 21, line: 300, after: 60 }));
}
for (const s of data) {
  const changed = s.rows.filter(r => r.c).length;
  body.push(P(s.title, { size: 26, bold: true, color: '6B4A1A', heading: HeadingLevel.HEADING_2, pb: true, after: 40 }));
  body.push(P('قبل: ' + s.wo.toLocaleString('ar-EG') + ' كلمة — بعد: ' + s.wn.toLocaleString('ar-EG') + ' كلمة — فقرات متغيّرة: ' + changed.toLocaleString('ar-EG'), { size: 18, color: '8A6A3A', after: 100 }));
  const rows = [new TableRow({ tableHeader: true, children: [cell([P('قبل', { bold: true, align: AlignmentType.CENTER })], 'E9D9B0'), cell([P('بعد', { bold: true, align: AlignmentType.CENTER })], 'E9D9B0')] })];
  for (const r of s.rows) rows.push(new TableRow({ children: [cell(r.o.length ? [segP(r.o, 'o')] : [], r.c ? 'FBF3F3' : undefined), cell(r.n.length ? [segP(r.n, 'n')] : [], r.c ? 'FBF3F3' : undefined)] }));
  body.push(new Table({ width: { size: TW, type: WidthType.DXA }, columnWidths: [CW, CW], visuallyRightToLeft: true, rows }));
}
const doc = new Document({ fonts: [{ name: FONT, data: fs.readFileSync(S + 'fonts/Amiri-Regular.ttf'), characterSet: CharacterSet.ARABIC }, { name: FONT, data: fs.readFileSync(S + 'fonts/Amiri-Bold.ttf'), characterSet: CharacterSet.ARABIC }],
  styles: { default: { document: { run: { font: FONT, size: 19, rightToLeft: true }, paragraph: { bidirectional: true } } } },
  sections: [{ properties: { page: { size: { width: H, height: W, orientation: PageOrientation.LANDSCAPE }, margin: { top: M, bottom: M, left: M, right: M } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 18 })] })] }) }, children: body }] });
Packer.toBuffer(doc).then(b => { fs.writeFileSync(OUT, b); console.log('written', OUT, (b.length / 1e6).toFixed(2), 'MB'); });
