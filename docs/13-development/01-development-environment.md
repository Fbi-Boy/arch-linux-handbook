---
id: development-environment
title: Development Environment
sidebar_position: 1
---

A useful Arch development environment should be **reproducible, inspectable, and easy to recover**. Install only the tools needed by the workflow, keep the package source clear, and verify each layer before adding more software.

## 1. Establish a clean baseline

Before installing a toolchain:

```bash
uname -a
cat /etc/os-release
pacman -Q | head
systemctl --failed
df -h /
free -h
```

Record the kernel, operating system, failed services, free disk space, and memory before making changes.

> **Checkpoint:** If the system already has failed services or critically low disk space, resolve that condition first.

## 2. Choose the package source

Use Arch's repositories for system packages whenever possible.

```bash
pacman -Ss <package-name>
pacman -Si <package-name>
```

Install:

```bash
sudo pacman -Syu
sudo pacman -S --needed base-devel git
```

Do not mix package managers for the same system package without understanding which tool owns the files.

### AUR boundary

The Arch User Repository is community-maintained. Treat AUR packages as source that you are choosing to build and install, not as equivalent to packages from the official repositories.

Before installing an AUR package:

1. inspect its PKGBUILD;
2. confirm the source URLs;
3. understand its dependencies;
4. review build scripts when the package matters to your system;
5. keep the build process reproducible.

## 3. Add a language toolchain

Install only what your project needs. Examples:

```bash
sudo pacman -S --needed python
sudo pacman -S --needed nodejs npm
sudo pacman -S --needed go
sudo pacman -S --needed rust
```

Do not install every language stack “just in case.” A smaller system is easier to update, audit, and troubleshoot.

Verify:

```bash
python --version
node --version
npm --version
go version
rustc --version
```

Only run the checks for tools you installed.

## 4. Project isolation

Keep source code outside system directories:

```bash
mkdir -p ~/src
cd ~/src
```

For each project, document:

- language/runtime version;
- package manager;
- dependency lock file;
- build command;
- test command;
- environment variables;
- deployment target.

Prefer project-local dependency environments where the ecosystem supports them.

## 5. Git identity and repository safety

Inspect Git configuration:

```bash
git config --global --list
git config --global user.name
git config --global user.email
```

Inside a project:

```bash
git status
git remote -v
git branch --show-current
```

Before pushing:

```bash
git diff --check
git status
```

Never commit secrets such as private keys, API tokens, database passwords, or production environment files.

## 6. SSH for development

Generate an SSH key only when the service requires it:

```bash
ssh-keygen -t ed25519 -C "development-key"
```

Start the agent when needed:

```eval "$(ssh-agent -s)"```

Add the key:

```bash
ssh-add ~/.ssh/id_ed25519
```

Verify permissions:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
```

Test a configured host:

```bash
ssh -T git@github.com
```

> **Recovery:** If SSH fails, inspect the exact host, key path, permissions, and agent state before generating another key.

## 7. Development quality gate

Before considering the environment ready:

```bash
git --version
git diff --check
systemctl --failed
df -h /
```

Then run the project's own formatter, linter, test suite, and build command.

## Failure map

| Symptom | First inspection |
| --- | --- |
| command not found | package installation and PATH |
| dependency conflict | package manager output and project lockfile |
| Git authentication fails | remote URL, SSH agent, key permissions |
| build fails after update | runtime version and dependency lockfile |
| system becomes unstable | recent package changes and journal |

## Next step

Continue to [Git and SSH Workflow](/docs/development/git-and-ssh-workflow).
