# CLAUDE.md — nyx@void portfolio

> Persistent instructions for Claude when editing this project.
> Goal: keep the terminal-researcher aesthetic intact while making it trivial to add new writeups, skills, CVEs, posts, and languages.

---

## 1. What this project is

A **multi-page personal portfolio + blog** for a fictional offensive-security researcher (`nyx@void`). It is currently **static, hand-written HTML** with inline `<style>` and `<script>` blocks — no build step, no framework. Every page is independently openable in a browser.

**Pages** (all in project root):

| File | Purpose |
|---|---|
| `portfolio.html` | Landing page · boot sequence · whoami · post grid |
| `writeups.html` | Filterable list of HTB / CTF / red-team writeups |
| `research.html` | Papers · CVEs · talks · disclosure policy |
| `tools.html`    | Published binaries with demo transcripts |
| `skills.html`   | Video-game-style talent tree (4 classes, branching paths) |
| `about.html`    | Recruiter-friendly: experience, languages, certs, contact |
| `rss.html`      | Subscribe page · feed preview |

A shared **nav + footer + statusbar** is duplicated across each page. When you add a page, update the nav in **all** files.

---

## 2. Visual system — DO NOT DRIFT

The aesthetic is the brand. Match it exactly.

### Color tokens (Catppuccin Mocha)
Defined inline in every page's `:root`. Always use these — never invent hex values.

```
--crust   #11111b   page background
--mantle  #181825   panel/card background
--base    #1e1e2e   nested card / inset
--surface0 #313244  status bar
--surface1 #45475a  borders, dividers
--text    #cdd6f4   primary text
--sub     #a6adc8   secondary text
--dim     #6c7086   muted text, line numbers
--mauve   #cba6f7   primary accent (links, hero, mastered)
--blue    #89b4fa   active nav, info, reversing
--peach   #fab387   warnings, exploit, args
--green   #a6e3a1   success, unlocked, prompts
--teal    #94e2d5   subtle accent, fuzzing
--yellow  #f9e2af   training, flags
--red     #f38ba8   critical, red-team, errors
```

### Typography
- **Mono** (default): JetBrains Mono — for everything terminal-feeling
- **Sans**: Inter — only for paper/talk/post titles inside cards
- **Never** use any other font family. Never increase the body size above 14px.

### Layout primitives
- `border-left: 2px solid var(--accent)` is the signature accent. Use it on cards, panels, sections.
- **Sharp corners only.** Border-radius ≤ 4px and only on top corners of card-style elements.
- **No drop shadows** except as glow on active/focused tree nodes.
- Nav bar is `sticky; top:0`, `max-width:1120px` (1200px on `skills.html`), centered, `padding:14px 28px`.
- Main content wraps in `<main>` with the same max-width and `padding: 40px 28px 80px`.

### Command-prompt header
Every page opens with a `.cmd` line — `nyx@void:~/path $ command --flag arg`. Color the parts:
`.u`=green, `.h`=mauve, `.d`=blue, `.arg`=peach, `.flag`=yellow.

### Voice / copy
- Lowercase, terse, technical. Em-dashes are fine. Avoid marketing speak.
- Tag scheme: `#hashtag-style` for skill tags; `▸` for section markers; `./` prefix for nav links.
- The footer always reads: `nyx@void  |  © 2026  |  built in vim, served from a pi`.

---

## 3. Adding content — the common operations

> Until/unless we migrate to Astro (§5), all content edits happen inside the relevant HTML file's `<script>` data block at the bottom. Search for `const DATA = [` / `const TOOLS = [` / `const CLASSES = [` to find them.

### Add a writeup
File: `writeups.html` → search `const DATA = [`.
Append an object with this shape:

```js
{
  id: "short-slug",
  dt: "2026-05-08",         // YYYY-MM-DD; sorted desc by default
  rt: "10 min",             // read time
  cat: "htb",               // htb | ctf | pro | rt
  catLabel: "htb",          // display label
  src: "HackTheBox",        // source platform / event
  diff: "hard",             // easy | med | hard | insane
  diffLabel: "hard",
  pts: 40,                  // points or null for red-team
  accent: "green",          // green | peach | red | blue
  title: "...",
  desc: "one-paragraph teaser",
  tags: ["windows","ad","kerberos"],
  tldr: { entry: "...", piv: "...", goal: "..." },
  term: [
    { t:"p",    s:"command line" },     // green prompt
    { t:"out",  s:"plain output" },     // dim
    { t:"hit",  s:"[+] interesting" },  // peach
    { t:"flag", s:"flag{...}" },        // red, terminal closer
  ]
}
```

