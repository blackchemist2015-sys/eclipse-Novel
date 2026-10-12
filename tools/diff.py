import re,sys,difflib
D='/tmp/claude-0/-home-user-eclipse-Novel/1e1a407f-2362-5ae4-8fd5-da30c08b60f1/scratchpad/src/'
def norm(s):
    s=re.sub(r'[ً-ْـ]','',s)
    s=re.sub(r'[^\w]','',s)
    return s
def paras(f):
    L=open(D+f).read().split('\n')
    return [(i+1,l) for i,l in enumerate(L) if l.strip() and l.strip()!='✦']
A=paras('a.txt'); B=paras('b.txt')
endA=[i for i,(n,l) in enumerate(A) if 'مُلحَق: أوراقُ العمل' in l][0]
endB=[i for i,(n,l) in enumerate(B) if 'مُلحَق: أوراقُ العمل' in l][0]
A=A[:endA]; B=B[:endB]
An=[norm(l) for n,l in A]
Aall=''.join(An)
out=open(D+'newinB.txt','w')
for n,l in B:
    s=norm(l)
    if len(s)<6: continue
    if s in Aall: continue
    best=max((difflib.SequenceMatcher(None,s,a,autojunk=False).quick_ratio(),a) for a in An)
    r=difflib.SequenceMatcher(None,s,best[1],autojunk=False).ratio() if best[0]>0.5 else best[0]
    if r<0.75:
        out.write(f'{n}\t{r:.2f}\t{l}\n')
