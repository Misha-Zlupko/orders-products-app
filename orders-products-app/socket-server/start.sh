#!/usr/bin/env sh
set -e
cd "$(dirname "$0")"
npm install --omit=dev
exec node index.js
