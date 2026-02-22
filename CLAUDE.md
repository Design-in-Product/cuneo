# CUNEO: Cuneiform Reader

A casual curriculum for learning cuneiform signs, built as a single-page HTML reference.

## Technical Accuracy

This is an educational tool. Technical accuracy of cuneiform signs is paramount — a wrong Unicode character teaches the wrong sign, which is worse than teaching nothing.

### Cuneiform character verification (REQUIRED)

When adding or modifying any cuneiform sign in this project, every Unicode character MUST be verified against the Unicode Character Database before committing. Do not trust memory or intuition for cuneiform code points — always confirm programmatically.

**Verification method:** Use Python's `unicodedata.name()` to confirm the Unicode character name matches the intended sign:

```python
import unicodedata
char = '𒀭'  # the character you want to verify
print(f'U+{ord(char):05X}  {unicodedata.name(char)}')
# Expected: U+1202D  CUNEIFORM SIGN AN
```

The Unicode character name must correspond to the sign's standard name (per Borger MesZL / ORACC Sign List). Be aware that:

- Unicode names use sign names (e.g., CUNEIFORM SIGN SAL), while the curriculum may use Sumerian readings (e.g., MUNUS). This is fine — one sign can have multiple readings.
- Subscript numbers in readings (e.g., LU₂, E₂, GU₇) often indicate *different signs* in Unicode (e.g., CUNEIFORM SIGN LU vs CUNEIFORM SIGN LU2). Do not confuse them.
- Compound signs (e.g., KA×GAR for GU₇) are single Unicode characters, not sequences.
- Numeric signs live in a separate Unicode block (U+12400–U+12474). Verify the numeric value matches (e.g., FOUR U = 40, not FIVE U = 50).

### Reference sources

- [ORACC Sign List (OSL)](https://oracc.museum.upenn.edu/osl/signlist/) — the authoritative digital sign list
- [ePSD2](https://oracc.museum.upenn.edu/epsd2/sux) — electronic Pennsylvania Sumerian Dictionary
- [Unicode Cuneiform chart (PDF)](https://www.unicode.org/charts/PDF/U12000.pdf) — official Unicode code charts
- Python `unicodedata` module — for programmatic verification

### When in doubt

If a sign's identity is uncertain or debatable among Assyriologists, note this explicitly in the curriculum rather than guessing. Scholarly honesty is better than false confidence.

## Project structure

- `index.html` — the complete single-page curriculum (signs 1–51, 7 batches)
