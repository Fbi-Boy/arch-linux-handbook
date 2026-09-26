---
title: Security Baseline
sidebar_label: Security Baseline
---

## Purpose

Build security from small, verifiable controls instead of applying a large hardening script blindly.

## Baseline

Keep the system updated and minimize unnecessary software and services:

```bash
sudo pacman -Syu
systemctl --type=service --state=running
systemctl --type=socket --state=running
```

Review each enabled service before deciding whether it is needed.

## Accounts and privilege

Use a normal user for daily work and elevate only for administrative operations:

```bash
id
sudo -v
sudo -l
```

Review privileged group membership:

```bash
id
getent group wheel
```

Do not add users to privileged groups without understanding the access those groups provide.

## SSH

If SSH is required, restrict it to the intended network exposure and review its effective configuration:

```bash
ss -lntup
sudo sshd -T
```

Firewall rules do not replace disabling services that are not needed.

## Logs

Use the journal as the first-response source:

```bash
journalctl -b -p warning
journalctl -b --no-pager | tail -n 100
```

Preserve timestamps and exact errors during investigations.

## Security layers

Treat security as layers: firmware, kernel/microcode, permissions, user privilege, service exposure, application sandboxing, network controls, and backups/recovery.

## Verification gate

```bash
systemctl --failed
ss -lntup
journalctl -b -p err..alert
```

Investigate unexpected listeners, failed services, and repeated boot errors.

## Next step

For services you control, evaluate systemd sandboxing before adding third-party sandbox tools.

## References

- ArchWiki: General recommendations
- ArchWiki: Security
- ArchWiki: systemd/Sandboxing
