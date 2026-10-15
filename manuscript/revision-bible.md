# دليل المراجعة المشترك — رواية «أرصادٌ وأَطْوار: سِرُّ الحاكم»

You are one of seven editors revising an Arabic literary novel in parallel. Each editor gets one contiguous chunk. Read this whole file first, then your chunk, then apply the author's requests below to YOUR chunk only, keeping continuity with the facts fixed here (other editors rely on them).

## The author's requests (verbatim, Arabic)
ابقِ اسم يونس كرم، واستخدم ٣ مارس ١٣٣٨ ق.م ... اختصر دون الإخلال بالمحتوى ... اجعل مقابلة سيف والحاكم فوق الجبل أكثر دراميّة وحديث قويّ وحوار رفيع ... اجعل سيف يستخدم محبرة الحاكم ليجد أنّ فيها سرًّا ... الجزء بتاع الجرّة لخاي اختصره ... اجعل من ضمن الشخصيات امرأةً وأدخلها في الدراما، إنها تحبّ سيف ... اختم كلّ فصل بإثارة ... اجعل كسوف زودياك دندرة أحد العلامات ... نهاية الرواية لا تعجبني: اجعل لقاء يونس بالحاكم العربي أكثر إثارة وأكشن، أسقط الرواية على موت حاكمٍ عربي في آخرها ... اجعل الحمار لونه رماديًّا ... تكلّم عن حلم العزيز بالله بالكسوفات واستدعائه لابن يونس وخوفه على ابنه الحاكم عندما كان في الخامسة ... أدخل أمّ الحاكم في الرواية في موقفين أو أكثر ... أكثر قليلًا من الأسلوب الساخر.

