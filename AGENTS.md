# Agent Rules

## WSL & Terminal Command Execution Policy
- **Autonomy**: Do NOT stop to ask the user to approve WSL commands or terminal actions, EXCEPT when a command involves:
  1. File or directory deletions (e.g., `rm`, `rm -rf`, `unlink`, `rmdir`, `git clean`).
  2. Destructive operations (e.g., `git reset --hard`, database drops or table truncations, formatting disks/partitions).
  3. Actions that could compromise system security (e.g., credential modification, exposing secrets, altering security keys/policies).
- **Proactive Execution**: For all standard development, building, testing, linting, syncing, running servers, querying, and checking status, execute commands directly and proactively without manual confirmation.

## Blog & News Publishing Policy
- **Single Headline Slot**: When a new blog entry is published, only the latest new entry occupies the headline block at the top of the blog section on `index.html`.
- **Archive Relegation**: The previous headline entry MUST be relegated to the archive section (`js/blog-data.js` and the native archive grid). Never leave old headline entries sitting as duplicate or lingering featured cards on the main page.

