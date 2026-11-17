#!/bin/sh
# Double-click on macOS (or run ./start.command) to start the ATAP demo and open it in the browser.
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required (https://nodejs.org). Please install it and run this again."
  exit 1
fi
PORT="${PORT:-8080}"
( sleep 1 && open "http://localhost:$PORT" ) >/dev/null 2>&1 &
PORT="$PORT" node serve.js
