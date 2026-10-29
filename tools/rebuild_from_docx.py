# Rebuild markup text (novel2 format) from an author-edited docx rendered by pandoc (plain), using
# reference markup versions to recover structure lines and footnote keys.
import re, json, sys, difflib
src_plain, refs, fnrefs, out_txt, out_fn = sys.argv[1], sys.argv[2].split(','), sys.argv[3].split(','), sys.argv[4], sys.argv[5]
strip = lambda s: re.sub(r'\s+', ' ', re.sub(r'⟦fn:[a-z0-9_]+⟧', '', s)).strip()
lines = [l.strip() for l in open(src_plain).read().split('\n')]
lines = [l for l in lines if l]
# footnotes section: lines starting with [n]
fn_start = next(i for i, l in enumerate(lines) if re.match(r'^\[1\]\s', l))
body_all = lines[:fn_start]
fntext = {}
cur = None
for l in lines[fn_start:]:
    m = re.match(r'^\[(\d+)\]\s*(.*)$', l)
    if m: cur = int(m.group(1)); fntext[cur] = m.group(2)
    elif cur and not l.startswith('['): fntext[cur] += ' ' + l
# reference footnote texts
FN = {}
for f in fnrefs: FN.update(json.load(open(f)))
fn_by_text = {strip(v): k for k, v in FN.items()}
# reference structure lines
H = {}   # rendered tuple -> markup line
P = {}   # stripped paragraph -> markup line
for r in refs:
    for l in open(r).read().split('\n'):
        if not l.strip(): continue
        f = l.split('|')
        if l.startswith('#CH'):
            t = f[2]; ci = t.find(': ')
            seq = (t[:ci], t[ci + 2:]) if ci > 0 else ('الفصل ' + f[1], t)
            H.setdefault(seq, l)
        elif l.startswith(('#PART',)): H.setdefault((f[1], f[2]), l)
        elif l.startswith(('#INTRO', '#PROLOGUE')): H.setdefault((f[1], f[2]), l)
        elif l.startswith(('#SUBHEAD', '#DATELINE', '#NOTE', '#ENDPART', '#FIN', '#SIGN', '#APPENDIX')): H.setdefault((f[1],), l)
        elif l.startswith('#VERSE'): H.setdefault((strip('|'.join(f[1:])),), l)
        elif l.startswith('@'): H.setdefault(('[' + f[2] + ']', f[2]), l)
        elif l.startswith('#EPIGRAPH'): continue
        else: P.setdefault(strip(l), l)
# body starts at prologue title
start = next(i for i, l in enumerate(body_all) if l.startswith('فاتِحة: الدَّم') and i > 40)
body = body_all[start:]
end = next(i for i, l in enumerate(body) if l == 'شخوصُ الرواية')
body = body[:end]
out = []; i = 0; unmatched_fn = {}; newfn = {}
pkeys = list(P.keys())
def key_for(n):
    t = strip(fntext.get(n, ''))
    if not t: return None
    if t in fn_by_text: return fn_by_text[t]
    best = difflib.get_close_matches(t, list(fn_by_text.keys()), n=1, cutoff=0.6)
    if best:
        k = fn_by_text[best[0]]; newfn[k] = fntext[n]; return k
    k = 'u9_%d' % n; newfn[k] = fntext[n]; return k
while i < len(body):
    l = body[i]
    matched = False
    for ln in (3, 2, 1):
        seq = tuple(body[i:i + ln])
        if seq in H:
            hl = H[seq]
            if hl.startswith('#PART') and i + ln < len(body) and body[i + ln] == '✦': ln += 1
            out.append(hl); i += ln; matched = True; break
    if matched: continue
    if l == '✦': out.append('*'); i += 1; continue
    # paragraph with [n] refs
    plain = re.sub(r'\[(\d+)\]', '', l).strip()
    refs_n = [int(x) for x in re.findall(r'\[(\d+)\]', l)]
    sp = strip(plain)
    if sp in P and not refs_n:
        out.append(P[sp]); i += 1; continue
    # rebuild with markers at [n] positions
    txt = re.sub(r'\[(\d+)\]', lambda m: (lambda k: '⟦fn:%s⟧' % k if k else '')(key_for(int(m.group(1)))), l)
    out.append(txt); i += 1
open(out_txt, 'w').write('\n'.join(out) + '\n')
FN.update(newfn)
json.dump(FN, open(out_fn, 'w'), ensure_ascii=False, indent=1)
print('lines', len(out), 'changed/new footnotes', len(newfn), [k for k in newfn][:20])