If you introduce a new tag that should appear in the chip row, also add a `<span class="chip" data-tag="...">` near the top of the same file.

### Add a CVE
File: `research.html` → search for `<section class="cves">` and copy a `.row` block.
Severity classes: `crit | high | med | low`. Status spans use class `p` (patched / green), `e` (embargoed / yellow), `x` (other / dim).
Update the **stat strip** counters at the top of the page if you cross a threshold (e.g. CVE count goes from 7 → 8).

### Add a paper / talk
File: `research.html` → `.papers` section or `.talks` grid. Copy an existing `<article class="paper">` or `<article class="talk">` and edit. Pick an `--col:` token that matches the venue's vibe (mauve = top-tier, blue = academic, peach = offensive, teal = workshop).

### Add a tool
File: `tools.html` → search `const TOOLS = [`. Append:

```js
{ id, ver, lang, accent, cat,         // accent: peach|teal|mauve|blue|yellow|green
  ci: "pass" | "beta" | "archive",
  ciLabel, tags, updated, updatedRank, // updatedRank: lower = more recent
  stars, forks, issues, downloads,
  desc: "html allowed, use <span class='hl'>…</span> for emphasis",
  demo: [{t,s},…]                      // same vocabulary as writeups
}
```

For experiments, add a `.xp` card to the `.experiments` section. For archived tools, add a `.row` to the `.archive` table.

### Add a skill-tree node
File: `skills.html` → search `const CLASSES = [`. Each class has `origin` + `branches[]`. To add a node to a branch:

```js
{
  id: "be-newthing",
  label: "Display name",
  lvl: "L4",                              // L1..L5 | "origin" | "native" | "C1" etc.
  state: "training",                      // mastered | unlocked | training | locked
  parent: "be-rop",                       // id of an existing node — drives the link line
  desc: "html-allowed description; <span class='hl'>highlights</span>",
  tags: ["…"],
  proofs: ["CVE-…","./writeups link","talk title"],
  stat: { xp:"1,200", time:"2y" }
}
```

Layout is automatic — branches are positioned by their `labelX` percentage and nodes flow top-to-bottom inside each branch. Don't add a 4th branch unless you also rebalance `labelX` values (currently 18 / 50 / 82). Keep ≤ 6 nodes per branch or they crowd.

To add a **whole new class**, append to `CLASSES`. Update the HUD totals (talent points, mastered count) and the class tab `points` strings to stay honest.

### Add a language
**Two places** to update:
1. `about.html` → `.languages` section: copy a `.lang` block.
2. `skills.html` → `meta` class → `Languages` branch: append a node with `lvl: "B2"` (or whatever CEFR), `state` accordingly.

### Add a blog post
File: `portfolio.html` → search for the post grid (`<article class="post">` blocks). Copy one, edit metadata + body. Add to `rss.html` feed-listing if you want it surfaced there.

### Add a new top-level page
1. Copy the closest existing page as a template (preserve the nav / status / footer markup verbatim).
2. Add the new link to the nav in **every** other HTML file. The nav order is currently:
   `index · writeups · research · tools · skills · about · rss`
3. The new page's own nav `<a>` for itself uses `class="active"` + `href="#"`.

---

## 4. Code conventions

- **No frameworks.** Plain HTML + CSS + vanilla JS. Don't introduce React, Vue, jQuery, Tailwind, or build steps until §5 happens.
- **Inline `<style>` and `<script>`** at the bottom of each page is fine — these pages are self-contained on purpose.
- **Canonical HTML**: explicit closing tags, double-quoted attributes, no self-closing non-void tags.
- Use **`flex` / `grid` with `gap`** for any row of siblings. No bare inline siblings + margins.
- Keep shared CSS in sync — if you tweak the nav, statusbar, or footer in one file, mirror it in all.
- Filter & sort UIs follow a consistent pattern: a top-level `state = {}` object, a `render()` that re-templates from data, and event delegation on `.on` button groups.
- The **Catppuccin token names** are the only color vocabulary — never inline a hex.
- **Speaker notes / animations / decks**: this is not a deck; do not add slide infrastructure.

