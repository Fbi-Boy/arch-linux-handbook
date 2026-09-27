---
title: systemd Operations
sidebar_label: systemd Operations
---

## Purpose

systemd is the service, boot, logging, timer, mount, and session coordination layer. Treat it as a dependency graph to inspect, not a collection of commands to memorize.

## Baseline inspection

```bash
systemctl is-system-running
systemctl --failed
systemctl list-units --type=service --state=running
systemctl list-unit-files --state=enabled
systemctl list-timers --all
```

Read a unit before changing it:

```bash
systemctl cat example.service
systemctl show example.service
systemctl status example.service --no-pager
```

## Service lifecycle

```bash
sudo systemctl start example.service
sudo systemctl stop example.service
sudo systemctl restart example.service
sudo systemctl enable example.service
sudo systemctl disable example.service
```

Use `enable --now` only when both persistent enablement and immediate activation are intended.

After a unit-file change:

```bash
sudo systemctl daemon-reload
systemctl status example.service --no-pager
journalctl -u example.service -b --no-pager
```

## Drop-in overrides

Do not edit vendor unit files under `/usr/lib/systemd/system`. Use:

```bash
sudo systemctl edit example.service
systemctl cat example.service
systemctl show example.service
```

If an inherited list-valued directive must be replaced, clear the previous value before assigning the new one.

## Dependency diagnosis

```bash
systemctl list-dependencies example.service
systemctl list-dependencies --reverse example.service
systemctl show example.service -p Requires -p Wants -p After -p Before
```

## Timers

```bash
systemctl list-timers --all
systemctl status example.timer --no-pager
systemctl cat example.timer
journalctl -u example.service -b --no-pager
```

A timer normally activates a service. Verify both units independently.

## Journal workflow

```bash
journalctl -b
journalctl -b -p warning
journalctl -u example.service -b
journalctl -f -u example.service
journalctl --since "30 min ago"
```

## Stop conditions

Stop when a change affects a boot-critical mount, session dependency, or multiple unrelated services. Preserve logs before destructive cleanup.

## Verification gate

```bash
systemctl --failed
systemctl is-system-running
journalctl -b -p err..alert
```

Record what changed and whether the symptom disappeared.

## References

- [ArchWiki: systemd](https://wiki.archlinux.org/title/Systemd)
- [ArchWiki: systemd/Timers](https://wiki.archlinux.org/title/Systemd/Timers)
- [ArchWiki: systemd/Journal](https://wiki.archlinux.org/title/Systemd/Journal)
