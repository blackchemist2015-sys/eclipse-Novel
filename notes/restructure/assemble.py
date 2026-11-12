import re, json
W = '/home/user/novel-work/'
L = open(W + 'novel2_v25_prev.txt').read().split('\n')
rd = lambda f: open(W + 'v26/' + f).read().rstrip('\n').split('\n')
def idx(prefix, start=0):
    return next(i for i in range(start, len(L)) if L[i].startswith(prefix))

i_intro = idx('#INTRO|مقدّمة المحقِّق')
i_part1 = idx('#PART|السِّفْرُ الأوّل')
i_nb1 = idx('#INTRO|من دفتر المحقِّق|القاهرة — يوليو ٢٠٢٦')
i_ch1 = idx('#CH|١|')
i_end1 = idx('#ENDPART|— تمّ السفر الأول')
i_part2 = idx('#PART|السِّفْرُ الثاني')
i_nb2 = idx('#INTRO|من دفتر المحقِّق|القاهرة — سبتمبر ٢٠٢٦')
i_ch7 = idx('#CH|٧|')
i_end2 = idx('#ENDPART|— تمّ السفر الثاني')
i_part3 = idx('#PART|السِّفْرُ الثالث')
i_ch15 = idx('#CH|١٥|')
i_ch17 = idx('#CH|١٧|'); i_ch20 = idx('#CH|٢٠|')
i_ch23 = idx('#CH|٢٣|'); i_end3 = idx('#ENDPART|— تمّ السفر الثالث')
i_part4 = idx('#PART|السِّفْرُ الرابع')
i_ch24 = idx('#CH|٢٤|'); i_end4 = idx('#ENDPART|— تمّ السفر الرابع')
i_part5 = idx('#PART|السِّفْرُ الخامس')
i_ch28 = idx('#CH|٢٨|'); i_ch29 = idx('#CH|٢٩|')
i_end5 = idx('#ENDPART|— تمّ السفر الخامس')
i_part6 = idx('#PART|السِّفْرُ السادس')
i_ch35 = idx('#CH|٣٥|')

prologue = L[:i_intro]                      # epigraph + prologue
nb_july = L[i_nb1 + 1:i_ch1]                # finding the page
nb_sept = L[i_nb2 + 1:i_ch7]                # decrees table
p1 = L[i_ch1:i_end1]                        # ch1-6
p2 = L[i_ch7:i_end2]                        # ch7-14
p3_intro = L[i_part3 + 1:i_ch15]            # dendera notebook
p3a = L[i_ch15:i_ch17]; p3b = L[i_ch20:i_ch23]
p4_head = L[i_part4 + 1:i_ch24]             # note + minya notebook
p5_intro = L[i_part5 + 1:i_ch28]
p5 = L[i_ch29:i_end5]
p6 = L[i_part6 + 1:]                        # note + ch35.. + appendix

out = []
out += prologue
out += ['#PART|الجزء الأوّل|الورقة التي لا ينبغي أن توجد',
        '#INTRO|من دفتر المحقِّق: الورقة|القاهرة — يوليو ٢٠٢٦'] + nb_july
out += rd('open_fatimids.txt')
out += ['#INTRO|من دفتر المحقِّق: جدول المراسيم|القاهرة — سبتمبر ٢٠٢٦'] + nb_sept
out += rd('open_saif.txt')
out += ['#ENDPART|— انتهى الجزء الأوّل —']
out += ['#PART|الجزء الثاني|عَدَدُ الاسم'] + rd('bridge2.txt') + p1 + ['#ENDPART|— انتهى الجزء الثاني —']
out += ['#PART|الجزء الثالث|المطاردة'] + rd('bridge3.txt') + p2 + ['#ENDPART|— انتهى الجزء الثالث —']
out += ['#PART|الجزء الرابع|رِحلةُ الصَّعيد'] + rd('bridge4.txt') + p3_intro + p3a + rd('ch17_19.txt') + p3b + rd('ch23.txt') + ['#ENDPART|— انتهى الجزء الرابع —']
out += ['#PART|الجزء الخامس|ما قاله الجدار'] + p4_head + rd('ch24_27.txt') + ['#ENDPART|— انتهى الجزء الخامس —']
out += ['#PART|الجزء السادس|الثُّغْرَة'] + rd('bridge6.txt') + p5_intro + rd('ch28.txt') + p5 + ['#ENDPART|— انتهى الجزء السادس —']
out += ['#PART|الجزء السابع|كُسوفُ القَرن'] + rd('bridge7.txt') + p6
txt = '\n'.join(out)

