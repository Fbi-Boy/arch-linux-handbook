---
id: system-maintenance
title: System Maintenance
sidebar_position: 1
---

# System Maintenance

Arch is maintained by keeping the system **updated, observable, and recoverable**. Maintenance should be routine rather than a collection of emergency commands.

## 1. Inspect first

Before a major update:

```bash
uname -r
pacman -Q
df -h
systemctl --failed
```

Check whether important services are already failing.

## 2. Update as one coherent operation

Synchronize package databases and upgrade the system:

```bash
sudo pacman -Syu
```

Do not perform a partial upgrade by refreshing package databases and postponing the corresponding system upgrade.

If pacman reports a conflict or asks for an intervention you do not understand, stop and inspect the package information rather than forcing the transaction.

## 3. Reboot when the change requires it

A reboot is particularly useful after kernel, firmware, graphics-stack, or other low-level changes.

After reboot:

```bash
uname -r
systemctl --failed
journalctl -b -p err..alert
```

Compare the new state with the state recorded before the update.

## 4. Review services

List running services:

```bash
systemctl --type=service --state=running
```

Find failed units:

```bash
systemctl --failed
```

For a failed service:

```bash
systemctl status <service>
journalctl -u <service> -b --no-pager
```

Do not disable a service simply because it failed. Determine whether it is required and why it failed.

## 5. Monitor disk space

```bash
df -h
df -ih
lsblk -f
```

Low disk space can cause apparently unrelated failures. Keep enough free space for package downloads, temporary files, logs, and application data.

## 6. Pacman cache

Inspect the cache:

```bash
du -sh /var/cache/pacman/pkg
```

Do not manually delete random files from the cache while package operations are active.

If cache maintenance is required, use a package-aware cleanup method and preserve versions that are useful for rollback.

## 7. Logs are evidence

Current-boot errors:

```bash
journalctl -b -p warning
journalctl -b -p err..alert
```

Kernel messages:

```bash
journalctl -b -k
```

Previous boot:

```bash
journalctl -b -1
```

When reporting an issue, record the boot number and the time window so unrelated messages are not mixed together.

## 8. Maintenance record

Keep a simple record for significant changes:

| Field | Example |
| --- | --- |
| date | 2026-09-26 |
| change | system update |
| kernel | recorded by `uname -r` |
| packages | relevant package names |
| result | boot/service checks |
| recovery | action taken if needed |

This turns maintenance history into useful troubleshooting evidence.

## 9. Stop conditions

Stop the update workflow when:

- pacman reports an unresolved transaction;
- the filesystem is unexpectedly read-only;
- disk space is critically low;
- boot-critical packages are involved and the recovery path is unclear;
- an update introduces a new failure that has not been classified.

The correct next action is diagnosis, not repeated retries.

## Maintenance gate

A routine maintenance cycle is complete when:

- package update finished without unresolved errors;
- system boots normally;
- expected network works;
- `systemctl --failed` is understood;
- important services are healthy;
- disk space is acceptable;
- new errors in the journal have been reviewed.

## Next step

Continue to [Backup and Recovery Readiness](./02-backup-and-recovery-readiness).
