# Changelog — CSCO Interview Gauntlet

All notable changes to the game are recorded here. Versions follow semver.
The game lives on the `exam-prep` branch.

## [1.0.0] — 2026-07-28

First tagged release. Offline, single-folder browser quiz game.

### Added
- 300 Chief Supply Chain Officer interview questions across 19 domains, each a
  stage that must be cleared to unlock the next.
- Multiple-choice flow: correct answer turns green with a "why this is the
  strong answer" explanation; wrong answer turns red ("Incorrect, try again")
  and blocks advancement — no explanation leaked on a wrong pick.
- Stage map with lock/unlock progression and `localStorage` progress that
  survives a reload.
- Zero-install launchers: `play.sh` (macOS/Linux) and `play.bat` (Windows),
  with a Node fallback server (`serve.js`) — uses Python → Node → PHP.
- `walkthrough.mov` — video showing how to launch and play, linked from README.
- TDD suite (`tests/test_bank.mjs`, 2470 assertions, zero dependencies)
  validating the question-bank data contract and stage-unlock logic.

### Verified at release
- TDD suite green: 2470 / 2470 assertions passing.
- PRD reconciliation: all 9 user stories pass; delivery questions answered.
- E2E in a real browser: 19-stage map renders, wrong-answer path (red, blocked,
  no explanation), correct-answer path (green, explanation, next question).
- All static assets serve HTTP 200 via the launcher (index.html, questions.js,
  README.md, walkthrough.mov).
