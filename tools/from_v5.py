# -*- coding: utf-8 -*-
"""Rebuild novel.txt markup from the user's edited v5 docx text, reusing our structure markers."""
import re, sys
D = '/tmp/claude-0/-home-user-eclipse-Novel/1e1a407f-2362-5ae4-8fd5-da30c08b60f1/scratchpad/'
old = [l for l in open(D + 'novel2.txt', encoding='utf-8').read().split('\n') if l.strip()]
v5 = [l.strip() for l in open(D + 'v5/v5.txt', encoding='utf-8').read().split('\n') if l.strip()]
start = [i for i, l in enumerate(v5) if l.startswith('فاتِحة')][1]
end = [i for i, l in enumerate(v5) if l.startswith('ملحق: الخطّ الزمنيّ المفصّل')][-1]
body = v5[start:end]
imgs = [l for l in old if l.startswith('@IMG') or l.startswith('@USERIMG')]
heads = {}
for l in old:
    if l.startswith('#'):
        f = l.split('|')
        heads.setdefault(f[0], []).append(f)
SUB_TEXTS = {f[1] for f in heads.get('#SUBHEAD', [])} | {'كيف تضيق اليد', 'أوّلُ ليلة', 'الكتابان', 'مَجلِسُ الحَرف', 'وبقيت الورقة'}
DATE_TEXTS = {f[1] for f in heads.get('#DATELINE', [])}
NOTE_TEXTS = {f[1] for f in heads.get('#NOTE', [])}
out = []
i = 0; k = 0
epi = [l for l in old if l.startswith('#EPIGRAPH')][0]
out.append(epi)
while i < len(body):
    l = body[i]
    if i == 0:
        out.append(f'#PROLOGUE|{l}|{body[1]}'); i += 2; continue
    if l == '✦': out.append('*'); i += 1; continue
    if re.match(r'^\d+__.*unknown\.png', l):
        img = imgs[k]; k += 1
        cap = body[i + 1] if i + 1 < len(body) else ''
        f = img.split('|')
        out.append(f'{f[0]}|{f[1]}|{cap}'); i += 2; continue
    if l.startswith('السِّفْرُ '):
        out.append(f'#PART|{l}|{body[i+1]}'); i += 2
        if i < len(body) and body[i] == '✦': i += 1
        continue
    if l == 'من دفتر سيف المصري':
        out.append(f'#INTRO|{l}|{body[i+1]}'); i += 2; continue
    m = re.match(r'^الفصل ([٠-٩]+)$', l)
    if m:
        out.append(f'#CH|{m.group(1)}|{body[i+1]}'); i += 2; continue
    if re.match(r'^— تمّ السفر .+ —$', l): out.append('#ENDPART|' + l); i += 1; continue
    if l == 'تمّت': out.append('#FIN|تمّت'); i += 1; continue
    if l == 'القاهرة — الأقصر': out.append('#SIGN|' + l); i += 1; continue
    if l.startswith('مُلحَق المؤلِّف'): out.append('#APPENDIX|' + l); i += 1; continue
    if l in SUB_TEXTS: out.append('#SUBHEAD|' + l); i += 1; continue
    if l in DATE_TEXTS: out.append('#DATELINE|' + l); i += 1; continue
    if l in NOTE_TEXTS: out.append('#NOTE|' + l); i += 1; continue
    out.append(l); i += 1
assert k == len(imgs), (k, len(imgs))
open(D + 'novel.txt', 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print('blocks', len(out), 'images', k, 'chapters', sum(1 for l in out if l.startswith('#CH')))
