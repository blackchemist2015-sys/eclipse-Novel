# Term-definition audit (binding)

Input: `rw5/novel_in.txt` (the whole novel, markup format: `#…` structure lines, `@IMG…` lines, `⟦fn:key⟧` footnote markers placed right after a word) and `rw5/footnotes_in.json` (key → Arabic footnote text).

Author's request: «قم بتعريف الطالع والأحكام وأوّل ورود لأيّ مصطلح كما أنت» — every scientific, astronomical, astrological, historical, religious-institutional, Egyptological or technical term must be defined by a footnote AT ITS FIRST OCCURRENCE in reading order (the file order is the reading order; the back-matter is not in this file).

Do:
1. Build a list of terms that a general Arabic reader may not know. Must include at least: الطالع، أحكام النجوم (الأحكام)، الاختيارات (اختيار الساعات)، المنجّم vs. الفلكيّ (if useful)، الزيج (exists), حساب الجُمَّل (exists?), العقدتان/الجوزهر, المحاق, الاقتران/القِران, الخسوف/الكسوف (distinguish once), الإصبع (unit), الأسطرلاب, الحلقة النحاسيّة/الحلقة الاعتداليّة, الشاخص, الدقيقة/الدرجة, المنازل, الروحانيّات, الطلسم, ديوان الخبر, السِّجِلّ (الفاطميّ), الحاجب/الخصيّ in court use, المِشرَع, القرافة, الأشمونين, الجنادل, الهيراطيقيّة (exists), آتون, شِمُو etc. — plus anything else you find (aim for completeness, but don't footnote common words).
2. For each term: if the FIRST occurrence already carries a marker for it, fine. If a footnote for that term exists but is attached LATER, MOVE the marker to the first occurrence (keep the same key; do not duplicate). If none exists, add a new marker `⟦fn:t5_<shortkey>⟧` at the first occurrence and write its text (2–4 sentences, precise, neutral, sourced knowledge; for الطالع and الأحكام explain clearly what they are, how a طالع is cast — the ascendant degree of the ecliptic rising on the eastern horizon at a given moment, the twelve houses — and that judicial astrology is distinct from astronomy (الهيئة/الرصد)).
3. Never place a marker inside `#` or `@` lines; markers in the modern sections are fine if that is the first occurrence.
4. Do not change any other text.

Output: `rw5/novel_out.txt` and `rw5/footnotes_out.json` (full dict: existing + new; you may lightly improve an existing text only if it fails to define the term). Then run a check: every key used exists in the JSON; no key is used twice; all `#`/`@` lines unchanged; text identical to input except for marker insertions/moves (verify by stripping markers from both and comparing). Reply ≤120 words with the count of added and moved footnotes.
