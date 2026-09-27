---
title: Laptop Validation
---

## Purpose

Validate a laptop as a system rather than troubleshooting each device independently.

## What must be true first

Collect the baseline inventory:

`lscpu`
`free -h`
`lsblk -o NAME,MODEL,SIZE,FSTYPE,MOUNTPOINTS`
`lspci -k`
`lsusb`
`ip -br link`

## Validation layers

Check firmware and kernel, CPU and memory visibility, storage and filesystem health, graphics driver, network device, audio and Bluetooth, suspend/resume, power management, and external devices.

## Thermal and power observations

Use available sensors and kernel/system logs rather than assuming a temperature or power issue.

`sensors`
`journalctl -b -k --no-pager | grep -Ei 'thermal|thrott|firmware|error'`

Use one primary userspace power-management policy. Multiple competing policy daemons can produce confusing results.

## Suspend/resume

After a failed resume, capture the previous boot's kernel and system logs before making broad changes:

`journalctl -b -1 -k --no-pager`
`journalctl -b -1 -p warning --no-pager`

## Verification

A laptop validation pass should document detected hardware, active kernel drivers, working network and audio, graphics acceleration, suspend/resume result, power-management policy, and remaining known issues.

## References

- [ArchWiki Hardware detection](https://wiki.archlinux.org/title/Hardware_detection_and_troubleshooting)
- [ArchWiki Power management](https://wiki.archlinux.org/title/Power_management)
- [ArchWiki Laptop](https://wiki.archlinux.org/title/Laptop)