## Global rules for every editor
1. **Shorten without losing content.** Cut repetition, over-explanation, duplicated beats, padded narrator asides, sentences that restate what the scene already showed. Keep every plot event, every historical fact, every named character, every image/footnote. Target: your chunk's final length ≈ 80–85% of its original word count *including* any new material you add (exceptions: chunk F and G may stay near 100% because they receive big new scenes; chunk E's jar part should shrink a lot).
2. **End EVERY chapter (#CH) with a hook** — a reveal, threat, arrival, unanswered question, a sharp last line. Vary them; no cheap repeated formula. Also the diary intros (#INTRO sections) should end with a pull forward.
3. **A little more satire.** The narrator's dry, ironic voice already exists (e.g. «لأنّ هذا ما تفعله النساءُ في الروايات»). Add a few more sly, witty asides about bureaucracy, power, courtiers, scholars, modern officialdom — light touch, never slapstick, never mocking religion.
4. **Style.** Literary Modern Standard Arabic narration; dialogue of common Egyptians may be Egyptian colloquial as already used; court/scholarly dialogue in elevated fusha. Keep the existing diacritics habits. Keep the short-paragraph rhythm.
5. **Donkey «القمر» is GREY (رماديّ) everywhere**, never white. Its name: grey like the true face of the moon (القمرُ في حقيقته رماديٌّ كما يعرفه من نظر فيه بالآلة لا بعين الشعراء) — use this idea once, in the prologue/chapter 4; elsewhere just «حماره الرماديّ».
6. **Akhenaten's eclipse date is 3 March 1338 BC — «٣ مارس ١٣٣٨ ق.م»** (replace every «١٤ مايو ١٣٣٨»). Drop any Egyptian civil-month name (like «شمو») attached to it; say «في السنة السادسة عشرة من حكمه».
7. **Names.** The modern diarist/narrator is **يونس كرم** (abjad 386 = منصور). The Fatimid hero is **منصور بن سلامة → «سيف»** (renamed by Ibn Yunus in 389). Never call the modern man «سيف».

## Format rules (STRICT — a script parses the file)
- One paragraph per line. No markdown, no blank-line semantics needed (blank lines are ignored).
- Keep every line starting with `#` (structure markers like `#CH|n|title`, `#PART`, `#INTRO`, `#SUBHEAD|...`, `#DATELINE`, `#EPIGRAPH`, `#PROLOGUE`, `#FIN`, `#APPENDIX`, `#NOTE`, `#ENDPART`, `#SIGN`). Do not renumber chapters; you may retitle a chapter only if a new title is clearly better. You may add `#SUBHEAD|عنوان` lines.
- Keep every `@IMG|...` and `@USERIMG|...` line exactly (you may move it a few paragraphs within its chapter).
- `*` alone on a line = scene break.
- Footnote markers `⟦fn:key⟧` sit right after a word. Keep every existing marker. If you cut the sentence containing one, re-attach the same marker to the next mention of that term inside your chunk. You may ADD new footnotes for new scientific/historical terms: put `⟦fn:<CHUNKLETTER>_<shortkey>⟧` in the text and write their texts to `rw/out/<CHUNKLETTER>_fn.json` as a JSON object {key: "Arabic footnote text"}. Existing footnote texts are in `rw/footnotes_current.json` (read-only; for reference).

## Fixed facts for continuity (shared across chunks)

### New woman: «رَيحانة» بنت العطّار الشامي
- Daughter of «العطّار الشامي» of حارة الخرابة (he already appears in chapter 1, on the night of the mawlid). Born ~377هـ, two years younger than Saif. Sharp-tongued, quick, laughing, practical; she runs messages for Salama's «شبكة الرائحة» (the network of 182 women) and knows every alley in Fustat. She calls Saif «يا ابنَ النجوم» teasingly.
- She loves Saif from girlhood and never says it plainly. Saif's eyes are always on the sky — and, later, on Sitt al-Mulk. Khalid ibn Rif'at loves Rayhana; part of the poison behind his betrayal (chapter 12 «الوشاية») is jealousy at seeing her love for Saif (keep the existing motive too; add this as a second, human layer).
- **Chunk A (ch1–6):** introduce her (girl ~12, in her father's shop; runs a message for Salama; teases Saif; Khalid blushes around her). Small, vivid, 2–4 short appearances.
- **Chunk B (ch7–14):** she is ~18 in 395. A scene where she almost says it and he doesn't hear because he's counting stars. Khalid sees it. In ch14 «ليلة النهر» she is the one who gets Saif onto the boat south (through a boatman who owes her father), and presses into his hand **a small glass vial of her father's perfume (مسكٌ وقرنفل)**: «إذا شممتَه فاعرف أنّ في الفسطاط من يعدّ الأيام.» He doesn't understand.
- **Chunk C (ch15–19):** the vial once — in the dark of the Dendera crypts the smell steadies him / saves him (or he uses it to find his way back to an air-shaft). One message from her through the network.
- **Chunk D (ch20–23):** news of her via the network; she nurses Salama in her last illness and refuses every suitor. When Saif returns to Cairo (end of ch23 / the return), it is Rayhana who tells him Salama died, and gives him Salama's last words.
- **Chunk E (ch28–31):** in 411 the state seizes Rayhana as leverage (رشيد بن الحسن / ديوان الخبر, under orders that seem to come from the palace). That is the real reason Saif hands over «أرصاد وأطوار» and gives himself up («الاختيار»). Hook.
- **Chunk F (ch32–34):** the Caliph knows about her and uses her in the confrontation; part of the night's bargain is her release. In ch34 Sitt al-Mulk and Rayhana meet once (two women who loved the same man — dry, sharp, moving). At the end Saif finally says it to Rayhana (one line, earned). They leave together.
- **Chunk G (modern):** a faint echo only: Yunus Karam's mother's maiden family name in the old papers is «الشامي» — Yunus notices and does not comment. No more.

### Al-Aziz's eclipse dream (Chunk A, chapter 2)
- Around 380هـ (al-Hakim, then called المنصور, is five), Caliph al-Aziz bi-llah dreams repeatedly of the sun being eaten while a small boy stands in its shadow. He summons the young astronomer Ibn Yunus at night to the palace, asks him when the sun will next be eclipsed over Cairo and whether eclipses foretell the death of kings or harm to children. Ibn Yunus answers as a scientist (the eclipse is calculation, not omen) — but al-Aziz orders him to build the great zij (historically, Ibn Yunus began the Hakimi zij under al-Aziz and finished it under al-Hakim — keep this true). Al-Aziz's fear for his son is real and tender. The boy's mother is present behind a curtain — **Hakim's mother, scene 1** (see below). This scene plants why the Fatimid house cares about eclipses at all.

### Hakim's mother («أمّ الحاكم»)
- The novel already says (Sitt al-Mulk, ch11): she was «روميّةً صغيرةً غريبةً في القصر». In ch33 (Maqrizi) he «دخل على أمّه بعد العشاء» on the last night — she is alive in 411.
- **Scene 1 (Chunk A, ch2):** behind the curtain at al-Aziz's eclipse audience, holding the five-year-old; she asks Ibn Yunus one question in imperfect Arabic: «هل يكونُ ابني في الظلّ؟» — he gives a careful answer; she does not believe him. Plant it.
- **Scene 2 (Chunk A, ch4):** the night of Barjawan's murder (390), the 15-year-old caliph is going out to ride for the first time at night; his mother stops him in a corridor — a short, sharp exchange; he goes anyway. (She knows something about his nights.)
- **Scene 3 (Chunk F, ch33):** expand the existing Maqrizi scene «دخل على أمّه بعد العشاء» a little so it lands emotionally (echo her old question «هل يكون ابني في الظلّ؟»).

### Dendera zodiac eclipse = one of the SIGNS (Chunk C mainly)
- Real facts: the round zodiac ceiling of the Hathor temple at Dendera (removed to Paris in 1821, now in the Louvre; a cast is in place) shows **two eclipses**: a solar eclipse as a disc in which Isis holds a baboon by its tail (read by modern scholars as the eclipse of 7 March 51 BC), and a lunar eclipse as a disc containing the Eye of Horus (25 Sept 52 BC). Also, uniquely, **Cancer (السرطان) is displaced from the ring toward the centre**.
- Novel use: in ch17 «سقف دندرة», Bakhum shows Saif the eclipse disc and says it is not decoration but an appointment (ميعاد); the displaced Cancer points to the sign in which «the great shadow» will fall — and the 2 Aug 2027 eclipse indeed happens with the Sun in Cancer by the old star-reckoning. Saif realises the ceiling is a **sign**: like the Ibn al-Haytham sign (the face of the moon after a lunar eclipse), it tells him he is on the right road. Note the March echo: Akhenaten's eclipse 3 March 1338 BC, Dendera's 7 March 51 BC — Saif/Yunus notices the two Marches.
- Part-3 diary intro (Yunus in Dendera, Nov 2026): Yunus looks at the plaster cast and the eclipse disc; a hook.
- Chunk F/G: one callback each («كما في سقف دندرة»). In the inkwell plate (below) there is a tiny engraving of the Dendera eclipse disc.

### The Caliph's inkwell (الدواة) — the secret (Chunk F)
- Existing: on the last night a boy carried for the Caliph «دواةً من نحاس»; «ولم يُعثَر على الدواة». Explanation: the Caliph gave the inkwell to Saif on the mountain.
- Ch34: Saif writes with it; the ink runs out too soon for its size; he finds a **false bottom**. Under it, a thin silver plate engraved in the Caliph's own hand: the date «التاسع والعشرون من صفر سنة تسعٍ وأربعين وأربعمئة وألف», the line «المنصورُ = ٣٨٦ = المنصور», the single word «فاكتب», and a tiny engraving of the Dendera eclipse disc. Meaning: al-Hakim had computed the date himself, years before — he was Ibn Yunus's secret pupil; the whole hunt for «Mansur» was to force Saif to reach the number on his own. Saif copies the plate into his book (the manuscript Yunus later finds). Strong chapter hook.
- Chunk G: Yunus learns of the plate from the manuscript; «سموّه» wants it / wants the place.

### Ending (Chunk G, ch35–40): action, and the death of an Arab ruler
- «سموّه» = the unnamed ruler of a small rich unnamed Arab state (keep him fictional and unidentifiable; do not name any real country or person). His sister raised him («امرأة في مطار») — a mirror of Sitt al-Mulk and al-Hakim.
- Make it a thriller: Yunus is pulled in (pressure, surveillance, a forced flight / armoured convoy), discovers a palace plot (heir/security chief) to kill the ruler during the darkness of totality at Luxor, 2 Aug 2027; chase across the desert, the copper basin (الطَّست), drones, a race against the seconds; the sister as uneasy ally; during totality the ruler walks into the shadow like al-Hakim on the Muqattam — and dies (the official statement afterward: a stiff bureaucratic lie — satire). Mirror the prologue: what remains (his clothes? a stain? the dogs barking — ch40 «نباح», al-Hakim killed the dogs). Yunus survives and writes («فاكتب»). Final line strong.

## Return
When done, write your full revised chunk to `rw/out/<LETTER>.txt` (UTF-8). Then reply with ≤200 words: original vs new word count, main changes, any NEW names/dates/facts you introduced that other chunks should know, and new footnote keys.
