# Revision brief 3 — «أرصادٌ وأَطْوار» (binding; overrides style/STYLE_GUIDE.md where they conflict)

Read `style/STYLE_GUIDE.md` (for the Azazel-derived register, satire rules, markup rules) and `style/azazel_report.md`, then apply THESE author decisions to your chunk in `rw3/in/<X>.txt`, writing `rw3/out/<X>.txt` (+ `rw3/out/<X>_fn.json` for footnote changes; new keys lowercase, prefixed `<x>3_`).

## 1. Saif is the AXIS, not the narrator (author: «لا تجعل سيف يروي بنفسه بل اجعله محور»)
- Convert every Fatimid passage written in Saif's first person (أنا/كنتُ/شيخي) into THIRD person about Saif (سيف/كان/شيخُه).
- The narrator is now **Yunus Karam, the محقِّق**, who reconstructs Saif's story from the leaves Saif left. He narrates in a literary third person, mostly invisible, surfacing only rarely in a dry, witty first-person aside («وأنا، المحقِّق، لا أملك إلا أن…»). This also fixes the old problem of an unidentified «أنا».
- Saif's own voice survives as **short quoted lines from his leaves**, used sparingly (max ~2 per chapter), e.g.: «وكتب سيفٌ في ورقته بعد ذلك بأربعين سنة: "…"». These quotes keep the confessional, questioning, Azazel-like tone. Never let a quote run longer than ~3 sentences.
- Keep the sourcing honesty, transposed: «تقول أوراقه إنّ الخصيّ العجوز حدّثه بهذا…», «ولم يشهد سيفٌ ذلك؛ نقله عن…».
- Keep the Azazel-derived qualities: classical cadence, sensory precision, interior doubt (now shown from outside or through the quotes), longer reflective paragraphs where earned, sharp chapter-ending hooks (last line of each chapter must remain a hook).
- `#CH` lines keep the «الورقة …: title» form (each chapter is reconstructed from one leaf). `#INTRO|من دفتر المحقِّق|…` labels stay.
- Chunk A only: rewrite «مقدّمة المحقِّق» accordingly: Yunus found Saif's leaves (in Saif's hand, written c. 440–441هـ on a copyist's roof in Fustat); they are fragmentary, so he RE-TELLS Saif's story in his own words, quoting Saif where Saif says it best, and marks what is document and what is his reconstruction. Remove the prologue's first-person self-introduction by Saif; the prologue (فاتحة: الدم) is third person.

## 2. Rayhana does NOT die (author: «لا تميت ريحانة»)
- Remove every hint that she died before Saif wrote (e.g. «ذاكرةٌ ثانية… فدفنتُها في الشتاء»). She is alive when he writes; she is there on the roof sometimes, grumbling at the lamp oil, correcting his memory («لا، كان يوم خميس»). The final rumours (Qena, his wife selling musk and clove) stay — that wife is Rayhana.

## 3. The basin eclipse is the real one of 7 April 1000 CE (author)
- Verified: Friday? (do not state the weekday) **29 Rabi' al-Akhir 390هـ = 7 April 1000 (Julian)**; partial over Cairo, about **half the sun's disc covered**, maximum around **late morning (≈11 a.m. local)**, the sun high (≈66°). Not at sunrise.
- In chunk B (ch. 5) the basin scene currently sits in «آخر ربيعٍ الأوّل سنة إحدى وتسعين» at sunrise. Re-date it to 29 Rabi' al-Akhir 390, late morning, about half the disc, a few days after Barjawan's murder (city tense, the young caliph riding at night). Keep the whole lesson (the slap, «في كلّ بيتِ رصدٍ أعمى…», counting digits, «الخطأ المكتوب»). If ch. 5's other events are set in 391, present the basin eclipse as an earlier lesson told in retrospect, or move the Venus night earlier — whichever keeps chronology clean. Update footnote `solar_month_end` / `basin` text only if needed; add `<x>3_ecl1000` footnote: partial solar eclipse of 7 April 1000 seen from Cairo, about half the disc, recorded among the eclipses of that era (do not claim Ibn Yunus recorded it unless the text already does — say "of the eclipses that could be observed from Cairo in Ibn Yunus's lifetime").
- Other chunks: if any later passage refers back to «كسوف سنة إحدى وتسعين» or the sunrise eclipse, fix it to 390 / the late-morning eclipse.

## 4. Judicial astrology is practised — but observation ranks higher (author: «اجعل ابن يونس والحاكم وسيف يعملون بأحكام النجوم ولكن الرصد العلمي أهمّ»)
- Historically Ibn Yunus also practised أحكام النجوم for the court. Show all three practising it: Ibn Yunus casts the caliph's طالع and chooses auspicious hours (اختيارات) because it is his job and it pays for the instruments; al-Hakim reads طوالع and believes in them passionately (the four روحانيّات fit here); Saif learns to cast a horoscope, earns his bread with it in Upper Egypt / Fustat, and is good at it.
- But the moral spine: the رصد decides. Ibn Yunus's rule, said once in his voice and echoed later: «الأحكامُ ظنٌّ نتكسّب به، والرصدُ يقينٌ نُحاسَب عليه» (or your own better wording). When a طالع and a رصد disagree, the رصد wins; the 394 scene (chunk B, already written: Abu al-Futuh) should show that Ibn Yunus too had cast a horoscope for that day, but wrote «وليس هو» because the observation/calculation said so.
- Weave 2–4 touches per chunk, light, never a lecture; one per chunk may be satirical (courtiers buying favourable horoscopes, the diwan filing a طالع as a receipt).

## 5. Keep everything else
All plot events, facts, dates (14 May 1338 BC; the 993 and 1004 eclipses; 2027), the grey donkey, the inkwell and plate, Dendera sign, al-Aziz, Hakim's mother, Holy Sepulchre, every `#`/`@` line, every `⟦fn:key⟧` marker. Length: within ±5% of your input chunk (the author wants a compact book — converting to third person should SAVE words; use the savings).

Finish by running a check script (markup lines, fn markers, no Saif-first-person narration outside quotes — scan for «شيخي» and «كنتُ» outside quotation marks, word count) and reply ≤120 words.
