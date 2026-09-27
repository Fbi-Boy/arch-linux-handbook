---
title: Network Services and SSH
sidebar_label: Network Services and SSH
---

## Purpose

Remote administration adds a network trust boundary. Configure SSH only after addressing, firewall policy, accounts, and logging are understood.

## Inspect first

```bash
ip -br address
ip route
ss -lntup
systemctl status sshd --no-pager
sudo sshd -T
```

The `sshd -T` output exposes the effective OpenSSH configuration.

## Server activation

If remote access is required:

```bash
sudo systemctl enable --now sshd.service
systemctl status sshd.service --no-pager
ss -lntp | grep ':22'
```

Do not expose a service merely because it is installed.

## Account and key boundary

Use a dedicated administrative account with minimum required privileges. Before changing authentication policy, verify key-based login in a second session.

```bash
ls -la ~/.ssh
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

Never place private keys in repositories, tickets, screenshots, or documentation.

## Configuration workflow

Prefer a drop-in under `/etc/ssh/sshd_config.d/` where appropriate. Validate before reload:

```bash
sudo sshd -t
sudo systemctl reload sshd.service
systemctl status sshd.service --no-pager
```

Keep an existing SSH session open while testing a new policy.

## Exposure verification

```bash
ss -lntup
sudo nft list ruleset 2>/dev/null
journalctl -u sshd.service -b --no-pager
```

The goal is intended reachability, not merely a working daemon.

## Failure recovery

1. Keep any working session open.
2. Check `sshd -t`.
3. Revert the smallest recent change.
4. Reload the service.
5. Confirm the listening socket and journal.

If remote access is unavailable, use local TTY or console access rather than weakening policy blindly.

## Stop conditions

Stop before public exposure when the firewall policy is undefined, administrative recovery access is unverified, or the service listens on unintended interfaces.

## References

- [ArchWiki: Secure Shell](https://wiki.archlinux.org/title/Secure_Shell)
- [OpenSSH](https://www.openssh.com/)