# datelines for historical chapters (orientation)
DL = {'١': 'الفسطاط والقاهرة — ٣٧٥هـ / ٩٨٥م', '٢': 'القصر — ٣٨٠–٣٨٣هـ / ٩٩٠–٩٩٣م', '٣': 'الفسطاط — ٣٨٤–٣٨٩هـ / ٩٩٤–٩٩٩م',
      '٤': 'القاهرة — ٣٨٩–٣٩٠هـ / ٩٩٩–١٠٠٠م', '٥': 'جبل المقطّم — ٣٩٠–٣٩١هـ / ١٠٠٠–١٠٠١م', '٦': 'القصر — ٣٩١هـ / ١٠٠١م',
      '٧': 'القاهرة — ٣٩٢–٣٩٤هـ / ١٠٠٢–١٠٠٤م', '٨': 'الفسطاط — ٣٩٥هـ / ١٠٠٥م', '٩': 'ديوان الخبر — صفر ٣٩٥هـ / ديسمبر ١٠٠٤م',
      '١٠': 'القاهرة — جمادى الآخرة ٣٩٥هـ / مارس ١٠٠٥م', '١١': 'بستان القصر — رجب ٣٩٥هـ / أبريل ١٠٠٥م', '١٢': 'الفسطاط — صيف ٣٩٥هـ / ١٠٠٥م',
      '١٣': 'سجن خزانة البنود — صيف ٣٩٥هـ / ١٠٠٥م', '١٤': 'النيل — شوّال ٣٩٥هـ / صيف ١٠٠٥م', '١٥': 'قنا — ٣٩٥–٣٩٦هـ / ١٠٠٥–١٠٠٦م',
      '١٦': 'قنا والقاهرة — شعبان ٣٩٦هـ / مايو ١٠٠٦م', '٢٠': 'الفسطاط — شوّال ٣٩٩هـ / مايو ١٠٠٩م', '٢١': 'الأشمونين — ٤٠٠هـ / ١٠١٠م',
      '٢٢': 'طريق الشمال — ٤٠١–٤٠٢هـ / ١٠١١م', '٢٩': 'الفسطاط — ٤٠٣–٤٠٤هـ / ١٠١٣م', '٣٠': 'القاهرة — ٤٠٨هـ / ١٠١٧م',
      '٣١': 'القاهرة — شوّال ٤١١هـ / فبراير ١٠٢١م', '٣٢': 'القصر — شوّال ٤١١هـ / فبراير ١٠٢١م',
      '٣٣': 'جبل المقطّم — ليلة ٢٧ شوّال ٤١١هـ / ١٣ فبراير ١٠٢١م', '٣٤': 'الفسطاط — بعد شوّال ٤١١هـ / ١٠٢١م'}
o2 = []
lines = txt.split('\n')
for k, l in enumerate(lines):
    o2.append(l)
    if l.startswith('#CH|'):
        n = l.split('|')[1]
        if n in DL and not lines[k + 1].startswith('#DATELINE'):
            o2.append('#DATELINE|' + DL[n])
txt = '\n'.join(o2)

# wording: السفر -> الجزء in running text; light modernisation of a few archaic words
txt = txt.replace('وبين الأسفار صفحاتٌ من دفتري', 'وبين الأجزاء صفحاتٌ من دفتري')
txt = txt.replace('يومئذٍ', 'يومها').replace('فحسب', 'فقط')
open(W + 'novel2.txt', 'w').write(txt)
fn = re.findall(r'⟦fn:([a-z0-9_]+)⟧', txt)
dup = sorted({k for k in fn if fn.count(k) > 1})
F = json.load(open(W + 'footnotes.json')); F.update(json.load(open(W + 'primer_fn.json')))
print('lines', len(lines), 'dup', dup, 'undefined', [k for k in fn if k not in F])
old = re.findall(r'⟦fn:([a-z0-9_]+)⟧', '\n'.join(L))
print('dropped footnotes', sorted(set(old) - set(fn)))
print('words old/new', len('\n'.join(L).split()), len(txt.split()))
