---
title: Service Hardening
sidebar_label: Service Hardening
---

## Purpose

Reduce the impact of a compromised service by restricting what the service can access.

## Inspect first

For a service named `example.service`:

```bash
systemctl cat example.service
systemctl show example.service
systemd-analyze security example.service
```

The security analysis is a diagnostic aid, not a universal score to optimize.

## Hardening model

Possible controls include:

- run as a dedicated unprivileged account
- restrict filesystem visibility
- restrict device access
- remove unnecessary capabilities
- restrict network access where the service permits it
- make selected paths read-only
- apply resource limits

Every restriction must be compatible with the service's actual function.

## Drop-in configuration

Prefer a systemd drop-in over editing vendor unit files directly:

```bash
sudo systemctl edit example.service
```

After changing the unit:

```bash
sudo systemctl daemon-reload
sudo systemctl restart example.service
systemctl status example.service
journalctl -u example.service -b --no-pager
```

## Recovery

If a hardening rule breaks the service, remove or narrow the newest restriction, reload systemd, and retest. Keep one change per iteration so the failure has a clear cause.

## AppArmor

AppArmor adds mandatory access-control policies for applications. Treat profiles as application-specific policy, test them before enforcing them broadly, and monitor denials through the journal.

Do not deploy a copied profile without validating paths, capabilities, and application behavior.

## Verification

A hardening change is complete only when the service performs its intended function, denied access is intentional, logs contain no unexplained policy failures, and the service still starts after reboot.

## References

- ArchWiki: systemd/Sandboxing
- ArchWiki: AppArmor
