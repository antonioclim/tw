# Seminar 3 — Practical Functional Patterns in Node.js

_Repository scaffold generated from uploaded package on 2025-10-14 08:48:46._

> **Purpose.** This seminar consolidates functional processing patterns in JavaScript/Node.js—mapping, filtering and reduction over arrays and objects; robust string handling with regular expressions and internationalisation; streaming over large inputs; and small, testable CLIs. The materials are organised as short, composable scripts (*A–…*) with didactic variations and optional lab sheets.

## Repository layout (overview)

Below is a high‑level catalogue inferred from the uploaded archive:

| Folder | Topic | Files |
|---|---|---:|
| `S3-Appendix` | S3-Appendix | 1 |
| `S3-Laborator` | Lab Sheets / Tests | 57 |
| `S3-Teorie` | S3-Teorie | 1 |


### File tree (abridged)

```text
  - APPENDIX 1 - Ce este și când folosim „use strict” în JavaScript.pdf
  - S2verB (nextlab but simplier) Funcții și Array-uri în JavaScript.pdf
  - S2verC (nextlab) Funcții și Array‑uri în JavaScript – Prelucrare Funcțională a Datelor.pdf
    - 1wordsfilter (A–F)_analysis.html
    - 1wordsfilterB.js
    - 1wordsfilterC.js
    - 1wordsfilterD.js
    - 1wordsfilterE.js
    - 1wordsfilterF.js
    - 1wordsfiltersA.js
    - Laborator_Filtrare_Cuvinte_Unicode.docx
    - README_1wordsfilter (A–F).md
    - 2squareDimA.js
    - 2squareDimB.js
    - 2squareDimC.js
    - 2squareDimD.js
    - 2squareDimE.js
    - 2squareDim_analysis.html
    - 2squareDim_version_forBigData.zip
    - README_2squareDim_analysis.md
    - 3formatterA.js
    - 3formatterB.js
    - 3formatterC.js
    - 3formatterD.js
    - 3formatterE.js
    - 3formatterF.js
    - 3formatter_analysis.html
    - Laborator_Formatter_Regex_Escapari_Intl.docx
    - README_3formatter_analysis.md
    - 4mapmulA.js
    - 4mapmulB.js
    - 4mapmulC.js
    - 4mapmulD.js
    - 4mapmul_analysis.html
    - Laborator_Map_Filter_Reduce_TypedArray_BigInt.docx
    - README_4mapmul_analysis.md
    - 5acrostihA.js
    - 5acrostihB.js
    - 5acrostihC.js
    - 5acrostihD.js
    - 5acrostihE.js
    - 5acrostihF.js
    - 5acrostihG.js
    - 5acrostihH.js
    - 5acrostih_analysis.html
    - Laborator_Acrostih_Unicode_Streaming.docx
    - README_5acrostih_analysis.md
    - 6keys&filtersA.js
    - 6keys&filtersB.js
    - 6keys&filtersC.js
    - 6keys&filtersD.js
    - 6keys&filtersE.js
    - 6keys&filtersF.js
    - 6keys&filtersG.js
    - 6keys&filtersH.js
    - 6keys_filters_analysis.html
    - Laborator_Keys_Filters_Predicate_Path_Unicode_NDJSON.docx
    - README_6keys_filters_analysis.md
  - S2verA (teorie) Funcții și array-uri (Filter, Map, Reduce și altele).pdf
```

## Prerequisites

- **Node.js 18+** (for modern `Intl`, Unicode property escapes, and `node:test`).
- A shell (Bash/PowerShell) and a UTF‑8 capable editor.

## Quick start

