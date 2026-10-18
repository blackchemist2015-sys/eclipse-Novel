// Build the publication-ready Word file from novel2.txt + footnotes.json + illustrations.
const fs = require('fs');
const path = require('path');
const d = require('docx');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, FootnoteReferenceRun, AlignmentType, HeadingLevel,
  PageBreak, Footer, Header, PageNumber, TableOfContents, Table, TableRow, TableCell, WidthType,
  BorderStyle, ShadingType, CharacterSet, SectionType, LineRuleType,
} = d;

const S = '/tmp/claude-0/-home-user-eclipse-Novel/1e1a407f-2362-5ae4-8fd5-da30c08b60f1/scratchpad/';
const OUT = process.argv[2];
let lines = fs.readFileSync(S + 'novel2.txt', 'utf8').split('\n').filter(l => l.trim()); if (process.env.LIMIT) lines = lines.slice(0, +process.env.LIMIT).concat(lines.filter(l => l.startsWith('@IMG') || l.startsWith('@USERIMG')).slice(5));
const FNTXT = Object.assign(JSON.parse(fs.readFileSync(S + 'footnotes.json', 'utf8')), JSON.parse(fs.readFileSync(S + 'primer_fn.json', 'utf8')));
const IMG = n => fs.readFileSync(fs.existsSync(S + 'art/jpg/' + n + '.jpg') ? S + 'art/jpg/' + n + '.jpg' : S + 'user/' + n + '.jpg');
const UDIM = JSON.parse(fs.readFileSync(S + 'user/dims.json', 'utf8'));
const FONT = 'Amiri';
const INK = '2B2118', GOLD = '8A6A3A';

// ---- page geometry: 6 x 9 in trade paperback
const PAGE_W = 8640, PAGE_H = 12960, M = { top: 1150, bottom: 1080, left: 1000, right: 1000, header: 560, footer: 520 };
const TEXT_W_PX = Math.floor((PAGE_W - M.left - M.right) / 15); // twips -> px (96 dpi)

// ---- footnotes
const footnotes = {}; const fnIndex = {}; let fnNext = 1;
function fnRef(key) {
  if (!fnIndex[key]) {
    fnIndex[key] = fnNext++;
    footnotes[fnIndex[key]] = { children: [new Paragraph({ bidirectional: true, alignment: AlignmentType.BOTH, spacing: { after: 40, line: 260 }, children: [new TextRun({ text: FNTXT[key], rightToLeft: true, font: FONT, size: 18 })] })] };
  }
  return new FootnoteReferenceRun(fnIndex[key]);
}

// ---- inline: footnote markers + **bold**
function runs(text, opt = {}) {
  const out = [];
  let bold = false;
  const parts = text.split(/(⟦fn:[a-z0-9_]+⟧|\*\*)/);
  for (const p of parts) {
    if (!p) continue;
    if (p === '**') { bold = !bold; continue; }
    const m = p.match(/^⟦fn:([a-z0-9_]+)⟧$/);
    if (m) { out.push(fnRef(m[1])); continue; }
    out.push(new TextRun({ text: p, rightToLeft: true, font: FONT, size: opt.size || 26, bold: opt.bold || bold, italics: opt.italics, color: opt.color || INK }));
  }
  return out;
}
const P = (text, o = {}) => new Paragraph({
  bidirectional: true,
  alignment: o.align || AlignmentType.BOTH,
  indent: o.noIndent ? undefined : { firstLine: o.firstLine !== undefined ? o.firstLine : 340 },
  spacing: { before: o.before || 0, after: o.after !== undefined ? o.after : 60, line: o.line || 336, lineRule: LineRuleType.AUTO },
  keepNext: o.keepNext, pageBreakBefore: o.pageBreak, heading: o.heading,
  children: runs(text, o),
});
const C = (text, o = {}) => P(text, Object.assign({ align: AlignmentType.CENTER, noIndent: true }, o));
const blank = (n = 1) => Array.from({ length: n }, () => new Paragraph({ children: [] }));
const star = () => C('✦', { size: 22, color: GOLD, before: 120, after: 120 });
function image(name, w, h, cap) {
  const out = [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 80 }, keepNext: true,
    children: [new ImageRun({ type: 'jpg', data: IMG(name), transformation: { width: w, height: h }, altText: { title: cap || name, description: cap || name, name } })] })];
  if (cap) out.push(C(cap, { size: 19, italics: true, color: '5A4A3A', after: 240, line: 260 }));
  return out;
}
const DIM = {
  p_birth: [1600, 1000], p_procession: [1600, 1000], p_hikma: [1600, 1000], p_supernova: [1600, 1000], p_amarna: [1600, 1000], p_muqattam: [1600, 1000],
  d_abjad: [1600, 900], d_umbra: [1600, 900], d_basin: [1600, 900], d_conj: [1600, 900], d_saros: [1600, 1000], d_pyramid: [1600, 1100], d_map: [1600, 1250],
  t_eras: [1600, 1000], t_fatimid: [1400, 2100],
};
function fit(name, maxW = TEXT_W_PX, maxH = 560) {
  const [w, h] = DIM[name]; let W = maxW, H = Math.round(h * W / w);
  if (H > maxH) { H = maxH; W = Math.round(w * H / h); }
  return [W, H];
}

