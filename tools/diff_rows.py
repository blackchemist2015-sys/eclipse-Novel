# Build paragraph-aligned, word-level diff rows between two markup texts → JSON for build_compare_red.js
import sys, re, json, difflib
OLD, NEW, OUT = sys.argv[1:4]
def clean(l):
    l = re.sub(r'⟦fn:[a-z0-9_]+⟧', '', l)
    f = l.split('|')
    if l.startswith('#EPIGRAPH'): return ' '.join(f[1:])
    if l.startswith('#'): return '【' + ' — '.join(x for x in f[1:] if x) + '】'
    if l.startswith('@'): return '[صورة: ' + (f[2] if len(f) > 2 else f[1]) + ']'
    return l.strip()
def sections(file):
    out = []; cur = {'key': 'front', 'title': 'الافتتاح', 'paras': []}
    for l in open(file).read().split('\n'):
        if not l.strip(): continue
        f = l.split('|')
        if f[0] in ('#CH', '#PART', '#INTRO', '#APPENDIX', '#PROLOGUE'):
            out.append(cur)
            key = 'CH' + f[1] if f[0] == '#CH' else ('IN' + f[2] if f[0] == '#INTRO' else ('PA' + f[1] if f[0] == '#PART' else f[0]))
            cur = {'key': key, 'title': ' — '.join(x for x in f[1:] if x), 'paras': []}; continue
        cur['paras'].append(clean(l))
    out.append(cur); return [s for s in out if s['paras'] or s['key'] != 'front']
def wdiff(a, b):
    wa, wb = a.split(' '), b.split(' ')
    sm = difflib.SequenceMatcher(None, wa, wb, autojunk=False)
    sa, sb = [], []
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == 'equal':
            sa.append([' '.join(wa[i1:i2]), 0]); sb.append([' '.join(wb[j1:j2]), 0])
        else:
            if i2 > i1: sa.append([' '.join(wa[i1:i2]), 1])
            if j2 > j1: sb.append([' '.join(wb[j1:j2]), 1])
    return sa, sb
def rows(A, B):
    res = []
    sm = difflib.SequenceMatcher(None, A, B, autojunk=False)
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == 'equal':
            for k in range(i2 - i1): res.append({'o': [[A[i1 + k], 0]], 'n': [[B[j1 + k], 0]], 'c': 0})
            continue
        olds, news = A[i1:i2], B[j1:j2]
        # greedy in-order pairing by similarity
        j = 0
        for o in olds:
            best, bk = 0, None
            for k in range(j, min(len(news), j + 6)):
                r = difflib.SequenceMatcher(None, o, news[k]).ratio()
                if r > best: best, bk = r, k
            if bk is not None and best >= 0.35:
                for k in range(j, bk): res.append({'o': [], 'n': [[news[k], 1]], 'c': 1})
                sa, sb = wdiff(o, news[bk]); res.append({'o': sa, 'n': sb, 'c': 1}); j = bk + 1
            else:
                res.append({'o': [[o, 1]], 'n': [], 'c': 1})
        for k in range(j, len(news)): res.append({'o': [], 'n': [[news[k], 1]], 'c': 1})
    return res
A, B = sections(OLD), sections(NEW)
bk = {s['key']: s for s in B}; used = set(); out = []
for s in A:
    t = bk.get(s['key']); used.add(s['key'])
    out.append({'title': (t or s)['title'], 'rows': rows(s['paras'], t['paras'] if t else []),
                'wo': len(' '.join(s['paras']).split()), 'wn': len(' '.join(t['paras']).split()) if t else 0})
for s in B:
    if s['key'] not in used: out.append({'title': s['title'], 'rows': rows([], s['paras']), 'wo': 0, 'wn': len(' '.join(s['paras']).split())})
json.dump(out, open(OUT, 'w'), ensure_ascii=False)
print('sections', len(out), 'changed rows', sum(r['c'] for s in out for r in s['rows']))
