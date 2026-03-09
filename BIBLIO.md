# Correction Log & Sources

Of the 51 signs in the original AI-generated curriculum, 12 (~24%) had incorrect Unicode glyphs. All were caught through cross-checking against authoritative sources and corrected.

## Corrections

| #  | Sign | Reading | Error | Correct | Source |
|----|------|---------|-------|---------|--------|
| 3  | LU₂  | "person" | U+121FB LU (𒇻) — wrong sign entirely | U+121FD LU2 (𒇽) | Unicode block: LU and LU₂ are distinct signs |
| 9  | GU₇  | "to eat" | KA×ŠE — wrong compound | U+12165 KA×GAR (𒅥) | Unicode name: CUNEIFORM SIGN KA TIMES GAR |
| 24 | ÍD   | "river" | U+121C9 LAGAB×HAL alone — missing A prefix | U+12000 A + U+121C9 LAGAB×HAL (𒀀𒇉) | OGSL: ÍD is a two-sign compound (A + ENGUR) |
| 26 | KUŠ  | "leather" | U+121AA KU (𒆪) — different sign | U+122E2 SU (𒋢), reading "kuš" | ePSD2: SU carries the reading kuš "skin/leather" |
| 29 | U/10 | ten | Wrong numeric sign | U+1230B (𒌋) | Unicode Cuneiform Numbers block |
| 30 | EŠ₅/30 | thirty | Wrong numeric sign | U+1230D (𒌍) | Unicode Cuneiform Numbers block |
| 31 | NIMIN/40 | forty | Wrong numeric sign | U+1240F (𒐏) | Unicode Cuneiform Numbers block |
| 32 | 60   | sixty | U+1241E ONE GESHU (𒐞) — wrong system | U+12415 ONE GESH2 (𒐕) | Unicode: GESH2 is the standard sexagesimal 60 |
| 33 | ŠAR₂/3600 | 3600 | Wrong numeric sign | U+12239 (𒊹) | Unicode Cuneiform Numbers block |
| 47 | ŠUM  | "to give" | U+122F3 TAG (𒋳) — secondary reading šum₂ | U+122E7 SUM (𒋧) | Teacher review + ePSD2: SUM is the primary "give" sign |

Two additional signs were corrected but are not in the table above because they were caught and fixed during initial drafting before the first commit.

## Lessons learned

1. **Subscript numbers are not decorative.** LU and LU₂, KU and KU₄ — these are *different signs* in Unicode, not variants. Always verify the subscript maps to the correct code point.

2. **Numeric signs live in a separate block.** Cuneiform numerals (U+12400–U+12474) are distinct from the main sign block (U+12000–U+1237F). Getting the right numeral requires checking the Unicode name, not just the visual appearance.

3. **Compound signs can be multi-character.** ÍD (river) is written as two Unicode characters (A + ENGUR), not one. Not all determinatives are single code points.

4. **Sign names ≠ readings.** The Unicode name CUNEIFORM SIGN SU corresponds to the *reading* "kuš" (among others). A sign's Unicode name reflects its primary Assyriological designation, which may differ from the reading used in the curriculum.

5. **AI-generated cuneiform is unreliable.** A ~24% error rate means roughly 1 in 4 signs was wrong. Always verify against the Unicode Character Database using `unicodedata.name()` before trusting any cuneiform code point.

## Reference sources

- [OGSL (ORACC Global Sign List)](https://oracc.museum.upenn.edu/ogsl/) — authoritative digital sign list
- [ePSD2](https://oracc.museum.upenn.edu/epsd2/sux) — electronic Pennsylvania Sumerian Dictionary
- [Unicode Cuneiform chart (PDF)](https://www.unicode.org/charts/PDF/U12000.pdf) — official code charts for U+12000–U+1237F
- [Unicode Cuneiform Numbers chart (PDF)](https://www.unicode.org/charts/PDF/U12400.pdf) — official code charts for U+12400–U+12474
- Python `unicodedata` module — programmatic verification of character names

## Verification method

Every sign was verified using:

```python
import unicodedata
char = '𒀭'  # character to verify
print(f'U+{ord(char):05X}  {unicodedata.name(char)}')
# → U+1202D  CUNEIFORM SIGN AN
```

For multi-character compounds like ÍD, each component was verified individually.