// =============================================================== FRONT MATTER
const front = [];
// title page
front.push(...blank(6));
front.push(C('أرصادٌ وأَطْوار', { size: 76, bold: true, color: '6B4A1A', after: 120 }));
front.push(C('سِرُّ الحاكم — ثُغْرَةُ الكُسوف', { size: 36, after: 300 }));
front.push(C('رواية', { size: 30, color: GOLD, after: 1600 }));
front.push(C('مع رسومٍ توضيحيّة، وخطٍّ زمنيّ، وهوامشَ علميّة', { size: 22, italics: true, color: '5A4A3A' }));
// epigraph page
const epi = lines.find(l => l.startsWith('#EPIGRAPH')).split('|').slice(1);
front.push(new Paragraph({ children: [new PageBreak()] }));
front.push(...blank(9));
front.push(C(epi[0], { size: 34, italics: true, after: 40 }));
front.push(C(epi[1], { size: 34, italics: true, after: 200 }));
front.push(C(epi[2], { size: 22, color: GOLD }));
// contents
front.push(new Paragraph({ children: [new PageBreak()] }));
front.push(C('المحتويات', { size: 40, bold: true, after: 300, color: '6B4A1A' }));
front.push(new TableOfContents('المحتويات', { hyperlink: true, headingStyleRange: '1-2' }));
// =============================================================== BODY
const body = [];
let first = true, pendingBreak = false, inAppendix = false;
for (const l of lines) {
  if (l.startsWith('#EPIGRAPH')) continue;
  const f = l.split('|');
  switch (f[0]) {
    case '#PROLOGUE':
      body.push(C(f[1], { size: 44, bold: true, color: '6B4A1A', heading: HeadingLevel.HEADING_1, before: 1400, after: 120 }));
      body.push(C(f[2], { size: 22, italics: true, color: GOLD, after: 480 }));
      continue;
    case '#PART':
      body.push(new Paragraph({ children: [new PageBreak()] }));
      body.push(...blank(7));
      body.push(C(f[1], { size: 30, color: GOLD, after: 120 }));
      body.push(C(f[2], { size: 56, bold: true, color: '6B4A1A', heading: HeadingLevel.HEADING_1, after: 200 }));
      body.push(C('✦', { size: 28, color: GOLD }));
      pendingBreak = true;
      continue;
    case '#NOTE':
      body.push(C(f[1], { size: 22, italics: true, color: '5A4A3A', before: 400, after: 200, line: 300 }));
      continue;
    case '#INTRO':
      body.push(C(f[1], { size: 28, bold: true, color: '6B4A1A', pageBreak: true, before: 600, after: 40, heading: HeadingLevel.HEADING_2, keepNext: true }));
      body.push(C(f[2], { size: 22, italics: true, color: GOLD, after: 360, keepNext: true }));
      pendingBreak = false;
      continue;
    case '#CH':
      { const ci = f[2].indexOf(': '); const top = ci > 0 ? f[2].slice(0, ci) : 'الفصل ' + f[1]; f[2] = ci > 0 ? f[2].slice(ci + 2) : f[2];
      body.push(C(top, { size: 24, color: GOLD, pageBreak: true, before: 900, after: 40, keepNext: true })); }
      body.push(C(f[2], { size: 40, bold: true, color: '6B4A1A', heading: HeadingLevel.HEADING_2, after: 420, keepNext: true }));
      pendingBreak = false;
      continue;
    case '#DATELINE':
      body.push(C(f[1], { size: 22, italics: true, color: GOLD, before: 120, after: 240, keepNext: true }));
      continue;
    case '#SUBHEAD':
      body.push(C(f[1], { size: 28, bold: true, color: '6B4A1A', before: 240, after: 200, keepNext: true }));
      continue;
    case '#ENDPART':
      body.push(C(f[1], { size: 22, color: GOLD, before: 360 }));
      continue;
    case '#FIN':
      body.push(C(f[1], { size: 40, bold: true, color: '6B4A1A', before: 600, after: 60 }));
      continue;
    case '#SIGN':
      body.push(C(f[1], { size: 22, italics: true, color: GOLD, after: 200 }));
      continue;
    case '#APPENDIX':
      inAppendix = true;
      body.push(C(f[1], { size: 36, bold: true, color: '6B4A1A', pageBreak: true, heading: HeadingLevel.HEADING_1, before: 400, after: 300 }));
      continue;
    case '@USERIMG': {
      const [w0, h0] = UDIM[f[1]]; let W = TEXT_W_PX, H = Math.round(h0 * W / w0);
      if (H > 600) { H = 600; W = Math.round(w0 * H / h0); }
      body.push(...image(f[1], W, H, f[2]));
      continue;
    }
    case '@IMG': {
      const [w, h] = fit(f[1]);
      body.push(...image(f[1], w, h, f[2]));
      continue;
    }
  }
  if (l === '*') { body.push(star()); continue; }
  const isQuoteOnly = /^«[^»]{0,40}»$/.test(l);
  body.push(P(l, inAppendix ? { size: 23, line: 300, after: 90 } : {}));
}

