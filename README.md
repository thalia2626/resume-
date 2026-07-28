# 🎯 CSCO Interview Gauntlet — start here

**You are on the `exam-prep` branch.** This branch is an offline practice game:
**300 Chief Supply Chain Officer interview questions** turned into a 19-stage
multiple-choice gauntlet. Clear each stage to unlock the next; get an answer right
and it turns green with an explanation, get it wrong and it turns red
("Incorrect, try again"). Finish all 19 stages to win.

> This is a branch of Thalia Salguero's résumé repo. The public résumé lives on the
> `master` branch at **https://thalia2626.github.io/resume-/** and is **not** affected
> by anything here. The game lives in the **`game_supply_chain/`** folder.

---

## ▶️ How to start the game (2 steps)

You run this on **your own computer** — it opens a small local web page you play in
your browser. Nothing is installed and nothing goes online.

### Step 1 — get this branch

```bash
git clone https://github.com/thalia2626/resume-.git
cd resume-
git checkout exam-prep
```

*(Already have the repo? Just: `git fetch origin exam-prep && git checkout exam-prep && git pull`)*

### Step 2 — run one command

| Your computer | Command |
|---|---|
| **macOS / Linux** | `cd game_supply_chain && ./play.sh` |
| **Windows** | open the `game_supply_chain` folder and double-click **`play.bat`** |

A small local address will appear and your browser opens to it automatically:

## 👉 http://localhost:8000/index.html

That's the game. **Play right there in the browser.** When you're done, press
**Ctrl + C** in the terminal window to stop it.

> No Python/Node/PHP? The launcher will tell you to install **Python 3**
> (<https://www.python.org/downloads/> — on Windows, tick *"Add Python to PATH"*),
> then run the command again.

---

## 🙋 Don't want to use a terminal? Just tell Claude to do it

If typing commands isn't your thing, you can have **Claude do all of it for you** —
but it has to be **Claude Code** (the app that runs in a terminal on your computer),
**not** the Claude website. Here's exactly what to do:

**1.** Open **Claude Code** in a terminal, in the folder where you keep (or want) this project.

**2.** Copy and paste this message to Claude, word for word:

> Please get the `exam-prep` branch of the `thalia2626/resume-` repo (clone it if it
> isn't here yet), then start the CSCO Interview Gauntlet game locally and open it in
> my browser so I can play. It's in the `game_supply_chain` folder — run its launcher,
> tell me the local URL, and leave the server running.

**3.** When Claude gives you a link like **http://localhost:8000/index.html**, click it
and play. When you're finished, tell Claude **"stop the server."**

That's the whole thing — you paste one message, Claude handles the git and the server,
and you just play in your browser.

---

## 🤖 Running this with Claude? Read this first

**This must be done with _Claude Code_ (the terminal / CLI app) — _not_ the web
app at claude.ai.**

Starting this game requires actions the web chat cannot do:

- run shell commands (`git checkout`, start a local web server),
- serve files from this folder over `http://localhost`, and
- open a browser tab to that local address.

Only **Claude Code running in a terminal on the user's machine** can do those. If you
are the web-based Claude, you cannot start this game — tell the user to open **Claude
Code** in a terminal (or run the two steps above themselves).

### Exact steps for Claude Code (deterministic — do not guess)

```bash
# 1. Be on the exam-prep branch (clone first if the repo isn't present).
git fetch origin exam-prep
git checkout exam-prep
git pull --ff-only origin exam-prep

# 2. Serve the game folder and open it. Prefer whatever runtime exists.
cd game_supply_chain
./play.sh            # macOS/Linux  (Windows: run  play.bat)
```

`play.sh` / `play.bat` start a static server rooted at `game_supply_chain/` and open
the default browser to `http://localhost:8000/index.html`. Success = the browser
shows the **Stage Map** (19 stages, Stage 1 unlocked, the rest locked).

To verify headlessly instead of opening a browser: after the server is up,
`GET http://localhost:8000/index.html` and `GET http://localhost:8000/questions.js`
should both return `200`. Runtime state is exposed on `window.__GAUNTLET__`.

> The game must be served over **http** (the launcher does this). Opening
> `index.html` as a `file://` path will not load the question bank in some browsers.

---

## 🎮 How it plays

- **19 stages**, one per interview domain, played in order. A stage unlocks only after
  you clear the one before it — the final stage is reachable only after all the rest.
- **One correct answer per question.**
  - ✅ **Correct** → green + a pop-up explaining *why* it's the strong answer → next question.
  - ❌ **Wrong** → red + *"Incorrect, try again"* (no explanation) → pick again.
- **Finish all 19 stages** to unlock the closing message.
- **Progress is saved** in your browser, so you can stop and come back. **Reset** starts over.

---

## 📁 What's in `game_supply_chain/`

| File | Purpose |
|---|---|
| `index.html` | The game (engine + UI). |
| `questions.js` | 300 multiple-choice questions with explanations, across 19 stages. |
| `play.sh` / `play.bat` | One-command launchers (macOS/Linux and Windows). |
| `serve.js` | Tiny Node fallback server (used only if Python/PHP aren't available). |
| `interview.txt` | The original 300-question source bank. |
| `tests/test_bank.mjs` | Test suite for the question data + stage logic (`node tests/test_bank.mjs`). |
| `prd.json` | Product requirements for the build. |

---

## 🔧 Troubleshooting

- **"No runtime found to serve files"** → install Python 3 and re-run the launcher.
- **Port 8000 busy** → `PORT=8080 ./play.sh` (macOS/Linux), or edit the `PORT` line in `play.bat` (Windows).
- **Browser didn't open** → open the URL the launcher printed (`http://localhost:<port>/index.html`).
- **Blank stage map / "question bank failed to load"** → you opened it as `file://`; use the launcher so it's served over `http`.

---

*Built for Thalia Salguero — Chief Supply Chain Officer interview preparation.
Bilingual (English / Spanish) · Federal-contracting ready · NAICS 541614.
Public résumé (unaffected by this branch): https://thalia2626.github.io/resume-/*
