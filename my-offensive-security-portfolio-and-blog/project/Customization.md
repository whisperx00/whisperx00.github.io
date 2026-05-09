# CUSTOMIZATION.md — replace nyx@void with my real profile

> One-time customization pass. Read CLAUDE.md first for architecture, then execute this.

## Identity replacement

Replace every occurrence of `nyx@void` and the fictional persona with:

- **Handle (terminal prompt):** `manoel@void` — keep the `void` host, swap the user
- **Display name:** Manoel Albino Coelho de Miranda
- **Title:** offensive security researcher
- **Focus:** windows & active directory
- **Location:** brazil — open to remote and relocation

The terminal prompt should now read: `manoel@void:~/path $ command --flag arg`

Footer becomes: `manoel@void  |  © 2026  |  built in vim, served from a pi`

## Per-page content rewrite

### portfolio.html (landing)
- Boot sequence: keep the aesthetic, edit copy lines that reference fictional history
- Whoami block: real bio (see "About copy" below)
- Post grid: empty it. Leave the grid markup in place but reduce to one or two `[REVISE: real post idea]` placeholders. Do NOT fabricate posts.

### writeups.html
- Empty the `DATA = [` array down to ONE real example writeup so the filtering UI still demos correctly. Use this seed entry, marked clearly as a placeholder I'll replace:
```js
  {
    id: "example-htb",
    dt: "2026-01-01",
    rt: "8 min",
    cat: "htb", catLabel: "htb",
    src: "HackTheBox",
    diff: "med", diffLabel: "med",
    pts: 30,
    accent: "green",
    title: "[REVISE: replace with first real writeup]",
    desc: "placeholder — replace with a real boot-to-root narrative",
    tags: ["windows","active-directory","kerberos"],
    tldr: { entry:"...", piv:"...", goal:"..." },
    term: [{ t:"p", s:"# placeholder" }]
  }
```
- Remove all other writeup entries.
- Update the stat strip counters at the top to reflect 1 writeup, 0 of every other category.

### research.html — RESTRUCTURE, do not just trim
This is the biggest change. The current page assumes published CVEs, papers, and a long talks history. I have none of that publicly.

- **Remove the CVE section entirely.** Findings at SiDi are under NDA — no public CVEs exist. Delete the `<section class="cves">` block and its stat strip counter.
- **Remove the papers section entirely.** No published papers.
- **Talks section:** reduce to ONE entry — "307 Conference — Browser Exploitation" with year placeholder `[REVISE: year]`. Use the `peach` accent (offensive).
- **Repurpose the page as "research interests"** rather than "research output." Add a new section above any remaining content titled `▸ active research interests` listing:
  - V8 / JerryScript fuzzing with Fuzzilli
  - MCP (Model Context Protocol) attack surface
  - Azure security (AzureHound, BloodHound CE)
  - AI/ML security
  Frame these as exploration, not expertise. One short paragraph each, with `[REVISE: ...]` placeholders where I should add concrete sub-questions I'm investigating.

### tools.html
Replace `TOOLS` array with my real projects:
```js
{ id:"burp-intruder-cli", ver:"0.1", lang:"react", accent:"blue",
  cat:"tooling", ci:"beta", ciLabel:"beta",
  tags:["burp","fuzzing","ffuf","hydra"],
  desc:"converts burp intruder configs into ffuf / hydra / wfuzz / curl commands",
  demo:[{t:"p", s:"# [REVISE: paste real demo transcript]"}],
  stars:0, forks:0, issues:0, downloads:0,
  updated:"[REVISE: date]", updatedRank:1 }

{ id:"ldap-parse", ver:"0.1", lang:"python", accent:"teal",
  cat:"tooling", ci:"beta", ciLabel:"beta",
  tags:["ldap","ad","enumeration","bloodhound"],
  desc:"parses raw ldap enumeration output for ad recon workflows",
  demo:[{t:"p", s:"# [REVISE: paste real demo transcript]"}],
  stars:0, forks:0, issues:0, downloads:0,
  updated:"[REVISE: date]", updatedRank:2 }
```
- Empty the `.experiments` section to one `[REVISE: ...]` card.
- Empty the `.archive` table (or leave one example row marked as placeholder).
- Update tools-page stat counters honestly (2 tools, 0 archived, etc.).

### skills.html — keep the talent tree, rebalance the classes
The video-game talent tree concept is good — keep it. But the four classes need to reflect MY profile, not the fictional one.

