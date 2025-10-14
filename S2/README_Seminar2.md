# Seminar 2 — Functional Data Processing in Node.js

_Repository scaffold generated from the uploaded package on 2025-10-14 10:07:56._

> **Purpose.** This seminar advances the core functional patterns introduced earlier: expressive transformations with `map`, `filter`, and `reduce`; robust string handling (regex, Unicode); elementary numeric pipelines; and reproducible command‑line utilities. The code is structured into small, focused scripts (A–… series) with didactic variations and optional lab sheets.

## Repository layout (overview)

The table below reflects the top‑level folders detected in the archive:

| Folder | Topic | Files |
|---|---|---:|
| `S2-Appendix` | S2-Appendix | 13 |
| `S2-Scripts` | S2-Scripts | 25 |
| `S2-Teorie` | S2-Teorie | 1 |


### File tree (abridged)

```text
  - Segment 1ROpartB_ Intro în JS - Sintaxă, Funcții, Iterație și CLI.pdf
  - seminar2video1_explicatie_Node_argv_EDITAT.html
  - seminar2video1_explicatie_Node_argv_EDITAT.md
  - seminar2video2_explicativ_2adiv_variantsV2_EDITAT.html
  - seminar2video2_explicativ_2adiv_variantsV2_EDITAT.md
  - seminar2video3_explicativ_3occurences_EDITAT.html
  - seminar2video3_explicativ_3occurences_EDITAT.md
  - seminar2video4_Anexa_Teste_4arguments_EDITAT.html
  - seminar2video4_Anexa_Teste_4arguments_EDITAT.md
  - seminar2video5_explicativ_5prime_EDITAT.html
  - seminar2video5_explicativ_5prime_EDITAT.md
  - seminar2video6_explicativ_6freq_EDITAT.html
  - seminar2video6_explicativ_6freq_EDITAT.md
  - Segment 1ROpartC (nextlab)- Intro in JS (Paradigme, Recursivitate și Prelucrarea Textului).pdf
    - 1helloA.js
    - 1helloB.js
    - 2adiv.js
    - 2adivno0.js
    - 2adivshort.js
    - 3occurencesA.js
    - 3occurencesB.js
    - 3occurencesC.js
    - 3occurencesD.js
    - 4argumentsA.js
    - 4argumentsB.js
    - 4argumentsC.js
    - 4argumentsD.js
    - 4argumentsE.js
    - 4argumentsF.js
    - 5primeA.js
    - 5primeB.js
    - 5primeC.js
    - 5primeD.js
    - 5primeE.js
    - 5primeF.js
    - 6freqA.js
    - 6freqB.js
    - 6freqC.js
  - Segment 1ROpartA_nextlab_Intro în JS - Sintaxă, Funcții, Iterație și CLI.pdf
```

## Prerequisites

- **Node.js 18+** (Unicode property escapes, `Intl`, and the built‑in `node:test`).
- A shell (Bash/PowerShell) and a UTF‑8 capable editor.

## Quick start

```bash
# 1) Verify Node.js
node -v

# 2) Run all scripts in a module (example only)
cd 1wordsfilterA-F
for f in 1wordsfilter*.js; do echo "== $f =="; node "$f"; done

# 3) Try a CLI example (object filtering over NDJSON)
node variations/6keys&filtersN_stream_ndjson.js \
  --file=dataset.ndjson \
  --criteria='{"ram":{"$gte":8},"brand":{"$in":["HP","Lenovo"]}}'
```

## Module notes (per top‑level folder)

### `S2-Appendix`
- *Topic:* S2-Appendix
- *Tip:* check for `variations/` and `analysis/` sub‑folders for extended examples and lab sheets.


### `S2-Scripts`
- *Topic:* S2-Scripts
- *Tip:* check for `variations/` and `analysis/` sub‑folders for extended examples and lab sheets.


### `S2-Teorie`
- *Topic:* S2-Teorie
- *Tip:* check for `variations/` and `analysis/` sub‑folders for extended examples and lab sheets.


## Learning outcomes

- Apply **functional data‑flow** (`map`, `filter`, `reduce`) and reason about time/space complexity.
- Design **clear predicates** and comparison policies (strict equality, regex, locale‑aware, predicate‑valued criteria).
- Use **regular expressions** and Unicode safely in tokenisation and formatting.
- Employ **streaming** patterns for large inputs (NDJSON, line‑by‑line) with `O(1)` additional memory.
- Build small, **reproducible CLIs** around these pipelines.

## Suggested exercises

1. Convert a two‑phase `map`→`reduce` into a single‑pass reduction; contrast allocations.
2. Extend a formatter to support `{key|number:en-GB}` or `{i|date:en-GB}` using `Intl.*`.
3. Implement locale‑aware equality with NFD normalisation and removal of combining marks (`\p{M}+`).
4. Stream a NDJSON file and filter rows via a JSON criteria object containing `$in`, `$gte`, `$regex`.
5. Build a CLI that can accept either `--argsJson` (array) or `--namedJson` (object) and outputs JSON.

## References (APA, 7th ed.)

- Backus, J. (1978). Can programming be liberated from the von Neumann style? A functional style and its algebra of programs. *Communications of the ACM, 21*(8), 613–641. https://doi.org/10.1145/359576.359579
- Hughes, J. (1989). Why functional programming matters. *The Computer Journal, 32*(2), 98–107. https://doi.org/10.1093/comjnl/32.2.98
- Thompson, K. (1968). Regular expression search algorithm. *Communications of the ACM, 11*(6), 419–422. https://doi.org/10.1145/363347.363387
- Bray, T. (2017). The JavaScript Object Notation (JSON) Data Interchange Format (RFC 8259). RFC Editor. https://doi.org/10.17487/RFC8259
- Yergeau, F. (2003). UTF‑8, a transformation format of ISO 10646 (RFC 3629). RFC Editor. https://doi.org/10.17487/RFC3629