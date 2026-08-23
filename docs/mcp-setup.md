# MCP Setup — firstdata-website

Configuration for browser inspection, UI automation, Figma access, and pixel-level visual comparison on Windows.

## 1. MCP servers configured (project)

File: `.cursor/mcp.json`

| Server | Type | Package / URL |
|--------|------|----------------|
| `chrome-devtools` | local (npx) | `chrome-devtools-mcp@latest` |
| `playwright` | local (npx) | `@playwright/mcp@latest` |
| `figma` | remote HTTP | `https://mcp.figma.com/mcp` |

Global Cursor MCP (`%USERPROFILE%\.cursor\mcp.json`) was **not** modified. Existing global servers (including Dokploy and a global Figma entry) remain as they were.

## 2. Configuration file path

```
D:\project\firstdata-website\.cursor\mcp.json
```

## 3. Node.js and npm versions

| Tool | Version | Path |
|------|---------|------|
| OS | Windows 10 / 11 (10.0.26200) | — |
| Node.js | v25.8.1 | `C:\Program Files\nodejs\node.exe` |
| npm | 11.17.0 | `C:\Program Files\nodejs\npm.cmd` |
| npx | 11.17.0 | `C:\Program Files\nodejs\npx.cmd` |

## 4. Chrome detection result

| Browser | Result |
|---------|--------|
| Google Chrome | Found: `C:\Program Files\Google\Chrome\Application\chrome.exe` |
| Microsoft Edge | Found: `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` |
| `where chrome` / `where msedge` | Not on PATH (installers still present) |

## 5. Package validation result

| Command | Result |
|---------|--------|
| `npx -y chrome-devtools-mcp@latest --help` | Succeeded |
| `npx -y @playwright/mcp@latest --help` | Succeeded |

Standard `npx` spawn works on this machine. The Windows `cmd /c npx` fallback was **not** applied.

## 6. Visual testing dependencies installed

Package manager: **npm** (`package-lock.json`)

DevDependencies added:

- `@playwright/test`
- `pixelmatch`
- `pngjs`
- `sharp`

Chromium for Playwright: installed via `npx playwright install chromium` (browsers live under `%LOCALAPPDATA%\ms-playwright`).

Folder layout:

```
visual-tests/reference/
visual-tests/local/
visual-tests/diff/
visual-tests/overlay/
visual-tests/reports/
scripts/visual/
```

Ignored by git (captures stay local): `visual-tests/reference/`, `local/`, `diff/`, `overlay/`. Reports are not ignored.

## 7. Manual actions still required

1. **Fully restart Cursor** after editing `.cursor/mcp.json`.
2. Open **Cursor Settings → Tools & MCP** and confirm `chrome-devtools`, `playwright`, and `figma` are enabled.
3. **Authorize Figma** if prompted (browser OAuth / Connect button). Do not put tokens in repo files.
4. Open a **new Agent chat** after restart — tools from this session will not appear until Cursor reloads MCP.
5. Use the prompts in `docs/mcp-test-prompts.md` to verify each server.
6. Keep free disk space on `D:` — installs failed once with `ENOSPC` until temp cleanup.

## 8. Troubleshooting

| Symptom | Fix |
|---------|-----|
| MCP tools missing after edit | Full Cursor quit + relaunch; new Agent chat |
| `npx` spawn fails in Cursor only | Switch that server to `cmd` / `/c` / `npx` wrapper (see below) |
| Chrome DevTools cannot find Chrome | Confirm Chrome path above; optionally set executable via MCP args later |
| Figma shows Connect / auth error | Complete browser authorization; do not paste secrets into `mcp.json` |
| Playwright browser missing | `npx playwright install chromium` |
| `ENOSPC` / disk full on `D:` | Free space (e.g. clear `D:\Temp`, remove `.next` build cache), then reinstall |

### Windows npx fallback (only if Cursor cannot spawn npx)

```json
{
  "command": "cmd",
  "args": ["/c", "npx", "-y", "chrome-devtools-mcp@latest"]
}
```

Same pattern for Playwright with `@playwright/mcp@latest`.

## 9. Commands to retest each MCP

```powershell
# Local package smoke tests
npx -y chrome-devtools-mcp@latest --help
npx -y @playwright/mcp@latest --help

# Visual testing stack
npx playwright --version
npx playwright install chromium

# Validate MCP JSON
node -e "JSON.parse(require('fs').readFileSync('.cursor/mcp.json','utf8')); console.log('ok')"
```

After Cursor restart, run the copy-paste tests in `docs/mcp-test-prompts.md`.

## Important notes

- Cursor must be **fully restarted** after editing `.cursor/mcp.json`.
- Figma requires **browser-based account authorization**.
- The Figma server may show a **Connect** button in Cursor settings.
- MCP servers must appear enabled in **Cursor Settings → Tools & MCP**.
- A **new Cursor Agent chat** should be opened after restart.
- Tools are **not available to the current chat** until Cursor reloads them.
- Editing `mcp.json` does **not** prove MCP tools are connected; only visible tools after reload do.
- Never store API keys, passwords, or access tokens in repository files.
