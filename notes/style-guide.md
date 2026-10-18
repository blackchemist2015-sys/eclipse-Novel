# STYLE GUIDE: rewriting «أرصادٌ وأَطْوار» as a found manuscript, using Azazel's techniques

For the 7 editors. Read the whole guide before you open your chunk. Every instruction here is binding unless it is marked **(lead may override)**. The Arabic examples in §12 were written for this guide. None of them comes from Ziedan, and none of your text may either.

Source of truth: `novel2.txt` (current text) and `footnotes.json` (73 footnotes, one per `⟦fn:key⟧` marker). Ignore `rw/footnotes_current.json` and `rw/BIBLE.md`. Both are out of date; one example is that the Akhenaten date is now **14 May 1338 BC**, not 3 March.

---

## 0. What we are doing, in one paragraph

The novel becomes **a found manuscript edited by Yunus Karam**. The Fatimid story is now **Saif ibn Salama's own account**, written in the first person (أنا) by an old man around 440 AH on the roof of a copyist's shop in Fustat. He numbered his pages as «أوراق». Yunus adds a new preface, keeps his diary entries between the parts (now headed «من دفتر المحقِّق»), voices the footnotes, and narrates the modern ending (ch. 35–40) himself in the first person. Saif's account is confessional and full of questions. Its prose has a classical cadence, it is sensual but restrained, and the narrator is a man of knowledge who doubts himself. The author's intelligent, Egyptian, dry satire stays and gets sharper. **The plot does not change. The narrative instance does.**

## 1. Non-negotiables (check them before you hand in)

1. **Every plot event, fact, date, name, and scene stays.** Scenes Saif did not witness are not cut. They are re-sourced (see §4.2).
2. Keep these items exactly as fixed by the previous revision:
   - Rayhana's whole arc: age 12 in the shop, «يا ابنَ النجوم», carrying messages, the night on the roof with the Pleiades and «سبعة», the musk-and-clove bottle on the river night, its opening in the Dendera crypt, the eleven suitors she refused, her arrest, «امرأتان», the ledger line «بزيادة», and «بحبّك. ومفيش بعدها "لا"».
   - **The inkwell and its silver plate**: given on the mountain, «أثقل ممّا ينبغي», the false bottom found in ch. 34, the three engraved lines, and the Dendera disc.
   - **The Dendera sign**: the woman holding a monkey by its tail, the two discs facing each other, the displaced Cancer, Saif's carved graffito, and the reuse of the sign on the plate and in the last page.
   - **Al-Aziz's dream** and his night summons of Ibn Yunus (ch. 2), including the five-year-old playing with his hand's shadow.
   - **All of Hakim's mother's scenes**: ch. 2, ch. 4 («في كُمّك دم»), ch. 21 («هل صار ابني يصنع الظلّ؟»), ch. 33.
   - **The Holy Sepulchre demolition** (ch. 21): the diwan report, Ibn Abdun, the weeping Copt.
   - **The security-service thread** (ch. 35–40): the London offers, the car, the washed cup, the tea, the number with no name, the drones, the statement.
   - **The grey donkey القمر**. Its name is explained once, in the prologue/ch. 4. Everywhere else it is just «حماره الرماديّ».
   - **14 May 1338 BC** and the number 380 counts. The 2027 times, 383 seconds, and 6 min 22 s also stay.
   - **Every chapter-ending hook** (§9).
3. **Markup.** Every `#` line and every `@IMG`/`@USERIMG` line stays exactly as it is, apart from the changes listed in §3. Every `⟦fn:key⟧` marker stays. If you rewrite the sentence that carries a marker, re-attach the same marker to the same term. One paragraph per line; `*` alone on a line is a scene break.
4. **Length.** Your chunk must end up within ±10% of its current word count, with preface material counted on top for Editor A only (§2). Converting to first person adds words («حدّثني فلان…»). Pay for them by cutting the repeated formulas listed in §6.6.
5. **No copying of Ziedan.** No sentences, images, names, or set pieces from him (see §11).
6. **Satire is intelligent, never slapstick, and never aimed at religion, any faith community, scripture, prophets, or rites.** The targets are power, bureaucracy, flattery, astrologers, pomposity, and modern officialdom (§7).

## 2. Assignments (lead may override)