// =============================================================== BACK MATTER: cast, primer, timeline
const back = [];
// cast
back.push(C('شخوصُ الرواية', { size: 40, bold: true, after: 240, pageBreak: true, color: '6B4A1A', heading: HeadingLevel.HEADING_1 }));
const CAST = [
  ['في زمن الفاطميّين (٣٧٥–٤١١هـ / ٩٨٥–١٠٢١م)', null],
  ['منصور بن سلامة، ثم «سيف»', 'غلامٌ من الفسطاط يحمل الجرار، وُلد في ليلة مولد الخليفة نفسِها وحمل اسمَه وعددَه (٣٨٦). تلميذُ ابن يونس، وبطلُ الرواية.'],
  ['الحاكم بأمر الله (المنصور)', 'الخليفة الفاطميّ السادس (تاريخيّ). بُويع في الحادية عشرة، واختفى على المقطّم ليلة ٢٧ شوّال ٤١١هـ.'],
  ['العزيز بالله', 'الخليفة الفاطميّ الخامس (تاريخيّ)، أبو الحاكم. رأى في منامه الشمسَ تُؤكل وطفلًا في ظلّها، فاستدعى ابن يونس وأمره بالزيج.'],
  ['أمُّ الحاكم', 'روميّةٌ صغيرةٌ غريبةٌ في القصر، لم تكفّ عن سؤالٍ واحد: «هل يكونُ ابني في الظلّ؟»'],
  ['أبو الحسن عليّ بن يونس', 'أعظمُ فلكيّي مصر في زمانه (تاريخيّ)، صاحبُ «الزيج الحاكميّ الكبير»، ومعلّمُ سيف.'],
  ['ستّ الملك', 'أختُ الحاكم الكبرى وعقلُ الدولة (تاريخيّة). ربّته صغيرًا، وأحبّت سيفًا ولم تقلها.'],
  ['سلامة بنت عبد الله', 'أمُّ منصور، أرملةُ بحّارٍ غرق، وصاحبةُ «شبكة الرائحة»: مئةٌ واثنتان وثمانون امرأة.'],
  ['رَيحانة بنت العطّار الشامي', 'بنتُ حارة الخرابة، ساعيةُ «شبكة الرائحة»، سليطةُ اللسان سريعةُ الضحك. أحبّت سيفًا منذ كانت في الثانية عشرة، ولم تقلها.'],
  ['خالد بن رفعت', 'صديقُ الطفولة على درج المِشرَع: «إنت المخّ وأنا الهدوم». صمد ثلاثة أيام.'],
  ['برجوان', 'الخصيّ الوصيّ على الخليفة الصغير (تاريخيّ)، قُتل سنة ٣٩٠هـ.'],
  ['رَيدان', 'صاحبُ المِظلّة (تاريخيّ)، الذي تقدّم من خلف برجوان على العشب.'],
  ['مُفلِح', 'من موالي دار ابن يونس؛ يحمل الآلة ويصبّ الماء ولا يتكلّم إلا إذا سُئل.'],
  ['رُشَيد بن الحسن', 'موظّفٌ ممتازٌ في ديوان الخبر، ضعيفُ البصر، اخترع اسم «بدر البدور».'],
  ['عليّ بن رضوان', 'فتًى في الثامنة عشرة رصد المستعرَ الأعظم سنة ١٠٠٦م (تاريخيّ)، وصار رئيسَ أطبّاء مصر.'],
  ['الحسن بن الهيثم', 'عالمُ الضوء البصريّ (تاريخيّ). قال للحاكم «لا» مرّتين: في حساب الكسوف، وفي حبس النيل، ثم تظاهر بالجنون عشر سنين.'],
  ['بَخوم', 'شيخٌ قبطيّ من دندرة يحرس المعبدَ المدفون كما حرسه أجدادُه.'],
  ['الخصيّ العجوز', 'رسولُ ستّ الملك، الذي يقف في كلّ منعطفٍ من حياة سيف.'],
  ['الروحانيّات الأربع', 'الزهرة (النحاس)، والمريخ الأحمر (الحديد)، وزحل الرصاصيّ، والمشتري الرماديّ: «طبائعُ» تتجسّد، لا آلهة.'],
  ['في زمن إخناتون (القرن الرابع عشر قبل الميلاد)', null],
  ['خاي', 'مُراقِبُ الساعات في بيت آتون؛ حسب الكسوف، ودلّ الملكَ على موضع المدينة، ودفن الجرّة.'],
  ['إخناتون', 'الملكُ «الذي كسر الآلهة» (تاريخيّ)، بانِي أخت-آتون.'],
  ['في زماننا (٢٠٢٦–٢٠٢٧م)', null],
  ['يونس كرم', 'باحثٌ في تاريخ العلوم في الأربعين، يسكن شارع المعزّ، يجد ورقةً لا ينبغي أن تكون موجودة. وهو راوي هذه الرواية. ومجموعُ حروف اسمه بحساب الجُمَّل ٣٨٦.'],
  ['«سموّه»', 'حاكمُ دولةٍ عربيّةٍ صغيرةٍ غنيّة، غيرُ مسمّى، يحبّ الفلك حبًّا حقيقيًّا، ويريد أن يقف في الظلّ كما وقف الحاكم.'],
  ['ضابطُ «الجهاز»', 'رجلٌ مهذّبٌ من جهةٍ سياديّة لا تُسمّى، يعرف ملفّ يونس أحسنَ ممّا يعرفه يونس، ويقدّم الشاي قبل الأسئلة.'],
  ['امرأةٌ في المطار', 'أختُ «سموّه» التي ربّته.'],
];
for (const [n, t] of CAST) {
  if (!t) { back.push(C(n, { size: 26, bold: true, color: GOLD, before: 200, after: 100 })); continue; }
  back.push(new Paragraph({ bidirectional: true, alignment: AlignmentType.BOTH, spacing: { after: 70, line: 300 }, indent: { hanging: 0 },
    children: [new TextRun({ text: n + ': ', bold: true, rightToLeft: true, font: FONT, size: 24, color: '6B4A1A' }), new TextRun({ text: t, rightToLeft: true, font: FONT, size: 24, color: INK })] }));
}
// primer: Fatimids and the planets
for (const l of fs.readFileSync(S + 'primer.txt', 'utf8').split('\n').filter(x => x.trim())) {
  const f = l.split('|');
  if (f[0] === '#TITLE') back.push(C(f[1], { size: 40, bold: true, after: 240, pageBreak: true, color: '6B4A1A', heading: HeadingLevel.HEADING_1 }));
  else if (f[0] === '#H') back.push(P(f[1], { size: 26, bold: true, color: GOLD, noIndent: true, before: 200, after: 80, keepNext: true }));
  else back.push(P(l, { size: 24 }));
}
// timeline images
back.push(C('الخطُّ الزمنيّ للرواية', { size: 40, bold: true, after: 200, pageBreak: true, color: '6B4A1A', heading: HeadingLevel.HEADING_1 }));
back.push(P('تجري هذه الرواية في ثلاثة أزمنةٍ يجمعها قرصٌ يُحجَب: مصرُ إخناتون في القرن الرابع عشر قبل الميلاد، وقاهرةُ الفاطميّين بين سنتي ٩٨٥ و١٠٢١م، وزمانُنا بين صيف ٢٠٢٦ وكسوف الثاني من أغسطس ٢٠٢٧. وفي الرسمين التاليين خريطةٌ للأزمنة الثلاثة، ثم تفصيلٌ لسنوات سيف بن سلامة والحاكم بأمر الله، وقد ميّزتُ فيهما الحدثَ التاريخيّ الموثَّق من الحدث الروائيّ المتخيَّل. ويليهما جدولٌ زمنيٌّ مفصّل.', { size: 24 }));
{ const [w, h] = fit('t_eras', TEXT_W_PX, 400); back.push(...image('t_eras', w, h, 'الأزمنة الثلاثة للرواية. يتّجه الزمن من اليمين إلى اليسار.')); }
back.push(new Paragraph({ children: [new PageBreak()] }));
{ const [w, h] = fit('t_fatimid', TEXT_W_PX, 640); back.push(...image('t_fatimid', w, h, null)); }

