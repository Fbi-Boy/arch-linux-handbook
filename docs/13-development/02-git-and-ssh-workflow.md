---
id: git-and-ssh-workflow
title: Git and SSH Workflow
sidebar_position: 2
---

# Git and SSH Workflow

Git should make changes **traceable and reversible**. A disciplined workflow reduces the chance that a broken experiment becomes an unrecoverable system change.

## 1. Inspect before changing

```bash
git status
git branch --show-current
git remote -v
git log --oneline -10
```

If the working tree contains unrelated changes, do not blindly overwrite them.

## 2. Start from an intentional branch

```bash
git switch main
git pull --ff-only
git switch -c feat/example-change
```

Use branch names that describe the work:

- `docs/...` for documentation;
- `feat/...` for functionality;
- `fix/...` for corrections;
- `refactor/...` for structural changes.

## 3. Make small, reviewable commits

A useful commit should represent one coherent change.

```bash
git diff --check
git diff
git status
git add <files>
git commit -m "docs: explain recovery workflow"
```

Avoid commits that mix unrelated formatting, dependency changes, and functional changes.

## 4. Review the history

```bash
git log --oneline --decorate --graph -15
git show --stat --oneline HEAD
git show --check HEAD
```

A clean history makes later troubleshooting easier because you can identify exactly which change introduced a behavior.

## 5. Push and open a review

```bash
git push -u origin feat/example-change
```

The review should check:

- scope;
- correctness;
- documentation quality;
- tests/build;
- security implications;
- recovery path;
- compatibility with the existing architecture.

## 6. SSH troubleshooting

Inspect the remote:

```bash
git remote -v
```

Check the SSH client:

```ssh -V```

Run a verbose connection test when necessary:

```ssh -vT git@github.com```

Look for:

1. the expected hostname;
2. the expected identity file;
3. successful public-key authentication;
4. repository authorization after authentication.

Do not paste private key material into an issue, terminal transcript, or support request.

## 7. Safe recovery from Git mistakes

Uncommitted changes:

```bash
git status
git diff
```

A mistaken commit that has not been pushed can often be corrected with:

```bash
git commit --amend
```

If a branch was pushed already, prefer a new corrective commit unless there is a deliberate reason to rewrite shared history.

Before destructive commands such as `git reset --hard`, inspect the branch and preserve valuable work first.

## 8. Release-oriented verification

Before merging or releasing:

```bash
git diff --check
git status
git log --oneline --decorate -10
```

Then run the project's complete verification suite.

> **Checkpoint:** “It works on my machine” is not a verification method. Record the environment and run reproducible checks.

## Next step

Continue to [System Maintenance](../15-maintenance/01-system-maintenance).
