---
title: systemd Troubleshooting
sidebar_label: systemd
---

## Classify the failure

Start with evidence:

```bash
systemctl is-system-running
systemctl --failed
systemctl status FAILED_UNIT --no-pager
journalctl -u FAILED_UNIT -b --no-pager
```

## Service starts and exits

Inspect the unit and dependencies:

```bash
systemctl cat FAILED_UNIT
systemctl show FAILED_UNIT
systemctl list-dependencies FAILED_UNIT
```

Then inspect the journal for the first meaningful error rather than only the final exit status.

## Boot is slow

```bash
systemd-analyze
systemd-analyze blame
systemd-analyze critical-chain
```

Do not disable services solely because they appear near the top of a timing list. Confirm what the service provides and whether the delay is actually on the critical path.

## Timer did not run

```bash
systemctl list-timers --all
systemctl status example.timer --no-pager
systemctl cat example.timer
journalctl -u example.service -b --no-pager
```

Check the timer schedule and the service independently.

## Recovery

Change one variable at a time. After every change:

```bash
systemctl --failed
systemctl status FAILED_UNIT --no-pager
journalctl -u FAILED_UNIT -b --no-pager
```

## Stop conditions

Stop when several unrelated units fail, a boot-critical dependency is involved, or the proposed fix is destructive.

## References

- [ArchWiki: systemd](https://wiki.archlinux.org/title/Systemd)
- [ArchWiki: systemd/Journal](https://wiki.archlinux.org/title/Systemd/Journal)
- [ArchWiki: systemd/Timers](https://wiki.archlinux.org/title/Systemd/Timers)