// =============================================================== APPENDIX: detailed timeline table
const TL = [
  ['السنة ١٢ من حكم إخناتون', 'نحو ١٣٤٢ ق.م', 'استقبالُ الجزية في أخت-آتون؛ رسائلُ الشمال تستغيث', 'تاريخيّ', 'الفصل ٢٤'],
  ['السنة ١٦ من حكم إخناتون', '١٤ مايو ١٣٣٨ ق.م', 'كسوفٌ كلّيّ فوق أخت-آتون: «ثلاثمئةٌ وثمانون عَدّة»', 'تاريخيّ بتفسيرٍ روائيّ', 'الفصلان ١٩، ٢٥'],
  ['بعد موت الملك', 'نحو ١٣٣٣ ق.م', 'خاي يدفن الجرّة في بني حسن ويكتب عليها ٣٨٦', 'روائيّ', 'الفصل ٢٦'],
  ['٣٥٨هـ', '٩٦٩م', 'الفتح الفاطميّ لمصر وتأسيس القاهرة', 'تاريخيّ', 'الفصل ١٦'],
  ['٢٣ ربيع الأوّل ٣٧٥هـ', '١٣ أغسطس ٩٨٥م', 'مولد الحاكم بأمر الله؛ ومولد منصور بن سلامة في الليلة نفسها', 'تاريخيّ / روائيّ', 'الفصل ١'],
  ['نحو ٣٨٠هـ', 'نحو ٩٩٠م', 'العزيز بالله يرى الكسوفَ في منامه ويخاف على ابنه ذي الخمس سنين؛ يستدعي ابن يونس ويأمره بالزيج', 'تاريخيّ (بدء الزيج) / روائيّ (المنام)', 'الفصل ٢'],
  ['٢٨ رمضان ٣٨٦هـ', '١٤ أكتوبر ٩٩٦م', 'موت العزيز ببلبيس، وبيعة الحاكم في الحادية عشرة', 'تاريخيّ', 'الفصل ١'],
  ['٣٨٩هـ', '٩٩٩م', 'ابن يونس يجد أنّ «منصور» = ٣٨٦؛ «فما عددُ اسمي؟»', 'روائيّ', 'الفصلان ١، ٢'],
  ['ربيع الآخر ٣٨٩هـ', 'فبراير ٩٩٩م', 'ابن يونس يلقى غلام الفسطاط ويسمّيه «سيفًا»؛ رصدُ الزهرة الأوّل', 'روائيّ', 'الفصل ٣'],
  ['٣٨٩هـ', '٩٩٩م', 'برجوان يعلم بأمر الغلام', 'روائيّ', 'الفصل ٤'],
  ['ربيع الآخر ٣٩٠هـ', 'مارس ١٠٠٠م', 'مقتل برجوان في البستان؛ أوّلُ ليلةٍ يخرج فيها الحاكم على حماره «القمر»، فيمضي إلى سلامة', 'تاريخيّ / روائيّ', 'الفصل ٤'],
  ['١١ جمادى الآخرة ٣٩٠هـ', '١٩ مايو ١٠٠٠م', 'قِران الزهرة وعطارد يرصده ابن يونس وسيف معًا', 'تاريخيّ بتفسيرٍ روائيّ', 'الفصل ٣'],
  ['٣٩١هـ', '١٠٠١م', 'سطح الرصد على المقطّم؛ روحانيّة الزهرة؛ الكسوف في الطَّست؛ ستّ الملك خلف المشربيّة؛ إحصاء كلّ من اسمه منصور', 'روائيّ', 'الفصلان ٥، ٦'],
  ['٣٩٢–٣٩٤هـ', '١٠٠٢–١٠٠٤م', 'سُهيل يُنذر سيفًا ثلاث مرّات، ثم يُقتل عند المقياس', 'روائيّ', 'الفصل ٧'],
  ['٣٩٥هـ', '١٠٠٥م', 'سِجِلّات قتل الكلاب ومنع الملوخيّة والسمك بلا قشر وخروج النساء ليلًا', 'تاريخيّ بتعليلٍ روائيّ', 'الفصول ٧–٩'],
  ['جمادى الآخرة ٣٩٥هـ', 'مارس ١٠٠٥م', 'افتتاح دار الحكمة؛ المشتري بين الرفوف', 'تاريخيّ / روائيّ', 'الفصل ١٠'],
  ['١٥ رجب – ٢٩ شوّال ٣٩٥هـ', 'صيف ١٠٠٥م', 'ليلة البستان؛ وشاية خالد؛ خزانة البنود وليلة المريخ؛ الهرب في النيل', 'روائيّ', 'الفصول ١١–١٤'],
  ['١٧ شعبان ٣٩٦هـ', '٣٠ أبريل ١٠٠٦م', 'المستعر الأعظم في العقرب، يرصده عليّ بن رضوان', 'تاريخيّ', 'الفصل ١٦'],
  ['٣٩٦–٣٩٧هـ', '١٠٠٦–١٠٠٧م', 'سراديب دندرة وكسوفا السقف: «العلامة» الأولى؛ بني حسن وشهادة مُراقِب الساعات', 'روائيّ', 'الفصول ١٧–١٩'],
  ['٣ شوّال ٣٩٩هـ', '٣١ مايو ١٠٠٩م', 'موت ابن يونس؛ «البابُ الثاني والثمانون» الذي لا وجود له', 'تاريخيّ / روائيّ', 'الفصل ٢٠'],
  ['ذو القعدة ٣٩٩هـ', 'يوليو ١٠٠٩م', 'مجلسُ الحَرف: الزيج يُقرأ على الحاكم؛ ظهور زحل في الصحراء', 'روائيّ', 'الفصل ٢٠'],
  ['٤٠٠هـ', '١٠٠٩م', 'الحاكم يأمر بهدم كنيسة القيامة في القدس («نار السبت»)؛ أمُّه: «هل صار ابني يصنع الظلّ؟»', 'تاريخيّ / روائيّ', 'الفصل ٢٠'],
  ['نحو ٤٠١هـ', '١٠١٠–١٠١١م', 'ثمن اليوم الرابع: خالد ورجلُ الأشمونين', 'روائيّ', 'الفصل ٢١'],
  ['المحرّم ٤٠٢هـ', 'أغسطس ١٠١١م', 'حجرة المأمون: الحساب يقع في ٢٩ صفر ١٤٤٩؛ العودة إلى القاهرة', 'روائيّ', 'الفصلان ٢٢، ٢٧'],
  ['شوّال ٤٠٨هـ', '١٠١٧م', 'حمزة بن عليّ يدعو إلى ألوهيّة الحاكم', 'تاريخيّ', 'الفصل ٢٩'],
  ['رمضان – شوّال ٤١١هـ', 'يناير – فبراير ١٠٢١م', 'ديوان الخبر يأخذ ريحانة رهينةً؛ سيف يسلّم «أرصاد وأطوار» ثم يُقبض عليه؛ لقاء القصر؛ والمواجهة على الجبل و«— لا —» على الرمل', 'روائيّ', 'الفصول ٢٩–٣١'],
  ['ليلة ٢٧ شوّال ٤١١هـ', '١٣ فبراير ١٠٢١م', 'اختفاء الحاكم على المقطّم؛ لم يُعثر إلا على حماره وثيابه، ولم يُعثر على الدواة', 'تاريخيّ بتفسيرٍ روائيّ', 'الفصلان ٣٢، ٣٣'],
  ['٤١١–٤١٣هـ', '١٠٢١–١٠٢٣م', 'ستّ الملك تدير الدولة باسم الظاهر ثم تموت', 'تاريخيّ', 'الفصل ٣٣'],
  ['—', '١٨٢١م', 'نزع دائرة بروج دندرة ونقلها إلى باريس', 'تاريخيّ', 'مدخل السفر الثالث'],
  ['—', '١٩١٢م', 'بعثةٌ ألمانيّة تجد الجرّة وتودعها صندوقًا', 'روائيّ', 'الفصل ٢٦'],
  ['—', 'يوليو ٢٠٢٦م', 'يونس كرم يجد الورقة في سور الأزبكيّة', 'روائيّ', 'مدخل السفر الأوّل'],
  ['—', 'سبتمبر ٢٠٢٦ – مايو ٢٠٢٧م', 'جدول المراسيم؛ دندرة؛ جرّة المنيا؛ شهادة الميلاد؛ «شاي الجهاز»؛ امرأة في المطار', 'روائيّ', 'المداخل والفصول ٣٤–٣٥'],
  ['٢٩ صفر ١٤٤٩هـ', '٢ أغسطس ٢٠٢٧م', 'الكسوف الكلّيّ فوق الأقصر؛ «سموّه» يدخل الظلّ ويموت؛ الجهاز يصل متأخّرًا', 'تاريخيّ (فلكيّ) بتفسيرٍ روائيّ', 'الفصول ٣٧–٣٩'],
];
const AD = '٠١٢٣٤٥٦٧٨٩';
const toN = t => +t.replace(/[٠-٩]/g, c => AD.indexOf(c));
const toA = n => String(n).replace(/\d/g, d => AD[d]);
TL.forEach(r => { if (/^الفص/.test(r[4])) r[4] = r[4].replace(/[٠-٩]+/g, m => { const n = toN(m); return toA(n >= 21 ? n + 1 : n); }); });
const ins = (afterPrefix, row) => { const i = TL.findIndex(r => r[2].startsWith(afterPrefix)); TL.splice(i + 1, 0, row); };
ins('العزيز بالله يرى', ['٢٩ جمادى الآخرة ٣٨٣هـ', '٢٠ أغسطس ٩٩٣م', 'كسوفٌ كلّيّ يمرّ قبالة ساحل مصر الشماليّ (٩٦٪ في القاهرة): العزيز يرصده مع ابن يونس والحاكمُ ابنُ ثمانٍ معه؛ ثم يعهد به إلى برجوان', 'تاريخيّ (الكسوف ورصد ابن يونس) / روائيّ', 'الفصل ٢']);
ins('سُهيل يُنذر', ['٢٩ ربيع الأوّل ٣٩٤هـ', '٢٤ يناير ١٠٠٤م', 'كسوفٌ مختلط (حلقيّ-كلّيّ) تغرب فيه الشمس على القاهرة مأكولة: الحاكم ينتظر «الباب» على المقطّم؛ «فإذا لم تنفتح لي السماء فسأُغلق الأرض»', 'تاريخيّ (الكسوف) / روائيّ', 'الفصل ٧']);
ins('ابن يونس يجد', ['٣٨٩هـ', '٩٩٩م', 'الحاكم يكتب إلى ابن الهيثم في البصرة يسأله حساب الكسوف، فيرفض: «خادمُ الضوء لا خادمُ الظلّ»؛ ويقبل ابنُ يونس', 'روائيّ بشخصٍ تاريخيّ', 'الفصل ٢']);
ins('الحاكم يأمر بهدم', ['٤٠٠هـ', '١٠١٠م', 'ابن الهيثم في مصر: لقاء الخندق، ورحلة الجنادل، وفشلُ مشروع النيل، ثم الجنون المصطنع حتى غياب الحاكم', 'تاريخيّ', 'الفصل ٢١']);
ins('ابن الهيثم في مصر', ['٤٠٠هـ', '١٠١٠م', 'سيف يلقى ابن الهيثم في الأشمونين: بدرُ البدور، ووجهُ القمر، والنيّةُ الخفيّة لحبس النيل', 'روائيّ بشخصٍ تاريخيّ', 'الفصل ٢١']);
ins('اختفاء الحاكم', ['شوّال ٤١١هـ', 'فبراير ١٠٢١م', 'إطلاق ريحانة؛ سيف يجد في قاع الدواة صفيحةَ الفضّة: «المنصورُ = ٣٨٦ = المنصور»، و«فاكتب»', 'روائيّ', 'الفصل ٣٤']);
ins('ستّ الملك تدير', ['٤١١هـ', '١٠٢١م', 'ابن الهيثم يُظهر عقله، ويسكن عند الأزهر، ويكتب «في كيفيّة الأرصاد»', 'تاريخيّ', 'الفصل ٣٤']);
TL.forEach(r => { if (r[2].startsWith('حجرة المأمون')) r[2] = 'حجرة المأمون: الحساب يقع في ٢٩ صفر ١٤٤٩؛ خسوف القمر و«العلامة»؛ العودة إلى القاهرة'; });
TL.forEach(r => { r[4] = r[4].replace(/الفصول/g, 'الأوراق').replace(/الفصلان/g, 'الورقتان').replace(/الفصل/g, 'الورقة').replace(/مدخل السفر/g, 'دفتر المحقِّق، السِّفر').replace(/المداخل/g, 'دفتر المحقِّق'); });
const colW = [1500, 1300, 2400, 900, 1000]; // twips (sum 7100? keep within text width)
const TW = PAGE_W - M.left - M.right; // 6640
const scale = TW / colW.reduce((a, b) => a + b, 0);
const CW = colW.map(w => Math.floor(w * scale));
const border = { style: BorderStyle.SINGLE, size: 4, color: 'B9A27A' };
const cell = (t, w, head, shade) => new TableCell({
  width: { size: w, type: WidthType.DXA }, borders: { top: border, bottom: border, left: border, right: border },
  shading: head ? { fill: 'E9D9B0', type: ShadingType.CLEAR, color: 'auto' } : (shade ? { fill: 'F7F0E0', type: ShadingType.CLEAR, color: 'auto' } : undefined),
  margins: { top: 50, bottom: 50, left: 80, right: 80 },
  children: [new Paragraph({ bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 0, line: 250 }, children: [new TextRun({ text: t, rightToLeft: true, font: FONT, size: head ? 19 : 18, bold: head, color: INK })] })],
});
const head = ['التاريخ الهجريّ / المصريّ', 'التاريخ الميلاديّ', 'الحدث', 'نوعه', 'موضعه في الرواية'];
const table = new Table({
  width: { size: TW, type: WidthType.DXA }, columnWidths: CW, visuallyRightToLeft: true,
  rows: [new TableRow({ tableHeader: true, children: head.map((t, i) => cell(t, CW[i], true)) })]
    .concat(TL.map((r, k) => new TableRow({ cantSplit: true, children: r.map((t, i) => cell(t, CW[i], false, k % 2)) }))),
});
const appendixTL = [
  C('ملحق: الخطّ الزمنيّ المفصّل', { size: 36, bold: true, color: '6B4A1A', pageBreak: true, heading: HeadingLevel.HEADING_1, before: 200, after: 240 }),
  table,
];
const appendixImages = [
  C('ملحق: فهرس الرسوم', { size: 36, bold: true, color: '6B4A1A', pageBreak: true, heading: HeadingLevel.HEADING_1, before: 200, after: 240 }),
  ...lines.filter(l => l.startsWith('@IMG') || l.startsWith('@USERIMG')).map((l, i) => P((i + 1).toLocaleString('ar-EG') + '. ' + l.split('|')[2], { size: 22, noIndent: true, after: 90, line: 290 })),
  P('جميع الرسوم أُعدّت خصّيصًا لهذه الطبعة. والمشاهدُ التاريخيّة فيها تصوّرٌ فنّيٌّ لا وثيقة، والرسومُ الفلكيّة والخرائطُ تقريبيّةٌ للتوضيح.', { size: 21, italics: true, noIndent: true, before: 200 }),
];

