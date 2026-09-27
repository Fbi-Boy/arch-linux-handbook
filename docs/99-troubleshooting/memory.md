---
title: Memory Troubleshooting
sidebar_label: Memory
---

## Classify the symptom

Separate high memory usage from memory pressure, swap activity, application leaks, and kernel-level failures.

## Baseline

~~~~bash
free -h
swapon --show
cat /proc/meminfo | head -n 30
~~~~

## Find consumers

~~~~bash
ps -eo pid,comm,%mem,rss --sort=-%mem | head -n 20
~~~~

A large process is not automatically a leak. Compare usage over time and against the workload.

## Pressure signals

~~~~bash
vmstat 1
swapon --show
~~~~

## zram and zswap

~~~~bash
zramctl
cat /sys/module/zswap/parameters/enabled 2>/dev/null
~~~~

Do not change swappiness, zram, or zswap solely because memory appears high.

## Recovery

If a kernel-level fault is suspected:

~~~~bash
journalctl -b -k -p warning
~~~~

## References

- [ArchWiki: Memory management](https://wiki.archlinux.org/title/Frequently_asked_questions)
- [ArchWiki: Swap](https://wiki.archlinux.org/title/Swap)
- [ArchWiki: Zram](https://wiki.archlinux.org/title/Zram)
