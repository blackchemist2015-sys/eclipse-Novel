import re,difflib,sys
D='/tmp/claude-0/-home-user-eclipse-Novel/1e1a407f-2362-5ae4-8fd5-da30c08b60f1/scratchpad/'
def norm(s):
    s=re.sub(r'⟦fn:[a-z0-9_]+⟧','',s); s=re.sub(r'\[\d+\]','',s)
    s=re.sub(r'[ً-ْـ]','',s); return re.sub(r'[^\w]','',s)
ours=[l.split('|')[-1] if l.startswith(('#','@')) else l for l in open(D+'novel2.txt').read().split('\n') if l.strip()]
v5=[l.strip() for l in open(D+'v5/v5.txt').read().split('\n') if l.strip()]
start=[i for i,l in enumerate(v5) if l.startswith('فاتِحة')][1]
end=[i for i,l in enumerate(v5) if l.startswith('مُلحَق المؤلِّف')][-1]
v5b=v5[start:end]
On=[norm(l) for l in ours]; Oall=''.join(On)
out=open(D+'v5/new_in_v5.txt','w')
for i,l in enumerate(v5b):
    s=norm(l)
    if len(s)<5 or s in Oall: continue
    best=max(On,key=lambda a: difflib.SequenceMatcher(None,s,a,autojunk=False).quick_ratio())
    r=difflib.SequenceMatcher(None,s,best,autojunk=False).ratio()
    if r<0.9: out.write(f'{i+start}\t{r:.2f}\t{l}\n')
# also our lines missing in v5
Vall=''.join(norm(l) for l in v5b)
out2=open(D+'v5/missing_in_v5.txt','w')
for l in ours:
    s=norm(l)
    if len(s)>=8 and s not in Vall: out2.write(l+'\n')