// =============================================================== ASSEMBLE
const font = fs.readFileSync(S + 'fonts/Amiri-Regular.ttf');
const fontB = fs.readFileSync(S + 'fonts/Amiri-Bold.ttf');
const pageProps = { page: { size: { width: PAGE_W, height: PAGE_H }, margin: M } };
const footer = new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 20, color: GOLD })] })] });
const header = new Header({ children: [new Paragraph({ bidirectional: true, alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'أرصادٌ وأَطْوار', rightToLeft: true, font: FONT, size: 18, italics: true, color: GOLD })] })] });

const doc = new Document({
  creator: 'أرصاد وأطوار', title: 'أرصادٌ وأَطْوار — سرّ الحاكم: ثغرة الكسوف', description: 'رواية',
  features: { updateFields: true },
  fonts: [{ name: FONT, data: font, characterSet: CharacterSet.ARABIC }, { name: FONT, data: fontB, characterSet: CharacterSet.ARABIC }],
  styles: {
    default: { document: { run: { font: FONT, size: 26, rightToLeft: true }, paragraph: { bidirectional: true } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 44, bold: true, color: '6B4A1A' }, paragraph: { bidirectional: true, alignment: AlignmentType.CENTER, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 36, bold: true, color: '6B4A1A' }, paragraph: { bidirectional: true, alignment: AlignmentType.CENTER, outlineLevel: 1 } },
    ],
  },
  footnotes,
  sections: [
    { properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: 0, bottom: 0, left: 0, right: 0, header: 0, footer: 0 } } },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 }, children: [new ImageRun({ type: 'jpg', data: IMG('cover'), transformation: { width: 576, height: 863 }, altText: { title: 'الغلاف', description: 'غلاف رواية أرصاد وأطوار', name: 'cover' } })] })] },
    { properties: Object.assign({ type: SectionType.NEXT_PAGE }, pageProps), children: front },
    { properties: Object.assign({ type: SectionType.NEXT_PAGE, page: { size: { width: PAGE_W, height: PAGE_H }, margin: M, pageNumbers: { start: 1 } } }), headers: { default: header }, footers: { default: footer }, children: body.concat(back, appendixTL, appendixImages) },
  ],
});
Packer.toBuffer(doc).then(buf => { fs.writeFileSync(OUT, buf); console.log('written', OUT, (buf.length / 1e6).toFixed(1) + ' MB', 'footnotes:', fnNext - 1); });
