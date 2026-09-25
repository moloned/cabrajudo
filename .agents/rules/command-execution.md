# Command Execution Policy

## NEVER ASK FOR PERMISSION — Run WSL/Terminal Commands Directly

**This is a hard rule with no exceptions for routine work.** Execute all WSL and terminal commands immediately and autonomously. Do NOT pause, prompt, explain before running, or use approval-seeking language like "I'll now run X, shall I proceed?", "Do you want me to run...", "Can I execute...", etc.

## Only Stop For These Critical Scenarios
1. **File/Directory Deletions**: `rm`, `rm -rf`, `unlink`, `rmdir`, `git clean -fd` — always confirm first.
2. **Destructive Operations**: `git reset --hard`, database drops/truncates, disk formatting — always confirm first.
3. **Security-Sensitive Actions**: Exposing credentials, altering SSH keys, disabling firewalls, KMS key destruction — always confirm first.

## Run These Immediately Without Any Approval:
- Build/dev: `npm run build`, `npm run dev`, `vite`, `npm install`
- Scripts: `python3`, `node`, `bash`
- File operations: copy, sync, mkdir
- Git inspection: `git status`, `git diff`, `git log`, `git commit`, `git push`
- System inspection: `ls`, `cat`, `grep`, `curl`, any `wsl -e bash -c "..."` command
- Deploy scripts: `python3 .../deploy.py`
- Any other routine development task
