# CSCO Interview Gauntlet 🎯

An offline, single-folder quiz game built from **300 Chief Supply Chain Officer
interview questions** (19 domains). Each domain is a **stage** you must clear to
unlock the next. Every question is multiple-choice with **exactly one correct
answer**: pick right and it turns **green** with an explanation of *why*; pick
wrong and it turns **red** — "Incorrect, try again" — and you keep going until you
get it. Clear all 19 stages to finish.

> This is the **`exam-prep`** branch. The game lives here, not on `master`.

---

## ▶️ Quick start (for a human)

**1. Get this branch**

```bash
git clone https://github.com/thalia2626/resume-.git
cd resume-
git fetch origin exam-prep
git checkout exam-prep
```

If you already have the repo cloned, just:

```bash
git fetch origin exam-prep && git checkout exam-prep && git pull
```

**2. Launch the game (one command)**

| Platform | Command |
|---|---|
| **Windows** | double-click **`play.bat`** — or in a terminal: `play.bat` |
| **macOS / Linux** | `./play.sh` |

That's it. A small local web server starts and your **default browser opens
automatically** to the game (e.g. `http://localhost:8000/index.html`). Play there.
Press **Ctrl+C** in the terminal window to stop the server when you're done.

No installs required — the launcher uses whatever you already have
(**Python**, then **Node**, then **PHP**). If none are present it tells you to
install Python 3 from <https://www.python.org/downloads/> (on Windows, check
"Add Python to PATH").

---

## 🤖 Instructions for an AI agent (e.g. Claude) — run the game end-to-end

Execute these steps in order from a shell. This is deterministic; do not guess.

```bash
# 1. Ensure the exam-prep branch is checked out (clone first if needed).
git fetch origin exam-prep
git checkout exam-prep
git pull --ff-only origin exam-prep

# 2. Launch (choose the line matching the OS):
#    Linux/macOS:
./play.sh
#    Windows:
#    play.bat
```

What to expect / how to verify success:

- The launcher prints the URL it is serving, e.g. `http://localhost:8000/index.html`.
- It starts a static web server rooted at the repo folder and opens the default
  browser to that URL. The game's **Stage Map** (19 stages, stage 1 unlocked, the
  rest locked) is the success signal.
- The server runs in the foreground; it is stopped with **Ctrl+C**. If you need it
  in the background, launch it detached and poll the URL until it responds `200`.
- To drive/verify headlessly: after the server is up, `GET http://localhost:8000/index.html`
  and `GET http://localhost:8000/questions.js` should both return `200`. The game
  logic and data are exposed at runtime on `window.__GAUNTLET__` for inspection.

The game **must be served over http** (the launcher does this). Opening
`index.html` directly with a `file://` path will not load the question bank in
some browsers due to script-loading rules — always use the launcher.

---

## 🎮 How the game works

- **19 stages**, one per interview domain, played in order. A stage is a set of
  multiple-choice questions drawn from that domain's source questions.
- **Locked progression:** stage *N + 1* unlocks only after you clear stage *N*.
  The final stage is reachable only after clearing all the ones before it.
- **One correct answer per question.**
  - ✅ **Correct** → the option turns green and a pop-up explains *why* it's the
    strong answer. Advance to the next question.
  - ❌ **Wrong** → the option turns red and a pop-up says *"Incorrect, try again"*
    with **no** explanation. Pick again until you get it.
- **Finish** all 19 stages to unlock the closing message.
- **Progress is saved** in your browser (localStorage), so you can close and come
  back. Use **Reset** to start over.

---

## 📁 What's in this folder

| File | Purpose |
|---|---|
| `index.html` | The game (engine + UI). Open via the launcher. |
| `questions.js` | The question bank: 19 stages, 300 multiple-choice items with explanations. |
| `play.sh` | One-command launcher for macOS / Linux. |
| `play.bat` | One-command launcher for Windows. |
| `serve.js` | Tiny Node fallback server (used only if Python/PHP aren't available). |
| `interview.txt` | The original 300-question source bank the game is built from. |
| `prd.json` | Product requirements driving this build. |

---

## 🔧 Troubleshooting

- **"No runtime found to serve files"** → install Python 3
  (<https://www.python.org/downloads/>; on Windows tick *Add to PATH*), reopen the
  terminal, and re-run the launcher.
- **Port 8000 in use** → set another port: `PORT=8080 ./play.sh` (macOS/Linux), or
  edit the `PORT` line at the top of `play.bat` (Windows).
- **Browser didn't open** → open the URL the launcher printed
  (`http://localhost:<port>/index.html`) manually.
- **Blank stage map / "question bank failed to load"** → you opened the file with
  `file://`. Use the launcher so it's served over `http`.

---

*Built for Thalia Salguero — Chief Supply Chain Officer interview preparation.
Bilingual (English / Spanish) · Federal-contracting ready · NAICS 541614.*
