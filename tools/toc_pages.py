# Find displayed page numbers of headings in a rendered PDF → toc.json for build_docx.js (TOC_JSON)
import sys, re, json, subprocess, unicodedata
novel, primer, pdf, out = sys.argv[1:5]
def norm(s):
    s = unicodedata.normalize('NFKC', s)
    s = re.sub(r'[ً-ْٰـ]', '', s)
    s = re.sub('[أإآ]', 'ا', s).replace('ى', 'ي').replace('ة', 'ه')
    return re.sub(r'[\s\W_\d٠-٩]', '', s)
entries = []  # (level, label, probe)
for l in open(novel).read().split('\n'):
    f = l.split('|')
    if l.startswith('#PROLOGUE'): entries.append((1, f[1], f[1]))
    elif l.startswith('#PART'): entries.append((1, f[1] + ': ' + f[2], f[2]))
    elif l.startswith('#INTRO'): entries.append((2 if 'دفتر' in f[1] else 1, f[1] + (' — ' + f[2] if 'دفتر' in f[1] else ''), f[1]))
    elif l.startswith('#CH'):
        t = f[2]; ci = t.find(': ')
        entries.append((2, t, t[ci + 2:] if ci > 0 else t))
    elif l.startswith('#APPENDIX'): entries.append((1, f[1], f[1]))
pt = [x.split('|')[1] for x in open(primer).read().split('\n') if x.startswith('#TITLE')]
for t in ['شخوصُ الرواية'] + pt + ['الخطُّ الزمنيّ للرواية', 'ملحق: الخطّ الزمنيّ المفصّل', 'ملحق: فهرس الرسوم']:
    entries.append((1, t, t))
n = int(re.search(r'Pages:\s+(\d+)', subprocess.run(['pdfinfo', pdf], capture_output=True, text=True).stdout).group(1))
pages = []
for i in range(1, n + 1):
    txt = subprocess.run(['pdftotext', '-f', str(i), '-l', str(i), '-layout', pdf, '-'], capture_output=True, text=True).stdout
    pages.append([norm(x) for x in txt.split('\n') if x.strip()])
# offset: displayed page 1 = page containing the prologue heading
res = []; cur = 0; offset = None
for lvl, label, probe in entries:
    p = norm(probe); found = None
    for i in range(cur, n):
        if any(p == ln or (len(p) > 6 and p in ln and len(ln) < len(p) + 12) for ln in pages[i]):
            found = i; break
    if found is None:
        res.append([lvl, label, None]); print('NOT FOUND', label); continue
    if offset is None: offset = found  # prologue page → displayed 1
    res.append([lvl, label, found - offset + 1]); cur = found
json.dump(res, open(out, 'w'), ensure_ascii=False, indent=0)
print('entries', len(res), 'missing', sum(1 for r in res if r[2] is None), 'last page', res[-1])