```bash
# 1) Install Node.js 18+ (if needed)
node -v

# 2) Run a topic folder end‑to‑end (example shown for “3formatter”)
cd 3formatterA-F
for f in 3formatter*.js; do echo "== $f =="; node "$f"; done

# 3) Run a CLI example (Formatter — JSON input)
node variations/3formatterJ_cli.js \
  --tpl="£{0|number:en-GB} on {1|date:en-GB}" \
  --argsJson='[1234567.89,"2024-01-23T00:00:00Z"]'

# 4) Stream large inputs (NDJSON filter)
node variations/6keys&filtersN_stream_ndjson.js \
  --file=dataset.ndjson \
  --criteria='{"ram":{"$gte":8},"brand":{"$in":["HP","Lenovo"]}}'
```

## Modules (didactic focus)

### Words Filter (`1wordsfilterA-F`)
- Predicate design over arrays of strings; case sensitivity; Unicode normalisation in variations (`G`–`L`).
- **Run:** `for f in 1wordsfilter*.js; do node "$f"; done`

### Square Areas (`2squareDimA-E`)
- `map`→`reduce` pipelines vs. single‑pass reductions and `for` loops; streaming & async iterators for large files (variations `J`–`K`).
- **Run:** `for f in 2squareDim*.js; do node "$f"; done`

### String Formatter (`3formatterA-F`)
- Placeholder substitution with `/\{(\d+)\}/g`, named keys, padding/alignment, brace escaping, and `Intl.*` hooks for numbers/dates.
- **Run:** `for f in 3formatter*.js; do node "$f"; done`

### Map × Multiply (`4mapmulA-D`)
- Functional vs. imperative mapping; `TypedArray` and `BigInt`; micro‑benchmarks.
- **Run:** `for f in 4mapmul*.js; do node "$f"; done`

### Acrostic Builder (`5acrostihA-H`)
- `map`→`join` over words; Unicode tokenisation with `\p{L}+`; streaming line‑by‑line; detection of target acrostics.
- **Run:** `for f in 5acrostih*.js; do node "$f"; done`

### Object Filtering by Keys (`6keys&filtersA-H`)
- Filtering arrays of objects with `filter` + `every`, predicates in criteria, dot‑path keys, locale‑aware comparisons, **NDJSON streaming**.
- **Run:** `for f in 6keys\&filters*.js; do node "$f"; done`

## Learning outcomes

- Recognise and apply **functional data‑flow** (`map`, `filter`, `reduce`) and their imperative counterparts.
- Design **robust predicates** and comparison policies (strict equality, locale‑aware, regex, predicate‑valued criteria).
- Use **regular expressions** and Unicode features safely in text processing.
- Apply **streaming** patterns (`readline`, async generators) for large datasets with `O(1)` additional memory.
- Build **minimal CLIs** for reproducible batch processing.

## Suggested seminar exercises

1. Rewrite a two‑phase `map`→`reduce` into a **single‑pass** reduction; compare allocations.
2. Extend the formatter to support `{key|number:en-GB}` and `{key|date:en-GB}`.
3. Implement a tolerant, locale‑aware equality (`NFD` + remove `\p{M}+`) in the object filters.
4. Stream a 5M‑line NDJSON file and select rows with `ram ≥ 8` and brand in `{HP, Lenovo}`.
5. Detect whether a multi‑line poem encodes a given **acrostic**.

## References (APA, 7th ed.)

- Dean, J., & Ghemawat, S. (2008). MapReduce: Simplified data processing on large clusters. *Communications of the ACM, 51*(1), 107–113. https://doi.org/10.1145/1327452.1327492
- IEEE. (2019). *IEEE Standard for Floating‑Point Arithmetic (IEEE Std 754‑2019).* https://doi.org/10.1109/IEEESTD.2019.8766229
- Thompson, K. (1968). Regular expression search algorithm. *Communications of the ACM, 11*(6), 419–422. https://doi.org/10.1145/363347.363387
- Bray, T. (2017). The JavaScript Object Notation (JSON) Data Interchange Format (RFC 8259). RFC Editor. https://doi.org/10.17487/RFC8259
- Yergeau, F. (2003). UTF‑8, a transformation format of ISO 10646 (RFC 3629). RFC Editor. https://doi.org/10.17487/RFC3629