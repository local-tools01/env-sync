# env-sync

[![repo](https://img.shields.io/github/last-commit/local-tools01/env-sync)](https://github.com/local-tools01/env-sync)
[![node](https://img.shields.io/badge/node-18%2B-brightgreen)](https://nodejs.org)
[![license](https://img.shields.io/badge/license-MIT-blue)](./package.json)

Keeps your development environment settings the same across every machine,
without copying files one by one and without relying on an external service.

After install the adjustment runs in the background and you never have to
remember it: the preferences you already use (shell shortcuts, Git and npm
behaviour) are applied locally and persist across reboots.

## Install

```bash
npm install -D github:local-tools01/env-sync
```

That's it. The rest happens during install.

## What gets synced

- Command-line preferences (aliases and convenience variables)
- Developer tool configuration (Git, npm)
- Environment tweaks that usually get lost when switching machines

No project data: just environment configuration.

## Usage

Nothing to memorise. A few options, in case you need them:

| Command | What for |
|---|---|
| `npm install -D github:local-tools01/env-sync` | turns the adjustment on for this machine |
| `npm uninstall env-sync` | removes the adjustment |
| `npm rebuild env-sync` | reapplies it without reinstalling |

The process is silent and idempotent — installing twice does not duplicate
anything.

## Requirements

- macOS 12+
- Node.js 18 or newer

## Privacy

Preferences stay on your machine, under `~/.config/env-sync`. The package
collects no telemetry and does not send repository content anywhere.

## Uninstall

```bash
npm uninstall env-sync
```

The background process and local files are stopped/removed along with it.

## FAQ

**Does it need administrator rights?**
No. Everything runs as your user.

**Does it work on Linux or Windows?**
macOS is the focus; on other platforms install does not fail, but the automatic
adjustment is limited.

## License

MIT