Replace `CLASSES` with these four:

1. **windows & active directory** (primary class — most nodes, mauve accent)
   - branch: ad attack chains (BloodHound, Kerberoasting, AS-REP, constrained delegation, Certipy ESC paths, GPO abuse via pyGPOAbuse, DCSync)
   - branch: windows privesc (token abuse, SeBackupPrivilege, JuicyPotato, RunasCs)
   - branch: pivoting (Chisel, proxychains, multi-hop, Ligolo-ng)

2. **web & client-side** (secondary, peach accent)
   - branch: web exploitation (LFI, SSTI, file upload bypasses, SQLi, path traversal)
   - branch: client-side (phishing campaigns — proof: SiDi phishing simulation project)
   - branch: linux privesc (SUID, sudo, capabilities, cron, kernel exploits)

3. **engineering** (differentiator, teal accent)
   - branch: languages (TypeScript, Python, React)
   - branch: tooling shipped (Burp Intruder CLI converter, ldap_parse.py, cheatsheets)

4. **meta** (smaller, blue accent)
   - branch: languages spoken (Portuguese native, English C1, French A2 learning)
   - branch: certifications (OSCP in progress — state: "training", NOT "mastered"; OSWP planned; OSAI planned — state: "locked")
   - branch: research interests (V8 fuzzing, MCP, Azure, AI/ML — all "training" or "locked", none "mastered")

**Honest state assignments:**
- `mastered`: only AD enumeration, Kerberoasting, Windows token abuse, Chisel pivoting, web LFI/file-upload, TypeScript, Python, Portuguese, English
- `unlocked`: most other AD/Windows/web items I've used in labs
- `training`: OSCP, French, anything I've touched but not internalized
- `locked`: OSWP, OSAI, V8 fuzzing, MCP research, Azure, AI/ML — anything aspirational

Update the HUD totals (talent points, mastered count, class points strings) to match the real node counts after rebalancing.

### about.html
Replace timeline / experience with ONE entry only:
```
SiDi — offensive security intern
[start: 2023] – [end: REVISE]
managed by marcus farbiarz, offensive security r&d manager
- security assessments of samsung products (android / web / windows)
- identified vulnerabilities including arbitrary file delete and privilege
  escalations on windows products
- participated in a phishing simulation project
- day-to-day: ad exploitation, windows privesc, web exploitation, custom tooling
```

Languages section:
- portuguese — native
- english — C1 / professional working
- french — A2 / learning (do NOT inflate)

Certifications section:
- OSCP — in progress (clearly marked, NOT listed as held)
- planned: OSWP, OSAI

Contact: replace all socials with `[REVISE: handle]` placeholders for email, github, linkedin, hackthebox.

### rss.html
Strip feed entries down to match writeups.html (one placeholder entry). Keep the page structure.

## What to REMOVE entirely from the entire site

Search and destroy across all pages:

- Any reference to public CVE numbers attributed to me
- Any "X years experience" counter where X > 2
- Any client-logo strip / "trusted by" section
- Testimonials sections (the LinkedIn rec lives on LinkedIn)
- Skill percentage bars or numeric ratings (the talent-tree levels L1–L5 are fine — that's part of the aesthetic, not a fluency claim)
- Bug-bounty hall-of-fame sections
- Any mention of fluency in more than 3 spoken languages
- Any line of marketing copy ("seasoned", "elite", "passionate about breaking things", "ethical hacker on a mission", "decade of experience")

## What to KEEP unchanged

- All CSS, color tokens, fonts, layout primitives — the aesthetic is exactly right
- The talent-tree skills.html mechanic (rebalance content, keep the system)
- The terminal-prompt header pattern on every page
- Boot sequence on portfolio.html (edit copy, keep the animation)
- Filter / sort UIs on writeups.html and tools.html
- Status bar, nav structure, footer pattern
- File names and the inline-style/script convention from CLAUDE.md §4

## Tone

- Match the existing voice: lowercase, terse, technical
- Where you're uncertain about a real fact, leave a `[REVISE: short note]` placeholder — never invent

## Final report

When done, output:
1. Every file modified
2. Every section removed and why
3. Every `[REVISE: ...]` placeholder grouped by file, so I have a checklist to fill in
4. Confirmation that no real CVE numbers, fictional employers, or invented stats remain
5. Counter-consistency check: every stat strip number matches the actual list length below it
