# Revision brief 8 (binding)

## The situation
The author reviewed the novel and sent back his own version. `rw8/in/<X>.txt` is HIS text for your chunk: it is the BASE. Treat every sentence in it as the author's choice: do NOT shorten it, do NOT rephrase it, do NOT "improve" it.
`rw8/cur/<X>.txt` is our latest version of the same chunk, written before his review. Use it only as a quarry (see §1).
Write `rw8/out/<X>.txt`. If you add footnotes, write `rw8/out/<X>_fn.json` with lowercase keys prefixed `<x>8_`. Existing footnote texts are in `rw8/footnotes_current.json`.

## Fixed rules
- Narrator: the editor Yunus Karam, speaking in the third person about Saif. Saif is the axis of the story; his own voice appears only in short quotes from his leaves.
- Dialogue in the Fatimid and Akhenaten eras is in modern standard Arabic. Modern-era dialogue may be colloquial.
- Keep every `#`/`@` line and every `⟦fn:key⟧` marker.
- One paragraph per line. Each chapter's closing hook stays the last line.
- Any new term gets a footnote at its first occurrence.

## 1. Restore the twist material the base lacks (only content, never the trimming)
The author's base lacks some content from our last round (the substitute-king twist). Compare base and cur. Where cur has a twist-related passage that the base does not have, insert it at the matching place: copy it from cur, or adapt it so it reads smoothly against the base's wording.

**Twist content to check:**
- **A:**
  - The Harranian astrologer (زَهرون الحرّانيّ) proposes a substitute king to al-Aziz at the eclipse of 383. Al-Aziz answers «لا أُجلس على عرشي رجلًا لأقتله», and the boy hears it.
  - The `a7_shar_puhi` footnote.
  - The ambiguous renaming: «ولم يقل الشيخ لماذا سيفًا، ولماذا الليلة».
- **B:**
  - At the 394 eclipse, al-Hakim looks at Saif «كما يقيس الخيّاطُ رجلًا لثوبٍ ليس له».
  - «أريدهم أحياءً سالمين» in the census.
- **C:** «يُحفَظ ولا يُمَسّ» in Rayhana's message.
- **D:** «لماذا أرادهم الديوانُ أحياء».
- **E:**
  - The second meaning of «لم يكن يريد قتلك».
  - The ch. 31 hook «إنّ الظلَّ لا يقبل بديلًا».
- **F:**
  - The reveal on the mountain: the rite, the census, why Saif was kept alive, why Ibn Yunus renamed him.
  - The reason for the disappearance: the spirits of the Sun and the Moon, and the annular eclipse of 14 Feb 1021 that fell on the far southern sea (`f7_ecl1021`).
  - The dry blood of the substitute منصور بن شاكر.
  - The blue eye in the dark.
  - The ch. 34 end.
- **G — the whole new ending:**
  - «سموّه» wanted Yunus as his substitute (the shirt cut to his size).
  - The double was killed (the milk-brother).
  - The ruler vanished east; his convoy came back empty.
  - The sister knew.
  - The silver plate in his mother's tin box, and the «الشامي» lineage.
  - The unstamped postcard «أكنّا سنكون صديقين؟».
  - The prophetic verses in Yunus's hand (`#VERSE` lines; `g7_bahram`).
  - The appendix sentences.
  - Where the base's older ending contradicts these, the new ending wins. Keep every line the author wrote himself, such as his paragraph «بلّغ تحيّاتي لسيادته، وقل له ٧٦٧ عدد يقبل القسمة على ١٣…» and the one after it: polish its spelling and grammar lightly, keep its meaning.

If something is already present in the base (even in different words), do not duplicate it.

## 2. New author requests
- **(A and D) Ibn Yunus understood al-Hakim as Ibn al-Haytham did: «ليس يُجاري الجنونَ إلا الجنون».**
  - Ibn Yunus's notorious eccentricity was partly a mask: the tall tartour with the cloak over the turban, as al-Musabbihi described him, and the laughter in the streets. He wore it the way Ibn al-Haytham later wore feigned madness, because only madness can keep pace with madness at that court.
  - **A:** add it to the al-Musabbihi portrait in ch. 2, one short paragraph.
  - **D:** echo it once where Ibn al-Haytham's feigned madness appears. For example, Saif realises that his master had done the same for thirty years.
- **(B or C) A light link between Rayhana and «بدر البدور».**
  - Only a touch: the diwan's description of the night-walking woman who smells of musk fits Rayhana more than anyone knows, since she carries the network's messages at night, smelling of her father's musk and clove.
  - Or Saif notices that one detail in the file is hers.
  - Never explicit; one or two sentences. Chunk B places it in ch. 9 if the dossier is there; otherwise chunk C.
- **(F) A second eye on the mountain night: the eye of عامر القُرّيّ.**
  - Besides al-Hakim's blue eye, Saif sees another watcher in the dark, the Bedouin's, which he knew from the khan and the pyramid.
  - Amer had returned in secret to watch the end; he leaves no trace.
  - Keep it short and eerie.
- **(E or F) al-Hakim's accusation that men enter Sitt al-Mulk's rooms («يدخل عليها الرجال»).**
  - Historical reports (al-Maqrizi, Ibn al-Athir and others) say al-Hakim accused his sister of letting men in to her and threatened her; this pushed her toward the conspiracy.
  - Put it on al-Hakim's lips once: in the palace meeting or on the mountain (F), or as something Saif hears (E).
  - Let Saif or the narrator register its cruelty and its politics. Footnote it: what the sources say, and that the novel's use of it is its own.
- **(G) Two more verses about Egypt in the prophecy poem.**
  - Same metre and rhyme as the existing verses, placed among them.
  - They encode the author's numbers: ٧٦٧ divided by ١٣ = ٥٩ exactly; "this year became 13" (a turn of thirteen); and a warning to avoid «القسمة» (division — also partition or fate's lot) when the shadow comes, and not to seek a substitute, or not to bring him into the shadow.
  - Name Egypt poetically (مصر / الكنانة / أرض النيل).
  - Veiled, never naming a person.
  - Yunus may add one dry line noting that 767 ÷ 13 = 59 «بلا باقٍ», and that he does not know why he wrote it.

## Finish
Run a check script:
- base sentences preserved: nearly all base paragraphs must still appear unchanged, except the few you deliberately touched;
- markup kept;
- markers kept;
- new keys defined;
- no colloquial in historical dialogue.

Reply in ≤120 words.
