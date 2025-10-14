# Seminar 1 — Introductory Functional Patterns in Node.js

_Repository scaffold generated from the uploaded package on 2025-10-14 10:59:33._

> **Purpose.** This first seminar introduces the core habits for writing clear, testable JavaScript/Node.js: small pure functions, immutable array transforms (`map`, `filter`, `reduce`), basic string processing, and simple CLIs. Folders are organised as short script series (A–…) accompanied by didactic variations.

## Repository layout (overview)

Top‑level folders detected in the archive:

| Folder | Topic | Files |
|---|---|---:|
| `S1-Appendix` | S1-Appendix | 6 |
| `S1-Laborator` | Lab Sheets / Tests | 13 |
| `S1-Teorie` | S1-Teorie | 1 |


### File tree (abridged)

```text
  - ##Seminar 1 - Web Fundamentals & HTML Essentials.pdf
  - 0a-Seminar0_Prolog_Setup_Ubuntu.md
  - 0b-PregatirePC_Prolog_Setup_Windows11_v2.md
  - PushGitscript.ps1
  - ps_command_history.ps1
  - seminar-0-prolog-complet.html
  - ##Seminar 1 –Modern JavaScript Syntax and Examples.pdf
    - __0a_salut.js
    - __0b_salutstud.js
    - __1introjs.js
    - 1_ping_pong.js
    - 1_ping_pong_explicatie.html
    - 1_ping_pong_explicatie.md
    - 1_ping_pong_tema_acasa.html
    - favicon.ico
    - __2var_types.js
    - __3letconstvar.js
    - __4obj_arrays.js
    - __5quiz_obj_arrays.js
  - Segment 1RO_ Intro în JS - Sintaxă, Funcții, Iterație și CLI.pdf
```

## Prerequisites

- **Node.js 18+** (Unicode property escapes, modern `Intl`, and built‑in `node:test`).
- A shell (Bash/PowerShell) and a UTF‑8 capable editor.

## Quick start

```bash
# 1) Verify Node.js
node -v

# 2) Run all scripts in a module (example only)
cd 1wordsfilterA-F
for f in 1wordsfilter*.js; do echo "== $f =="; node "$f"; done

# 3) Try a minimal CLI (if present)
node 3formatterF.js --tpl="this is a {0} string and we've {1} it" --args="nice,formatted"
```

## Module notes (per top‑level folder)

### `S1-Appendix`
- *Topic:* S1-Appendix
- *Tip:* check for `variations/` and `analysis/` sub‑folders for extended examples and lab sheets.

### `S1-Laborator`
- *Topic:* Lab Sheets / Tests
- *Tip:* check for `variations/` and `analysis/` sub‑folders for extended examples and lab sheets.

### `S1-Teorie`
- *Topic:* S1-Teorie
- *Tip:* check for `variations/` and `analysis/` sub‑folders for extended examples and lab sheets.

## Learning outcomes

- Understand and apply **pure functions** and **immutable** array workflows (`map`, `filter`, `reduce`).

- Write **clear predicates** and use appropriate comparison strategies (strict equality, regex where suitable).

- Employ **regular expressions** for elementary tokenisation and formatting tasks.

- Build **small CLIs** and compose shell commands to exercise scripts reproducibly.

## Suggested exercises

1. Implement a `filter` predicate that excludes a given word and enforces a minimum length; discuss complexity.

2. Compute areas of squares using `map`→`reduce` and then refactor to a single‑pass `reduce`.

3. Extend a basic formatter to support brace escaping (`{{`/`}}`) and verify with tests.

4. Compare `map` vs `for` loop on 10^6 elements and discuss allocations and readability.

## References (APA, 7th ed.)

- Backus, J. (1978). Can programming be liberated from the von Neumann style? A functional style and its algebra of programs. *Communications of the ACM, 21*(8), 613–641. https://doi.org/10.1145/359576.359579
- Hughes, J. (1989). Why functional programming matters. *The Computer Journal, 32*(2), 98–107. https://doi.org/10.1093/comjnl/32.2.98
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to algorithms* (4th ed.). MIT Press. https://doi.org/10.7551/mitpress/11838.001.0001