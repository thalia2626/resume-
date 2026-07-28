#!/usr/bin/env bash
# ============================================================================
#  CSCO Interview Gauntlet — local launcher (Linux / macOS)
#  Starts a local static web server for this folder and opens the game in your
#  default browser. No install step: uses whatever runtime you already have
#  (python3 -> python -> node -> php).
#
#  Usage:   ./play.sh            (from anywhere; it cd's to its own folder)
#  Stop:    press Ctrl+C
# ============================================================================
set -euo pipefail

# Always run from the directory this script lives in (the repo root).
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PORT="${PORT:-8000}"

# Find a free port starting at $PORT (best effort; falls back to $PORT).
find_free_port() {
  local p="$1"
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    if command -v nc >/dev/null 2>&1; then
      if ! nc -z localhost "$p" >/dev/null 2>&1; then echo "$p"; return; fi
    else
      # No nc: just trust the starting port.
      echo "$p"; return
    fi
    p=$((p + 1))
  done
  echo "$1"
}

PORT="$(find_free_port "$PORT")"
URL="http://localhost:${PORT}/index.html"

open_browser() {
  # Give the server a moment to come up, then open the default browser.
  sleep 1
  if command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL" >/dev/null 2>&1 || true
  elif command -v open >/dev/null 2>&1; then open "$URL" >/dev/null 2>&1 || true   # macOS
  elif command -v gio >/dev/null 2>&1; then gio open "$URL" >/dev/null 2>&1 || true
  else echo "Open this URL in your browser:  $URL"
  fi
}

echo "=================================================================="
echo "  CSCO Interview Gauntlet"
echo "  Serving:  $SCRIPT_DIR"
echo "  URL:      $URL"
echo "  Stop:     Ctrl+C"
echo "=================================================================="

open_browser &

if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  exec python -m http.server "$PORT" 2>/dev/null || exec python -m SimpleHTTPServer "$PORT"
elif command -v node >/dev/null 2>&1; then
  exec node ./serve.js "$PORT"
elif command -v php >/dev/null 2>&1; then
  exec php -S "localhost:${PORT}"
else
  echo "ERROR: No runtime found to serve files (need python3, python, node, or php)." >&2
  echo "Install Python 3 (https://www.python.org/downloads/) and re-run ./play.sh" >&2
  exit 1
fi
