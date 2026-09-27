---
title: Swap, zram and Memory
sidebar_label: Swap, zram and Memory
---

## Purpose

Swap is a memory-management mechanism. zram creates compressed memory-backed swap; zswap is a compressed cache in front of backing swap.

## Inspect first

~~~~bash
free -h
swapon --show
cat /proc/swaps
sysctl vm.swappiness
~~~~

Record RAM, swap devices, priorities, and workload before changing memory policy.

## zram

~~~~bash
lsmod | grep zram
zramctl
swapon --show
~~~~

For persistent configuration, `zram-generator` integrates with systemd.

Verify:

~~~~bash
systemctl status systemd-zram-setup@zram0.service --no-pager
zramctl
swapon --show
~~~~

## zswap

zswap differs from zram because it caches pages headed toward a backing swap device.

~~~~bash
cat /sys/module/zswap/parameters/enabled 2>/dev/null
grep -r . /sys/module/zswap/parameters/ 2>/dev/null
~~~~

Do not enable multiple memory policies merely because they sound faster. Measure the workload.

## Verification

~~~~bash
free -h
swapon --show
journalctl -b -k | grep -Ei 'swap|zram|zswap'
~~~~

## References

- [ArchWiki: Swap](https://wiki.archlinux.org/title/Swap)
- [ArchWiki: Zram](https://wiki.archlinux.org/title/Zram)
- [ArchWiki: Zswap](https://wiki.archlinux.org/title/Zswap)
