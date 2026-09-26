---
title: Hardware Inventory
sidebar_label: Hardware Inventory
---

## Purpose

Create a reproducible hardware inventory before installing drivers or tuning the system. Hardware detection should drive configuration.

## Core inventory

Run:

```bash
lspci -nn
lsusb
lsblk -o NAME,MODEL,SIZE,FSTYPE,FSVER,MOUNTPOINTS
lscpu
free -h
```

For a compact report:

```bash
lspci -k
ip -br link
cat /proc/cmdline
```

## Graphics

Identify the GPU and the kernel driver currently attached:

```bash
lspci -k | grep -A 3 -E 'VGA|3D|Display'
```

The important fields are the device ID, kernel module, and whether a driver is actually in use.

## Storage

Check filesystem and mount relationships:

```bash
lsblk -f
findmnt -R /
```

Never infer a target disk from its size alone. Confirm model, device name, and current mounts before destructive operations.

## Network

List interfaces and state:

```bash
ip -br link
rfkill list
```

A disabled radio, missing firmware, and a NetworkManager configuration issue are different failure classes.

## Verification record

For troubleshooting, record:

- hardware model and device ID
- kernel version
- loaded driver
- filesystem type
- relevant service state
- exact error message
- recent journal entries

Keep the record with the incident rather than repeatedly changing several variables at once.

## Next step

Use this inventory to select only the drivers and firmware your hardware actually needs.

## References

- ArchWiki: General recommendations
- ArchWiki: Hardware detection
- ArchWiki: PCI
- ArchWiki: USB
