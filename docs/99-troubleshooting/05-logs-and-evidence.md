---
title: Logs and Evidence
---

## Purpose

Turn a vague failure into a reproducible evidence set before changing the system.

## First capture

Record the current boot, kernel, failed units, storage, network, and recent errors.

`uname -a`
`systemctl --failed`
`lsblk -f`
`ip -br address`
`journalctl -b -p warning --no-pager`

For a specific service:

`systemctl status example.service --no-pager`
`journalctl -u example.service -b --no-pager`

For kernel or driver failures:

`journalctl -b -k --no-pager`

## Classify the failure

Use the smallest layer that explains the symptom: firmware, boot entry, bootloader, kernel, initramfs, storage/filesystem, systemd, network, display/session, or application.

## Preserve evidence

Save relevant output before restarting or applying fixes. Include the command used, timestamp, exact error, hardware identifier when relevant, package or service involved, and the change made immediately before failure.

Avoid posting secrets, private keys, access tokens, or personally identifying logs.

## Verification

After a repair, capture the same evidence again. A fix is stronger when the before/after difference is observable.

## Recovery

If a change makes the failure worse, revert the smallest change first. If the system becomes unbootable, switch to the live recovery workflow and preserve the installed filesystems before modifying them.

## References

- [ArchWiki Systemd](https://wiki.archlinux.org/title/Systemd)
- [ArchWiki Journal](https://wiki.archlinux.org/title/Systemd/Journal)
- [ArchWiki General troubleshooting](https://wiki.archlinux.org/title/General_troubleshooting)
