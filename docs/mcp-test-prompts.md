# MCP post-restart test prompts

Use these in a **new Agent chat** after a full Cursor restart. Do not run them in the chat that only edited `mcp.json`.

---

## CHROME DEVTOOLS TEST

Use the chrome-devtools MCP to open:

https://example.com

Take a screenshot, inspect the page title, report the viewport size, and return the computed width and height of the body element.

Do not use another browser tool.

---

## PLAYWRIGHT TEST

Use the Playwright MCP to open:

https://example.com

Report the page title, take a screenshot, and verify that the main heading is visible.

---

## FIGMA TEST

Use the Figma MCP and list the Figma tools currently available.

If Figma authentication is required, state that clearly.

Do not pretend to read a Figma file until I provide a Figma frame or node link.