---

## 5. Future migration — Astro stack (when ready)

Recommended path when the site grows past comfortable hand-editing:

| Layer | Pick |
|---|---|
| SSG | **Astro** (HTML-first, zero-JS by default, Markdown content collections with Zod schemas) |
| Content | Markdown + frontmatter for posts/writeups · YAML for CVEs/skills/tools/talks/languages |
| Styling | Lift current CSS into `src/styles/global.css` — the tokens travel as-is |
| Search | **Pagefind** (static index, ~70KB) |
| Hosting | **Cloudflare Pages** (git-push to `main` → live in ~30s) |
| Comments | **giscus** (GitHub Discussions backend) |
| Analytics | **GoatCounter** or **Plausible** — privacy-first only |
| RSS | `@astrojs/rss` auto-generated from posts collection |
| Optional CMS | **Decap CMS** if you want a web editor; otherwise just vim |

**Proposed content layout:**

```
content/
├── posts/<slug>.md           # blog
├── writeups/<slug>.md        # body = boot-to-root narrative; frontmatter = metadata
├── cves.yaml
├── papers.yaml
├── talks.yaml
├── tools.yaml
├── experiments.yaml
├── skills/{binexp,netinfra,appsec,meta}.yaml
├── languages.yaml
├── experience.yaml
└── _embargoed.yaml           # git-crypt encrypted; merged at build only when present
```

**Embargo handling**: keep unpublished CVEs in a separate file encrypted with `git-crypt` or `age`. Public builds skip the file when the key isn't present, so leaks-by-merge are impossible.

**Migration order** (do not do this in one sitting):
1. `npm create astro@latest`, drop `global.css` in.
2. Port `Layout.astro` (nav + footer + statusbar) — this kills the duplication.
3. Port one page end-to-end (writeups is the best candidate — most data-driven).
4. Move each remaining page's data array into YAML/MD; render from typed collections.
5. Wire Pagefind + giscus + RSS feed.
6. Push, point Cloudflare Pages at the repo, done.

**Don't migrate prematurely.** The current static pages are perfectly acceptable until you have ≥ 15 writeups or ≥ 10 posts.

---

## 6. House rules for Claude

- **Match the aesthetic before extending it.** When asked for a new section/page, study an adjacent file first.
- **No emoji** in copy or UI. Use unicode glyphs (`▸ ★ ● ○ ⌬ ✦`) sparingly — they're already part of the system.
- **No filler content.** If a section feels empty, that's a layout problem; don't fabricate stats or quotes.
- **No gradients, no soft shadows, no rounded-pill buttons, no hero illustrations.** This is a terminal.
- **Lowercase copy by default**, except proper nouns and the occasional dramatic capital (`HIGH`, `CRITICAL` in the CVE table).
- **CVEs, talks, papers**: keep IDs and venue names plausible. Mark anything fictional in the commit message; don't claim real affiliation.
- **Embargoed items**: render the row but mask title/CVSS — never include the real details in HTML even as a comment.
- When the user adds a new writeup/CVE/skill, **also bump the relevant counter** on the stat strips so the numbers stay consistent with the lists.
- When making structural edits, **update all sibling pages' navs** in the same change so links don't rot.
- Prefer **`str_replace_edit`** over rewriting whole files. The pages are large; small surgical edits are safer.

---

## 7. Quick-reference: where things live

| Thing | File | Anchor |
|---|---|---|
| Nav links | every `*.html` | `<nav class="topnav">` |
| Color tokens | every `*.html` | `:root { --crust: … }` |
| Boot sequence | `portfolio.html` | `BOOT_LINES` array, `runBoot()` |
| Tweaks panel | `portfolio.html` | bottom `<script>` — toggle from toolbar |
| Writeup data | `writeups.html` | `const DATA = [` |
| Tool data | `tools.html` | `const TOOLS = [` |
| Skill data | `skills.html` | `const CLASSES = [` |
| CVE table | `research.html` | `<section class="cves">` |
| Experience timeline | `about.html` | `.timeline` markup |
| Languages | `about.html` + `skills.html` | `.languages` / Languages branch |
| RSS entries | `rss.html` | `.entries` markup |

---

End of CLAUDE.md. When in doubt, open `portfolio.html` and copy the pattern that's already there.