| Editor | Chunk | Approx. words now | Notes |
|---|---|---|---|
| A | NEW preface + Prologue + Part 1 diary + ch. 1–4 | 4,840 (+500–650 preface) | Sets Saif's voice. Writes the prologue's self-introduction. |
| B | ch. 5–10 (includes Part 2 diary) | 5,150 | |
| C | ch. 11–17 (includes Part 3 diary) | 5,490 | Garden scene, Khalid's betrayal, prison, river, Dendera. |
| D | ch. 18–21 | 4,970 | Ch. 19 has Yunus datelines inside Saif's leaf. |
| E | ch. 22–23 + Part 4 (#NOTE, diary, ch. 24–27) + Part 5 diary + ch. 28–31 | 5,110 | Khay's scroll; ch. 27 editorial postscript. |
| F | ch. 32–34 | 4,790 | Climax; inkwell reveal; Saif's last leaf and the editor's postscript. |
| G | Part 6 #NOTE + ch. 35–40 + Appendix | 5,390 | Yunus's own first-person «أوراق المحقِّق». |

Output **(lead may override paths)**: write your text to `rw2/out/<X>.txt`. Write footnote changes to `rw2/out/<X>_fn.json` as `{key: "full new Arabic text"}`. Reusing an existing key overrides its text; a new key must be prefixed `<x>_` (for example `a_rajiuh`).

## 3. Markup changes (exact)

### 3.1 Chapter headings
Format: `#CH|n|الورقة <ordinal>: <old title>`. Only the third field changes. Use exactly these lines:

```
#CH|١|الورقة الأولى: ليلةُ المولِدَين
#CH|٢|الورقة الثانية: الزِّيجُ والعَدَد
#CH|٣|الورقة الثالثة: غُلامُ الفُسطاط
#CH|٤|الورقة الرابعة: برجوان، والحمارُ الذي اسمُه القَمَر
#CH|٥|الورقة الخامسة: حَلْقَةُ المُقَطَّم
#CH|٦|الورقة السادسة: سِتُّ المُلك
#CH|٧|الورقة السابعة: سِجِلُّ الكِلاب
#CH|٨|الورقة الثامنة: شِفْرَةُ الخُضْرَة
#CH|٩|الورقة التاسعة: بَدْرُ البُدور
#CH|١٠|الورقة العاشرة: دارُ الحِكْمة
#CH|١١|الورقة الحادية عشرة: ليلةُ البُستان
#CH|١٢|الورقة الثانية عشرة: الوِشاية
#CH|١٣|الورقة الثالثة عشرة: خِزانةُ البُنود — ليلةُ المريخ
#CH|١٤|الورقة الرابعة عشرة: ليلةُ النَّهر
#CH|١٥|الورقة الخامسة عشرة: قِبْلي
#CH|١٦|الورقة السادسة عشرة: الكَوكبُ الدُّرِّيّ
#CH|١٧|الورقة السابعة عشرة: سَقْفُ دندرة
#CH|١٨|الورقة الثامنة عشرة: بني حسن
#CH|١٩|الورقة التاسعة عشرة: المدينةُ التي بُنِيَت لِظِلّ
#CH|٢٠|الورقة العشرون: السُّهَا، والبابُ الثاني والثمانون
#CH|٢١|الورقة الحادية والعشرون: ابنُ الهيثم، أو الرجلُ الذي قال لا مرّتين
#CH|٢٢|الورقة الثانية والعشرون: ثمنُ اليوم الرابع
#CH|٢٣|الورقة الثالثة والعشرون: حُجرةُ المأمون
#CH|٢٤|الورقة الرابعة والعشرون: لَوْحُ الحُدود
#CH|٢٥|الورقة الخامسة والعشرون: السَّنةُ الثانيةَ عشرة
#CH|٢٦|الورقة السادسة والعشرون: اليومُ الذي ابتلع فيه الثُّعبانُ الشمسَ كُلَّها
#CH|٢٧|الورقة السابعة والعشرون: الجَرّة
#CH|٢٨|الورقة الثامنة والعشرون: العَودة
#CH|٢٩|الورقة التاسعة والعشرون: الأربعة
#CH|٣٠|الورقة الثلاثون: مَن يقولُ لا
#CH|٣١|الورقة الحادية والثلاثون: الاختيار
#CH|٣٢|الورقة الثانية والثلاثون: وَجهٌ لِوَجه
#CH|٣٣|الورقة الثالثة والثلاثون: لَيْلةُ المُقَطَّم
#CH|٣٤|الورقة الرابعة والثلاثون: الدَّمُ الجافّ
#CH|٣٥|الورقة الخامسة والثلاثون: الرجلُ الذي يَشتري المخطوطات
#CH|٣٦|الورقة السادسة والثلاثون: شهادةُ الميلاد
#CH|٣٧|الورقة السابعة والثلاثون: امرأةٌ في مطارٍ
#CH|٣٨|الورقة الثامنة والثلاثون: التاسعُ والعشرون من صَفَر
#CH|٣٩|الورقة التاسعة والثلاثون: ثلاثُمئةٍ وثلاثٌ وثمانون ثانية
#CH|٤٠|الورقة الأربعون: نُباح
```

Chapters 24–27 are Saif's leaves that carry Khay's text, so they are numbered as Saif's. Chapters 35–40 are Yunus's leaves. He deliberately continued Saif's numbering, and the preface explains why.

**Build note for the lead:** `tools/build_docx.js` prints `'الفصل ' + f[1]` above the title. Patch it so that, when `f[2]` contains «: », the part before the colon («الورقة الأولى») goes on the small top line and the part after it becomes the big title. Otherwise the book will read «الفصل ١ / الورقة الأولى: …».

### 3.2 Diary headers
`#INTRO|من دفتر يونس كرم|<date>` becomes `#INTRO|من دفتر المحقِّق|<date>`. The date field does not change. This applies to all 5 diary entries.

### 3.3 New preface (Editor A)
Insert immediately after the `#EPIGRAPH` line and before `#PROLOGUE`:
`#INTRO|مقدّمة المحقِّق|القاهرة — أكتوبر ٢٠٢٧`
(The build already renders `#INTRO` with a page break.)

### 3.4 `#NOTE` lines
- The Part 4 note (before the Akhenaten diary) **stays as it is**; it is already in the editor's voice.
- The Part 6 note announces third-person narration, which contradicts the decisions. **Change its text only** (this needs the lead's sign-off) to:
  `#NOTE|(وما يلي أوراقي أنا. أكملتُ بها ترقيمَ أوراقه، لا لأنّي أضع نفسي إلى جانبه، بل لأنّ الورق لا يسأل عن أصحابه.)`

### 3.5 Editorial interpolations inside Saif's leaves
Saif cannot know anything that happened after his death. Move that material either:
- **into a footnote** (the default; see §8), or
- in three places only, into an **editor's block** opened by a `#DATELINE` line in Yunus's voice:
  - ch. 19: the existing `#DATELINE|تل العمارنة — مارس ٢٠٢٧` block, rewritten in the first person; the existing `#DATELINE|بني حسن — اليومُ الثاني والأربعون` returns us to Saif.
  - end of ch. 27: add `#DATELINE|حاشية المحقِّق` before the «ومرّت فوق الحجرة ثلاثةٌ وثلاثون قرنًا…» material (1912, Verdun, the Minya storeroom, «الآن. وأنت تقرأ هذا.»). This is the only added `#` line Editor E may create.
  - end of ch. 34: add `#DATELINE|حاشية المحقِّق` before the rumours about Saif's later life, the book's journey to Istanbul, the two-ink lines, and the final countdown («بعد ألفٍ وثمانيةٍ وثلاثين عامًا.»). This is the only added `#` line Editor F may create.
No other new `#` lines are allowed, except `#SUBHEAD` if you need one inside your own chunk.

## 4. The frame: canonical facts every editor must respect

### 4.1 The manuscript
- **Writer:** سيف بن سلامة (born منصور, 23 Rabi I 375). He writes in Fustat on the **roof of the copyist's shop** where he worked from 402 to 411. That copyist owed money to Rayhana's father, who later became Saif's father-in-law. The shop now belongs to the copyist's son. He chose the roof because his mother said «ما يقفش على قبري، يقف على السطح».
- **Writing begins on the night of 27 Shawwal 440 AH**, 29 lunar years to the night after the Muqattam. He is about 65.
- **Why he writes:** (a) he has started to forget, and is afraid of the night he will forget the name of his street; (b) to obey the one-word order on the silver plate. Before ch. 34 he only alludes to it («أمرٌ من كلمةٍ واحدة»). **The word «فاكتب» must not appear in Saif's text before the plate scene in ch. 34.** The reveal belongs there.
- **What he writes with:** the caliph's inkwell. He may mention early that it is lent and too heavy. He may not mention the plate before ch. 34.
- **Rayhana (default; lead may override in one line):** she died the winter before he began. He sometimes addresses her, and her remembered voice heckles him (§5.6). If the lead overrides, she is alive and heckles from downstairs. The technique is the same either way.
- **The «أوراق»:** 34 leaves, numbered by Saif. Saif titled nothing. Yunus took the book's title from the leather bundle Saif labelled «أرصادٌ وأَطْوار» (ch. 30), and gave each leaf a title taken from its own text. The preface says so. The tables-only book that went to Istanbul (end of ch. 34) is a **different** object: Saif's coded observation book. Do not merge them.
- **«الكرّاسة الحمراء»** (the phrase on the Azbakeya leaf) is what Yunus calls Saif's bundle. Yunus obtained it in the winter between Dendera (Nov 2026) and Minya (Jan 2027). He never says exactly where (see the preface spec, §10.1). By February 2027 he holds Saif's copy of the plate (ch. 35). Keep that timeline consistent.

### 4.2 The «زيج» rule of sourcing (the key technique)
Ibn Yunus marked every observation as *mine*, *someone else's*, or *transmitted and unverified* (ch. 2: «هذا رصدي، وهذا رصدُ فلان، وهذا نقلٌ لم أتحقّقه»). Saif applies the same rule to his memories. This turns the old omniscient narrator into an act of intellectual honesty, which is exactly the book's theme.

- **«رصدي»**: what Saif saw. Tell it straight, with sensory precision.
- **«حدّثني فلان»**: name the source the first time a scene depends on it, briefly and in-scene, never as a list. Approved sources:
  - **سلامة** and **أمّ هاشم** (the birth, the naming, the night rider at the door. Salama told only Umm Hashim, «وأمّ هاشم لا تحفظ سرًّا أكثر من عشرين سنة»).
  - **ابن يونس** (al-Aziz's dream, the abjad night, palace audiences). Also **his notebooks**, which reached Saif through مُفلِح after 402. Do not contradict the sealed note buried with the sheikh (ch. 20).
  - **مُفلِح** (the sheikh's last seven days, al-Suha).
  - **الخصيّ العجوز** (Sitt al-Mulk's servant: the palace, the lists, the bloodied robe, the scene in the prologue chamber).
  - **ستّ الملك** («مرّةً واحدةً لرجلٍ واحد», ch. 30).
  - **الحاكم نفسه** (they talked till dawn in ch. 32 and on the mountain in ch. 33: the smile at the Nilometer report, the «مجلس الحرف», the Khandaq night).
  - **ابن الهيثم** (the tent).
  - **خالد** (his own torture, told in the sand in ch. 22).
  - **ريحانة** (the women's network, «امرأتان»).
  - **a جارية at the door** (Hakim and his mother, ch. 33).
  - **السوق/الناس** (public events: the decrees at Bab Zuwayla, Hamza, the demolition).
- **«نقلٌ لم أتحقّقه / ظنّي»**: when no plausible witness exists (Barjawan burning the note; Rashid ibn al-Hasan burning his count; Barjawan's last thoughts), Saif says so and offers it as conjecture: «ولم يحدّثني بهذا أحد؛ لكنّي أعرف الرجال الذين يعدّون، وأظنّه…».
- **Never** cite medieval historians by name in Saif's text (no المقريزي: he was born 766 AH). Write «يقول الناس» or «حدّثتني الجارية», and let the footnote cite al-Maqrizi.

Do not over-source. Name the source once per scene. After that, narrate the scene fully, including its dialogue. The source line is a doorway, not a fence.

### 4.3 The two clocks
Every Saif leaf runs on two clocks: **then** (the young man who does not know) and **now** (the old man on the roof who knows nearly everything). Rules:
- Withhold what the current chapter withholds. Knowing the ending does not give Saif licence to spoil it. Allowed foreshadowing: «ولم أعرف يومها… وسأعرف» at most **twice per leaf**, and never the same wording twice in the book.
- Each leaf needs **one "now" passage** of 60–150 words: the roof, the lamp, the inkwell, a doubt, a question, an address to the dead. Do not put two of these back to back, and keep the total under ~15% of the leaf.
- Saif's later knowledge of Hakim and Sitt al-Mulk lets him *judge* scenes. Let him be wrong sometimes and correct himself with the sheikh's «— لا —» device (at most 3 times in the whole book, spread across editors: A once in ch. 1–4, D once in ch. 18–21, F once in ch. 32–34).

## 5. Saif's voice

### 5.1 Register
- **Classical narrative fusha** of a 5th-century AH man of learning: verb-first clauses; و and فـ chains; balanced pairs and triads; «قد» + perfect; «إذ», «ثمّ», «على أنّ», «غيرَ أنّ», «وأمّا… فـ». No saj' runs. The clarity stays modern.
- **Cadence:** reflective passages use sentences of 20–45 words with internal commas, ending on a stressed short clause. Climaxes, revelations, and counts use very short sentences. Alternate the two deliberately.
- **Numbers:** written in words in narration. Digits only inside quoted observations, tables, or notebook entries, as now. Dates are Hijri. Gregorian dates appear only in footnotes, `@IMG` captions, and Yunus's sections.
- **Lexicon:** Saif must not use modern words in his own narration. Substitutions:

| Do not write (Saif) | Write instead |
|---|---|
| موظّف | كاتبٌ من كتّاب الديوان / عاملٌ في الديوان |
| ملفّ | إضبارة / رُقعة / دَرْج في الديوان |
| تقرير | مُطالَعة / رُقعةُ صاحب الخبر |
| أمنيّ، أجهزة | الخبر، أصحاب الأخبار، العسس |
| ورشة | دكّان / حانوت |
| مسرح (theatre) | مجلسُ فُرجة / مَلعبٌ كملاعب الروم |
| لأسباب إداريّة | لأسبابٍ ديوانيّة |
| الرواية / القارئ / الكتاب (meaning *this novel*) | هذه الأوراق / من يقرأ / الحكاية |
| سنة ضوئيّة، مستعر، شامبليون، اللوفر، ٢٠٢٧ | (to the footnote) |

  «دقيقة/ثانية» are allowed only as an astronomer's sexagesimal units. For ordinary time prefer «عَدّة / نَفَس / نبضة».
- **The intrusive "I" already in the text** («وأنا أقول»، «في رأيي»، «عزيزي القارئ») now belongs to Saif. Keep the judgments, re-voice them in his register, and cut «في رأيي» to at most one per leaf.

### 5.2 Point-of-view conversion, mechanically
- Narration about سيف/منصور becomes «أنا». Other characters still call him سيف / منصور / ابن النجوم in dialogue.
- Saif's own past speech stays exactly as spoken: Egyptian colloquial. He explains this once (Editor A, ch. 3) in a single line: he writes common people's speech as it was said, because putting it into fusha is a lie in the observation («وتفصيحُه كذبٌ في الرصد»).
- Do not let Saif *know* other people's interiors. Sitt al-Mulk's feelings come through what she said, did, and later told him. Khalid's poison (Rayhana) comes from Khalid's own confession in ch. 22. In ch. 9 and ch. 12, Saif says he learned it later.
- The Fatimid parts no longer have an outside narrator. Sentences such as «وأنا أقول لك الآن، لأنّي لستُ سيفًا» (ch. 31) must be recast. In this case: «وأقوله لك الآن كما عرفتُه بعد ذلك من خادمها، لا كما عرفتُه في الدهليز».

### 5.3 Addressees
Saif addresses, sparingly:
- **The reader**: «يا من يقرأ». At most 1 per leaf. Never «عزيزي القارئ», which is Yunus's tic.
- **Himself**: «يا منصور». Only in moments of self-accusation. At most 4 in the book.
- **The dead**:
  - Ibn Yunus: «يا شيخي».
  - Salama: «يا أمّي».
  - Rayhana: «يا بنت العطّار».
  - Khalid: «يا خالد».
  - Suhail: rarely.
  - Hakim: Saif does not know whether he is dead: «ولا أدري أأكتب إليك في الأحياء أم في الموتى».
  
  Each of the dead gets at most 3 apostrophes across the book. Every apostrophe must do work: confession, accusation, or a question.

### 5.4 Interiority and doubt
- Saif's doubt is **epistemic**, taught by «لا أعلم». Did the four planets come, or did he meet himself? Is number fate? Does the sky look at anyone? Was he right to stay still in ch. 22? Is a man who knows the eclipse date already a little Hakim (ch. 19)?
- Questions must be real, not decorative: at most **3 rhetorical questions per leaf**. At least one leaf per editor should end its "now" passage on an unanswered question placed *before* the hook.
- The planetary figures keep their ambiguity, and first-person narration sharpens it. Saif records them as observations and adds his disclaimer: «وهذا ما رأيتُه. ولستُ أزعم أنّه ما كان» (keep it in ch. 33, where it already belongs).

### 5.5 Sensuality: sensual but restrained, *measured*
- **One exact sensory anchor per scene.** Prefer smell and touch: musk and clove, jasmine, the garlic of mulukhiya, the iron smell of the prison, cold copper, ink calluses. Never list more than 3 items.
- **Desire is told by measuring**: pulse (93 / 65), the distance in a «شِبر», breaths counted, counting forgotten. That is our signature and it is not Ziedan's. Nothing explicit. The old man judges the young man's desire in a single sentence, and judges it honestly («أكنتُ أحبّها، أم أحبّ أن تقلب كفّي أذكى نساء مصر؟»).

### 5.6 The inner heckler (adapted technique)
A remembered voice, Rayhana's, interrupts Saif when he indulges himself: too much description, self-pity, or astronomy at the wrong moment. It must be dry, Egyptian, and loving: «كفاية يا ابنَ النجوم؛ الورق غالي والزيت أغلى». **At most 4 uses in the book**: ch. 9 (after «سبعة»), ch. 11 (after the garden), ch. 28 (after his mother's death; very soft), ch. 34 (after «بحبّك»). Editors B (ch. 9), C (ch. 11), E (ch. 28), and F (ch. 34) get exactly one use each. **Do not** give the planets this role. They keep their own speeches.

### 5.7 Theology and philosophy
- Saif is a believing Muslim of his century who measures. His questions concern **qadar and number**, **signs versus measurement**, **the ẓāhir/bāṭin claim of anyone who knows a date before others**, and **what one says to a grieving believer of another faith**.
- Treat the Qur'anic qirā'a scene (ch. 20) with complete reverence. The irony falls on Hakim's *reading*, never on the verse.
- Hamza ibn Ali and the da'wa: historical and sober. No mockery of Druze or Ismaili belief. The critique is of flatterers who said «أنت الأوّل والآخر» to a starving man (Sitt al-Mulk's reading).
- Copts, the Holy Fire, the Sepulchre: grief is real and dignified. The satire hits the **diwan** («الديوان لا يؤمن بشيءٍ ينزل من السماء إلا الرواتب»), not the believers.

### 5.8 Paragraphing and scene breaks
- At present the median paragraph is 12 words and there are 383 `*` breaks. In Saif's **reflective and summary passages**, merge runs of 2–4 one-line paragraphs into a single paragraph of 3–6 sentences (target median about 25–35 words in Saif's leaves).
- **Keep single-line paragraphs** for hooks, revelations, counts («ثلاث. بطيئة.»), one-line replies, and climactic beats (river, prison, mountain).
- You may remove up to a third of the `*` lines where they only separate two beats of the same scene. Keep every `*` that marks a change of time, place, or source.

### 5.9 Dialogue
Keep the guillemets «…». Keep all existing Egyptian lines (light trimming is fine). Court and scholarly speech stays in elevated fusha. Do not use Azazel-style dashes or italics.

## 6. Rhythm and pacing rules

1. **Scene versus summary:** keep the current balance, which is good. Re-voice historical summaries (Dar al-Hikma, the Sepulchre, Hamza, Ibn al-Haytham at the cataracts) as *what Saif heard and where*: market, quay, linen merchant. They become shorter and truer.
2. **Revelation:** reveal through memory and correction, not through the narrator's formula. The first person makes «ولم يكن يعرف أنّ…» unnecessary in most places.
3. **The writing act as event:** in about 8 leaves the "now" passage touches the physical writing: the oil, the lamp, the inkwell's weight, the dawn call from Amr's mosque, the copyist's son below, a page running out. Suggested leaves: 1, 7, 11, 14, 19, 22, 23, 29, 34. Never twice in one leaf.
4. **Datings:** Saif dates his writing nights only in ch. 1 (27 Shawwal 440), in one middle leaf (Editor D: a night in Rajab 441, «والريح…»), and in ch. 34 (his last night of writing). Nowhere else.
5. **Hooks stay last** (§9).
6. **Formula budget for the whole book.** Use the savings to pay for the first-person sourcing:

| Formula | Max in the book |
|---|---|
| «ولم يكن يعرف/يعلم أنّ» (now «ولم أكن أعرف») | 4 |
| «ولن أصف…» | 2 |
| «وهذا وحده…» | 2 |
| «وهذا أخطر ما…» | 1 |
| «في رأيي» | 1 per leaf |
| «من قال لك غير ذلك فهو يكتب أدبًا رديئًا» | 1 (it occurs twice now: keep the ch. 9 one in Saif's version, which becomes «…فهو من القُصّاص»; the Yunus one in Part 1's diary stays) |

## 7. Satire

**Saif's satire:** classical deadpan. The understatement of a man who has read too many registers. His targets are:
- the diwans, their formulae («ولم يُفِد»، «قوّة مناسبة»، «قُبض عليه بعد مقاومة»), the «ثلاثة عدول» who saw nothing;
- astrologers paid double;
- courtiers and chamberlains paid «على المرّة الثانية»;
- the city that laughs and then falls silent;
- scholars who quote instead of measuring.

**Yunus's satire:** modern Egyptian officialdom (three signatures, the ticket clerk, the ministry), academia («استمارةٌ من سبع صفحات»), YouTube "experts", bargaining at Azbakeya, the agencies' tea, his own vanity.

Frequency: about one sly aside per 400–600 words. Never two in a row. Never inside the core of the climaxes (ch. 26 eclipse, ch. 33 mountain from the planets onward, ch. 39 countdown), except one dry line that *deepens* the moment, such as the eunuch's «لازم يكون اتقتل». No puns, no slapstick, no caricature of the poor, no jokes about torture, no jokes about any faith.

The best satire is **anachronism turned into classical idiom**. Bureaucracy is as old as ink, so make it sound ancient («أوّلُ سِجِلٍّ في الدنيا طلب هاربًا عند الخفّافين»).

## 8. Footnotes: the editor's voice

- All footnotes are Yunus's. Keep **all factual content** of the existing 73. Re-voice a footnote only where it is natural (for example where Saif's text lost a modern fact that now has to live in the note). About 1 in 5 may carry a dry first-person touch: «قلتُ:», «وأظنّ», «وقد وقفتُ هناك…». The rest stay crisp and impersonal.
- **New footnotes** (prefix `<x>_`) are for modern facts removed from Saif's text, and for a few editorial remarks. Each editor gets at most 6 new notes.
- Do not end footnotes with «(المحقِّق)». That is Ziedan's «(المترجم)» habit, and every note is ours anyway.
- **Optional (lead may override):** each editor may report at most **one** later marginal note in a footnote, made by one of exactly two hands: (a) the Fustat collator who wrote «تمّت المقابلة…», or (b) the Istanbul reader who wrote «ولِمَ؟». Format: «وفي الهامش بخطٍّ غير خطّه: "…"».

### Anachronism map (Saif's leaves). Act on every row in your chunk:

| Ch. | Current text (short) | Action |
|---|---|---|
| Pro. | «طوال ألف سنة»، «وبعد ذلك بقرون…سطرٌ واحد» | Saif prophesies with a hedge: «وسيصير في الكتب، إن بقيت كتب، سطرٌ واحد» |
| Pro. | «وجاؤوا بالثياب… وُجدت على طرف الجبل» | Saif knows he carried them down (ch. 34). Keep the official version and add a hook: «هكذا قيل في الصباح، وسأقول في موضعه مَن حملها». |
| Pro. | «لأنّ هذا ما تفعله النساءُ في الروايات» | «في سِيَر القُصّاص» |
| 5 | «كالذي عُرف بعد قرنين في مَراغة⟦fn:maragha⟧» | «ولم يكن مرصدًا كما يحلم به أهلُ الصنعة…» and keep the marker on «مرصدًا» |
| 5 | «جعلت رجلًا بعد أكثر من ألف عام يرفع… راجِعوه» | Move to new note `b_rajiuh` (example 8) |
| 8 | «مسألةً أمنيّةً… ورشة أحذية» | Example 4a |
| 9 | «موظّفًا ممتازًا»، «موظّفٌ في دولة ظالمة» | Example 4b; «كاتبٌ في دولةٍ ظالمة» |
| 12 | «والذين يكتبون عنه بعد ألف سنة»؛ «وقد بقي خالد في الرواية» | «والذين سيكتبون عنه من مقاعدهم…»؛ «وسيعود خالد إلى هذه الأوراق» |
| 16 | «سبعةِ آلافٍ ومئتَي سنةٍ ضوئية⟦fn:ly⟧» | «ووصل ضوؤه إلينا من بُعدٍ لا يُعَدّ⟦fn:ly⟧»; the number lives in the note |
| 17 | «قبل شامبليون بثمانمئة سنة⟦fn:champollion⟧» | «ولا يقرؤها أحدٌ في زماني⟦fn:champollion⟧» |
| 17 | «كما أثبتُّ في دفتري… ففي الثاني من أغسطس سنة ٢٠٢٧…السرطان» | Saif keeps only «إشارةٌ إلى ما سيكون». The 7 March / 2 August 2027 / Cancer facts go to a new note `c_cancer` in Yunus's first person |
| 18 | «حَلَّ الرواية كلِّها» | «…كلَّ ما ستقوله هذه الأوراق» |
| 19 | Yunus `#DATELINE` block in the third person | Rewrite in Yunus's first person |
| 19 | «بنى لهم مسرحًا» (Khay via the blind sheikh) | «مجلسَ فُرجة» |
| 20 | «ستُنقَل أرصادُه بعد ثمانمئة سنة… تباطؤَ دوران الأرض⟦fn:earth_rot⟧» | Saif: «وأرجو أن يحسب بها قومٌ لا أعرفهم ما لا نعرفه⟦fn:earth_rot⟧» |
| 21 | «وكتب المؤرّخون بعد ذلك ألفَ سنة» | «ولن يتّفق الناسُ على سببٍ واحد؛ فقد سمعتُ منهم في حياتي سبعة» |
| 22 | «ولم يكن له في هذه الرواية اسم. وهذا مقصود.» | Confession: «ولا أكتب له اسمًا هنا، لا لأنّي نسيته، بل لأنّي لم أسأله عنه. وهذا ذنبي لا ذنبُ الورق.» |
| 23 | «ولن يُقلَع إلا بعد ثلاثة قرون⟦fn:casing⟧»؛ «يدخل منه أنت اليوم… السيّاحُ يدفعون» | Saif describes the casing as he saw it. The future goes to the note. The tourists joke goes to a new note in Yunus's voice («والخلفاء يحفرون والسيّاح يدفعون؛ وقد دفعتُ.») |
| 23 | «سطرًا وجده بعد أكثرَ من ألف سنة رجلٌ في شقّةٍ بشارع المعزّ» | Saif: «سطرًا لا أدري مَن يجده». New note: Yunus, «وجدتُه أنا، ومعي كوبُ شايٍ بارد» |
| 24 | «ولا يزال بعضُها إلى يومك» | Khay cannot say «يومك» this way. Add a note, or «إلى ما شاء الله» |
| 26 | «(وهو، بحساب الناس اليوم، ١٤ مايو ١٣٣٨ ق.م.)» | Keep it as a bracketed **editor's gloss** inside Khay's text: «[وهو بحسابنا اليوم: ١٤ مايو ١٣٣٨ ق.م.]». This is the only inline bracket allowed in the book |
| 27 | «الموضع الذي سيُسمّى بعد ألفي عام بني حسن⟦fn:e_beni_hasan⟧» | Saif glosses it in his own copy: «وهو الموضع الذي نسمّيه نحن بني حسن» |
| 27 | 1912 / Napoleon / storeroom | `#DATELINE|حاشية المحقِّق`, Yunus first person |
| 31 | «الرواية التي تُخفي هذا…»؛ «لأنّي لستُ سيفًا» | «والحكاية التي تُخفي هذا… تخدع من يقرؤها»؛ see §5.2 |
| 33 | «نقلها المؤرّخون بلفظها» | «حدّثتني بها جاريتُها»; the note cites al-Maqrizi |
| 33 | «#SUBHEAD|وأمّا رأيي» block | Becomes **Saif judging his own vision** (three sleepless nights, cold, dark). It is the best confessional moment in the book. Keep the subhead line |
| 34 | «وقد ظُنّ بها ألفَ سنة»؛ «ليقف أحدٌ بعد ألف سنة ويسأل» | «وسيُظنّ بها ما يُظنّ»؛ «ليقف أحدٌ بعدنا ويسأل» |
| 34 | rumours, the book's fate, Istanbul, «بعد قرون» | `#DATELINE|حاشية المحقِّق` |

## 9. Chapter endings

- **The current hook stays as the last line** (re-voiced into the first person where needed): «فما عَدَدُ اسمي؟», «كان يعرف وجهي.», «مسمارًا.», «— إلا في هذا.», «ستّة أيام… لأعرف مَن منهم ما زال حيًّا.», «وكنتُ، لأوّل مرّةٍ في حياتي، أتمنّى أن أكون كذّابًا.», «أثقلُ ممّا ينبغي لدواةٍ نصفُها حبر.», and the rest.
- You **may** place one line of reflection or of the writing frame *before* the hook. Never after it.
- Endings inside Yunus's text (diaries, ch. 35–40, the postscripts) keep their sting: «٣٨٦.», «إحنا بس أوّل جهاز يقدّم لك شاي.», «فاكتب.»
- Two hooks become stronger in the first person. Check that they still land:
  - ch. 22: «ولم أعرف يومئذٍ أنّ في القصر من سيقول لي…»
  - ch. 29: «…الاسمُ الخامس: اسمُ التي كانت واقفةً أمامي بالطبق.»

## 10. Yunus's voice

### 10.1 The preface «مقدّمة المحقِّق» (Editor A; 500–650 words)
Dry, witty, ironic. A scholar who mocks his discipline and himself, and is scrupulous about facts. It must contain, in roughly this order:
1. What the manuscript is: Saif's own account; 34 numbered «أوراق»; written after 411 AH, beginning 27 Shawwal 440, on the roof of a copyist's shop in Fustat. Hand, ink, and condition in one precise sentence. A sly remark that its "red" binding has turned the colour of tea.
2. How he found it: the Azbakeya leaf (July 2026; 40 pounds; the bargaining; «والباقي في الكرّاسة الحمراء»). Then the bundle itself, in the winter of 2026–27. Where exactly stays withheld: «سُئلتُ عن ذلك في مبنًى بلا لافتة، وعلى هاتفٍ بلا اسم، وفي طائرةٍ لم أشترِ تذكرتها، ولن أزيد هنا على ما قلتُه هناك، وهو قليل.»
3. What he did as editor:
   - kept Saif's numbering, and gave each leaf a title taken from its own words;
   - kept the common people's speech in colloquial «كما كتبه»;
   - footnotes are his: modern dates, identifications, corrections, «وحيث أخطأتُ أنا، وهو أكثر»;
   - leaves 24–27 are Saif's copy of a wall and a blind man's reading («صدًى لصدًى»);
   - his own diary pages sit between the parts, «لأنّ القارئ يحتاج أحيانًا أن يتنفّس في القرن الحادي والعشرين قبل أن يغطس ثانيةً»;
   - he continued the numbering with six leaves of his own, and why.
4. An admission of hesitation about publishing (friends advised against it; «اثنان منهم محامون»).
5. A hook, without spoilers: summer 2027 happened, «ويعرفه بعضُكم من نشرات الأخبار، وأقلُّكم على حقيقته».
6. No signature line inside the text. The date goes in the `#INTRO` date field only: «القاهرة — أكتوبر ٢٠٢٧» (§3.3).

### 10.2 Diary entries («من دفتر المحقِّق»)
Already strong. Keep them. Convert the third-person entries to the first person: Minya Jan 2027 («وقف يونس كرم» → «وقفتُ»), May 2027, and the ch. 19 Amarna dateline. Keep each entry's closing pull. The first diary entry keeps «عزيزي القارئ» (the tic is his); elsewhere use it at most once more.

### 10.3 Yunus's own leaves (ch. 35–40, Editor G)
- First person throughout. The thriller pace must stay intact: short paragraphs, timestamps, the countdown. **Do not add reflective padding inside ch. 38–39.**
- Yunus's interiority is ironic, self-mocking, and frightened. He may glance once or twice at Saif's leaves («وتذكّرتُ ورقته الثالثة عشرة: المسمار»). Never more than once per leaf.
- The «فاكتب» ending of ch. 40 stays Yunus's, and now carries double weight: he is the editor who obeyed.
- Keep the Appendix as the **author's** paratext after `#FIN`, outside the frame. Add one sentence to it: «والمحقِّق يونس كرم، ومقدّمته، وأوراقُ سيف، من عندي كذلك.»

## 11. Do-not-copy list (Ziedan)

Do not use any of these:
- the words رقّ / رقوق for Saif's pages; صومعة; a monk's cell; a buried box or marble tile; burying the text again; a 40-day retreat or a pact about the writing period;
- the name or concept عزازيل; a devil-interlocutor (our heckler is a dead wife's remembered voice, and the planets are not demons);
- Ziedan's names (هيبا، مرتا، أوكتافيا، نسطور، كيرلس، هيباتيا…) or Ziedan-like episodes (a donkey given and then eaten by wolves; a widow who feeds the hero; a singer taken off to Aleppo);
- openings with a prayer or invocation; «أتذكّر جيّدًا» as a leaf opener (zero uses); a habit of ending sentences with «..»;
- italic dialogue; captions that say «قد تكون صورة…»;
- the sentence shape «ها قد امتلأ…» for ending a leaf (if a page runs out, say it your own way: oil, ink, dawn).
Imitate the technique only: a single confessing voice that knows it is writing, layered transmission, unanswered questions, restrained sensuality, physical writing.

## 12. Before / after examples (original Arabic written for this guide)

### Example 1: Saif introduces himself (Prologue, Editor A). Replaces the last line of the prologue.
**Before (line 37):**
> وربما كانت هذه الصفحات كلُّها جوابًا عن ذلك السؤال. فارجع معي ستًّا وثلاثين سنة، إلى ليلةٍ وُلد فيها طفلان.

**After:**
> ولم أرَ شيئًا من هذا بعينيّ. حدّثني به الخصيُّ العجوز الذي كان عند الباب، بعد ذلك بسنين، في سوق الليل، وهو يقلّب رغيفًا لا ينوي أن يشتريه. وأنا أكتبه كما بلغني، وأُعلِّم عليه كما كان شيخي يُعلِّم على أرصاد غيره: هذا نقلٌ لم أتحقّقه. أمّا أكثرُ ما بعده فرصدي.
>
> اسمي سيفُ بن سلامة، وكان اسمي منصورًا حتى أخذه منّي رجلٌ أحبّني ليحميني. وأكتب هذه الأوراق على سطح دكّانِ نسّاخٍ في الفسطاط، في ليلة السابع والعشرين من شوّال سنة أربعين وأربعمئة، وقد مضى على ليلة الجبل تسعٌ وعشرون سنة لا ينقصها يوم. تحتي ابنُ النسّاخ يغلق الدكّان ويشتم الزيت، وفوقي سماءٌ أعرف أسماءها كلَّها ولا تعرف اسمي، وهذا عدلٌ لا أشكوه.
>
> وأكتب لأنّي صرتُ أنسى. نسيتُ في الأسبوع الماضي اسمَ الدرب الذي وُلدتُ فيه، ثم ذكرتُه، فخفتُ من الليلة التي لا أذكره فيها. وأكتب لأنّ أمرًا من كلمةٍ واحدةٍ بلغني منذ تلك الليلة، ولم أُطِع في عمري أمرًا غيرَه راضيًا. وسأقول في موضعه مَن الذي أمر. وأكتب بدواةٍ ليست لي، أُعِرتُها إلى أجلٍ أطولَ من عمري، وهي أثقلُ ممّا ينبغي.
>
> فارجع معي، يا مَن يقرأ، ستًّا وثلاثين سنةً قبل ذلك الدم، إلى ليلةٍ وُلد فيها طفلان، كنتُ أنا أحدَهما.

*Shows:* the sourcing rule, the two clocks, the writing scene, the allusion to the plate without the word «فاكتب», a dry joke (the oil, the sky), and the hook kept last.

### Example 2: A scene Saif did not witness (ch. 4, Editor A).
**Before (lines 319–320):**
> واختلف الناسُ: أشار أم لم يُشِر. وأنا أقول إنّ رَيدان كان قد أُمر قبل أن يدخل بُرجوان البستان، وإنّ كلّ ما جرى كان شرحًا لأمرٍ صدر.
> ولن أصف القتل. أقول فقط إنّ العُشب لا يُصدر صوتًا، وإنّ بُرجوان كان يظنّ أنّه ما زال يستطيع أن يُصلح الأمر في الصباح.

**After:**
> ولم أكن في البستان. كنتُ تلك الليلة في الخرابة أحمل حلقةَ الشيخ، وأحسب أنّ أخطرَ ما في الدنيا أن تسقط من يدي. وقد اختلف الذين حدّثوني: أشار أم لم يُشِر. يقول الخصيُّ العجوز إنه لم يُشِر، والخصيان لا يكذبون إلا فيما يُسألون عنه، ولم يسأله أحد. وأمّا ظنّي، وأُعلِّم عليه أنّه ظنّ، فإنّ رَيدان كان قد أُمر قبل أن يدخل الأستاذُ البستان، وإنّ كلّ ما جرى بعد ذلك كان شرحًا لأمرٍ صدر.
> ولن أصف القتل، فإنّي لم أره، ومن وصف ما لم يره صار من المنجّمين. أقول فقط ما أعرفه من البساتين: أنّ العُشب لا يُصدر صوتًا، وأنّ بُرجوان كان يظنّ أنّه ما زال يستطيع أن يُصلح الأمرَ في الصباح.

### Example 3: Sensual but restrained, with interior doubt (ch. 11, Editor C).
**Before (lines 779, 784–790, condensed):**
> ومدّت يدها. لم تلمس وجهه. أمسكت رسغَه، ورفعت يده إلى الضوء المنعكس من الماء، وقلبتها… ولم تترك الرسغ. وكان نبضُه تحت إبهامها يفضحه، وكانت تعرف… ودنت حتى صار نَفَسُها على فمه، ووقفت هناك… ثلاثَ ثوانٍ، أو أربعًا.

**After:**
> ومدّت يدها، ولم تلمس وجهي. وقد ظللتُ سنين أحسب ذلك عليها، ثم صرتُ أحسبه لها. أمسكت رسغي، ورفعت يدي إلى الضوء الذي يرتدّ من الماء، وقلبتها كما يقلّب الصيرفيُّ دينارًا يشكّ في وزنه: أصابعُ مبقّعةٌ بالحبر، وغِلَظٌ من القلم، وفي الراحة أثرُ حبالٍ قديم.
> وكان نبضي تحت إبهامها يشهد عليّ، وكانت تقرأ الشهادة.
> «ثلاثةٌ وتسعون. أنت الآن كمن يجري.»
> «أنا أجري منذ خمس سنين يا سيّدتي.»
> فضحكت في حلقها، ودنت حتى صار نَفَسُها على فمي، ووقفت هناك، في المسافة التي هي أقربُ من القُبلة وأقسى منها، ثلاثَ عدّاتٍ أو أربعًا. ولا أذكر من تلك العدّات إلا رائحةَ صندلٍ في ثوبها، وأنّي، وأنا الذي أعدّ كلَّ شيء، نسيتُ أن أعدّ.
> وأسأل نفسي اليوم، وقد ابيضّ ما بقي من شعري، سؤالًا لم أجرؤ عليه وأنا ابنُ عشرين: أكنتُ أحبّها، أم كنتُ أحبّ أن تقلب كفّي أذكى نساء مصر؟ وهل يفرّق قلبُ الرجل بين الاثنين، أم هو كالعين يرى ما عُلِّم أن يراه؟

### Example 4: Satirical asides re-voiced for Saif (ch. 8 and ch. 9, Editor B).
**4a. Before (line 618):**
> وهو، إن أنصفنا، أوّلُ قرارٍ في التاريخ يحلّ مسألةً أمنيّةً بإغلاق ورشة أحذية.

**After:**
> وهو، إن أنصفنا، أوّلُ سِجِلٍّ في الدنيا طلب هاربًا عند الخفّافين. ولو طال عمرُ الديوان لمنع الخيّاطين أن يجعلوا للنساء أكمامًا، فإنّ اليدَ تخرج من الكُمّ كما تخرج المرأةُ من الباب.

**4b. Before (line 629):**
> لم يكن سفّاكًا ولا صاحبَ عقيدة. كان موظّفًا ممتازًا، وهذا أخطرُ ما يكون.

**After:**
> لم يكن سفّاكًا ولا صاحبَ عقيدة. كان كاتبًا ممتازًا من كتّاب الديوان، لا يتأخّر ولا يرتشي ولا يسأل لماذا. وهذه الثلاث إذا اجتمعت في رجلٍ فاستعذ بالله منه أكثرَ ممّا تستعيذ من اللصوص؛ فاللصُّ يأخذ ما في بيتك، والكاتبُ الممتاز يأخذ البيت ويكتب في الهامش: «سُلِّم».

### Example 5: A theological question, with respect (ch. 21, Editor D).
**Before (line 1404):**
> فرأى سيفٌ شيخًا منهم جالسًا على درج كنيسته يبكي بلا صوت. فوقف أمامه ولم يعرف ماذا يقول، لأنّ ابن يونس علّمه أن يحسب الكسوف، ولم يعلّمه ماذا يقول لرجلٍ هُدم قبرُ إلهه.

**After:**
> ورأيتُ شيخًا منهم على درج كنيسته يبكي بلا صوت، ويداه على ركبتيه كمن ينتظر أن يُنادى. فوقفتُ أمامه، وأنا الذي أحفظ واحدًا وثمانين بابًا من الزيج، فلم أجد في الأبواب كلّها بابًا لهذا. علّمني شيخي أن أحسب متى يغيب القرص، ولم يعلّمني ماذا يُقال لرجلٍ هُدم موضعُ صلاته بأمر رجلٍ يصلّي.
> وسألتُ نفسي ليلتها، وما زلتُ أسألها: إن كانت النارُ التي تنزل على القبر من يدٍ، كما قال ديوانُ الخبر، فمن أيّ يدٍ كان دمعُ هذا الشيخ؟ إنّ الديوان يعرف كيف تُصنَع النار، ولا يعرف كيف يُصنَع الإيمان، ولذلك يهدم الحجرَ ويظنّ أنه بلغ النار.
> ولم أقل له شيئًا. جلستُ إلى جانبه على الدرج حتى أذّن المغرب، فقام إلى صلاته وقمتُ إلى صلاتي، ولم يسأل أحدُنا الآخرَ إلى أين.

### Example 6: Addressing the dead, plus the heckler (ch. 9, Editor B; see §5.6).
**Before (lines 696–698):**
> فسكتت، ونظرت إليه طويلًا، وهو ينظر إلى ما فوقها بكثير. ثم ضحكت ضحكةً قصيرةً ليست ضحكًا:
> «مبروك. بقيت تشوف سبعة.»
> وقفزت إلى السطح المجاور، وذهبت.

**After:**
> فسكتت، ولم أرَ أنّها سكتت، فقد كنتُ أنظر إلى ما فوقها بكثير. ثم ضحكت ضحكةً قصيرةً ليست ضحكًا:
> «مبروك. بقيت تشوف سبعة.»
> وقفزت إلى السطح المجاور، وذهبت.
> وأكتب هذا الآن، يا بنت العطّار، وأنا أرى السبعة بعدُ، وأرى الثامنة إذا صفا الهواء، وقد عميتُ عن واحدةٍ كانت على قدر ذراع. وأكاد أسمعكِ من تحت الدرج، بالصوت الذي كنتِ تُخفين به ما تُخفين: «كفاية يا ابنَ النجوم. هتقعد تعدّ غلطاتك كمان؟ الورق غالي، والزيت أغلى.»
> فلأطوِ هذا، ولأكتب ما رآه خالد.

### Example 7: A chapter ending re-voiced (ch. 14, Editor C).
**Before (lines 928, 936–938):**
> ولو رأى أحدٌ تلك الابتسامة لفهم كلَّ شيء. لكن لم يرَها أحد.
> …
> رجلان يبتسمان في اللحظة نفسها، على بُعد عشرين ميلًا.
> أحدُهما مخطئ.
> والآخرُ أخطأ في كلّ شيءٍ تقريبًا — إلا في هذا.

**After:**
> ولم يرَ أحدٌ تلك الابتسامة. وأنا أكتبها لأنّه حكاها لي بنفسه، بعد ستّ عشرة سنة، على حجرٍ في المقطّم، وكان يضحك وهو يحكيها كمن يتذكّر حيلةً في الشِّطرنج.
> …
> وكنّا رجلين نبتسم في لحظةٍ واحدة، بيننا عشرون ميلًا من الماء والظلام.
> وكان أحدُنا مخطئًا، وكنتُه أنا.
> أمّا هو فقد أخطأ في كلّ شيءٍ تقريبًا — إلا في هذا.

### Example 8: A Yunus editor's note (ch. 5, Editor B; new footnote).
**Before (line 419, Saif's leaf):**
> وهذه الجملة هي التي جعلت رجلًا بعد أكثر من ألف عام يرفع إلى الناس حسابَه كلَّه، بالشطب والأخطاء، ويكتب تحته: «راجِعوه.»

**After, in Saif's text:**
> ولم أفهم يومها أنّ الشيخ لم يكن يدافع عن ورقته، بل عن قارئٍ لن يراه⟦fn:b_rajiuh⟧.

**`b_rajiuh` in `B_fn.json`:**
> قارئٌ لن يراه: أظنّه يعنيني، وأظنّه يعني غيري أيضًا. وقد نشرتُ حسابي كلَّه في آخر هذه الأوراق بشطبه وأخطائه، اقتداءً بهذا السطر لا تواضعًا؛ فالتواضعُ عندنا يحتاج إلى استمارةٍ وختمِ النسر. انظر الورقة الأربعين.

**And an existing note re-voiced, `ly` (Editor C):** keep the facts and add the editor's touch only at the end:
> السنةُ الضوئيّة وحدةُ مسافةٍ لا زمن: ما يقطعه الضوء في سنة، نحو ٩٫٤٦ تريليون كيلومتر. فالضوءُ الذي رآه سيفٌ على سطح المقلاة، ورآه ابنُ رضوان في القاهرة سنة ١٠٠٦م، كان قد غادر نجمه قبل ذلك بنحو سبعة آلاف ومئتي سنة. ولم يقصد أحدًا، وإن ظنّ بعضُهم غير ذلك.

### Example 9: The opening of the editor's preface (Editor A). A model; complete it per §10.1.
> هذه أوراقٌ كتبها رجلٌ اسمُه سيفُ بن سلامة، على سطح دكّانِ نسّاخٍ في الفسطاط، ابتدأها في ليلة السابع والعشرين من شوّال سنة أربعين وأربعمئة، أي بعد ليلةٍ يعرفها المؤرّخون بتسعٍ وعشرين سنة، ويعرفها هو بالساعة. أربعٌ وثلاثون ورقةً رقّمها بيده، بخطٍّ نسخيٍّ يصغر كلّما اقترب من الحافّة كأنّ صاحبه يقتصد في الورق، وقد كان يقتصد. وكانت محفوظةً في جلدٍ أحمر صار بلون الشاي، كما يصير كلُّ شيءٍ في هذه البلاد إذا طال عليه الوقت.
> وأنا يونس كرم، مؤرّخٌ للعلوم، أي رجلٌ يقضي عمره في إثبات أنّ آخرين كانوا على حقّ قبله. وقد وقعت إليّ أوّلُ ورقةٍ من هذا الخيط في يوليو سنة ٢٠٢٦، ملتصقةً بغلاف كتابٍ اشتريتُه من سور الأزبكيّة بأربعين جنيهًا بعد مساومةٍ ما زلتُ أفخر بها. وفي أعلاها سطرٌ يقول إنّ الباقي «في الكرّاسة الحمراء». أمّا كيف بلغتُ الكرّاسة، فقد سُئلتُ عن ذلك في مبنًى بلا لافتة، وعلى هاتفٍ بلا اسم، وفي طائرةٍ لم أشترِ تذكرتها، ولن أزيد هنا على ما قلتُه هناك، وهو قليل.

### Example 10: Yunus's own leaf in the first person (ch. 39, Editor G).
**Before (lines 2640–2644):**
> وكان يونس كرم جاثيًا فوقه، ويداه على الجرح، حمراوين إلى الرسغ.
> وعلى بُعد خطوتين منه، في الرمل، مسدسٌ لم يكن هناك قبل ثانية.
> وفوق رأسه، على ارتفاع عشرة أمتار، طائرةٌ سوداء تطنّ، وعدستُها مفتوحةٌ عليه.
> وفي جيبه اهتزّ الهاتف: علامتان زرقاوان. وصلت الرسالة.
> وفي تلك الثانية رآه العالمُ كلُّه.

**After:**
> وكنتُ جاثيًا فوقه، ويداي على الجرح، حمراوين إلى الرسغ. أنا الذي قرأ عن الدم أربعين سنة في الحواشي، ولم يعرف قبل تلك الثانية أنّ له حرارة.
> وعلى بُعد خطوتين منّي، في الرمل، مسدسٌ لم يكن هناك قبل ثانية.
> وفوق رأسي، على ارتفاع عشرة أمتار، طائرةٌ سوداء تطنّ، وعدستُها مفتوحةٌ عليّ.
> وفي جيبي اهتزّ الهاتف: علامتان زرقاوان. وصلت الرسالة.
> وفي تلك الثانية رآني العالمُ كلُّه.

*Shows:* the pace kept, a single interior line added, and the hook last. (Note «رآني»: in the first person the hook becomes more dangerous, which is good.)

## 13. Per-leaf checklist (one line each; do these in addition to the general rules)

- **Pro.** Example 1. «في سِيَر القُصّاص». Add the hook about the clothes.
- **1** Sources: Salama and Umm Hashim for the birth; the sheikh's notebook for his line; the sheikh himself for the abjad night and the palace. Writing-night dating (the first of three).
- **2** Al-Aziz's dream told by the sheikh («حدّثني به مرّةً واحدة، في ليلةٍ مرض فيها»). Keep the mother's line and the shadow-hand boy.
- **3** First-hand and warm. The one-line policy on colloquial speech. Khalid's hidden hunger «عرفتُها بعد خمس عشرة سنة».
- **4** Example 2. The night rider at Salama's door via Umm Hashim. The «اثنين وستّين» hook.
- **5** The Venus vision as an observation with doubt. Move «راجِعوه» (example 8) and «مراغة».
- **6** The mashrabiya scene in sensory detail (green cloth, the hand on the wood). The palace list scene via Ibn Yunus («وركبتاه ترتجفان، كما قال لي»).
- **7** Suhail. The "now" passage addresses the dog, very briefly. Keep «كُن أقلَّ ثمنًا…». The palace coda via Hakim on the mountain.
- **8** The women's network via Salama and Rayhana. Example 4a.
- **9** Rashid as conjecture, or via a clerk. Example 4b. Example 6. Keep Khalid's fear and «أنا هقول إنك مُتّ».
- **10** Jupiter as an observation. The Damascene's diagnosis joke stays.
- **11** Example 3. «وهذه كذبة. كنتُ أعرف تمامًا.» The «مرّة واحدة بس» confession.
- **12** Khalid's torture «كما حدّثني به هو، في الرمل». Keep the defence of the man who held out for three days.
- **13** Mars. Keep the nail. The eleventh-day man asking «ما اسمُ أمّك؟».
- **14** Example 7. The eunuch, Rayhana, the bottle. The sheikh's coded farewell: an apostrophe «يا شيخي» is allowed here.
- **15–17** First-hand. Saif's own pride and fear; the crypt in physical detail; move Champollion, 2027, and Cancer to the notes.
- **18** «…كلَّ ما ستقوله هذه الأوراق».
- **19** The Yunus block in the first person; «مجلس فُرجة»; Saif's fourth sentence on the stone is the philosophical core. Do not shrink it.
- **20** Mufleh as source; the qirā'a scene (reverent); Saturn; Rajab 441 dating (the second of three).
- **21** Example 5; Ibn al-Haytham; Hakim's mother via a servant; Rayhana's suitors message.
- **22** Confession of guilt (see the §8 table). Heckler not used here.
- **23** The pyramid; Butrus; the calculation; the letter; the "now" passage before «ستّة أيام…».
- **24–27** Saif presents Khay in one framing sentence at the start of ch. 24 («وما يلي ما نقلتُه عن جدارٍ في بني حسن، وما قرأه لي شيخٌ أعمى في الأشمونين، وقد سوّيتُ ألفاظه ولم أُسوِّ معانيه»). Khay's voice stays as it is. The ch. 26 gloss goes in brackets. Ch. 27 gets the editor's postscript.
- **28** «ولن أكتب ما فعلتُه تلك الليلة. لا أذكره، أو لا أريد أن أذكره، وهما عند الشيوخ سواء.» Apostrophe to Salama, very short. Heckler (soft).
- **29–31** The four Mansurs; the leather bundle; the arrest; the corridor with Sitt al-Mulk (pulse 65). Her reasons «كما عرفتُها بعد ذلك».
- **32** Face to face. Keep the laughter «مرّةً واحدة. من رجلين». Last line: «وكنتُ، لأوّل مرّةٍ في حياتي، أتمنّى أن أكون كذّابًا.»
- **33** Mother via the servant girl; the mountain in the first person; the planets as observation; «وأمّا رأيي» as Saif's own self-doubt; «فهمتُه بعد ثلاثين سنة، على هذا السطح».
- **34** The robe via the eunuch; «امرأتان» via Rayhana; the plate (the first time «فاكتب» appears); his last writing night (the third dating); a last heckler line after «بحبّك»; then the `#DATELINE|حاشية المحقِّق` postscript ending «بعد ألفٍ وثمانيةٍ وثلاثين عامًا.»
- **35–40** First person for Yunus; keep every beat of the thriller; one glance back at Saif per leaf at most; ch. 40 «فاكتب.»

## 14. Final self-check before handing in

- [ ] Every `#`/`@` line is present; only the `#CH` third field, the `#INTRO` labels, the preface line (A), the Part 6 `#NOTE` text (G), and the two `#DATELINE|حاشية المحقِّق` lines (E, F) changed or were added.
- [ ] Every `⟦fn:…⟧` marker is still present; new ones are prefixed with your chunk letter; `<X>_fn.json` is valid JSON.
- [ ] Word count is within ±10% of the original chunk (A: the preface is counted separately).
- [ ] No modern knowledge in Saif's mouth (§8 table done). No «فاكتب» before ch. 34.
- [ ] Every scene Saif did not witness has a named source or is flagged as conjecture, once per scene.
- [ ] One "now" passage per leaf; the formula budget is respected; the heckler is used only where assigned.
- [ ] The hook is the last line of every chapter.
- [ ] No Ziedan words, names, or set pieces (§11). No satire aimed at religion.
