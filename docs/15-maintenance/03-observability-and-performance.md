---
title: Observability and Performance
sidebar_label: Observability and Performance
---

## Purpose

Performance work should begin with measurement. Use the loop: **Measure → Explain → Change → Re-measure**.

## System baseline

```bash
uptime
free -h
df -h
systemctl --failed
top
```

For a richer process view, use `htop` if installed.

## CPU pressure

```bash
uptime
ps -eo pid,comm,%cpu,%mem --sort=-%cpu | head
```

High CPU is a symptom, not a diagnosis. Identify the process, then inspect its service or workload.

## Memory pressure

```bash
free -h
ps -eo pid,comm,%mem,rss --sort=-%mem | head
```

Check whether memory pressure is accompanied by swap activity or I/O stalls before changing system-wide settings.

## Storage and I/O

```bash
df -h
df -i
lsblk
```

A full filesystem and an I/O bottleneck are different failure classes.

## Boot and service timing

```bash
systemd-analyze
systemd-analyze blame
systemd-analyze critical-chain
```

Use timing output to find candidates for investigation, not as a reason to disable arbitrary services.

## Kernel and service evidence

```bash
journalctl -b -k
journalctl -b -p warning
systemctl --failed
```

Correlate performance symptoms with the time the symptom occurred.

## Profiling

Tools such as `perf` can collect low-level measurements. Profiling without a defined question can produce data without a useful conclusion.

## Benchmark discipline

Before benchmarking, record kernel, hardware, power profile, workload, filesystem, application version, and background workload. Use comparable workloads and record the result.

Do not call a change an optimization until the measured workload improves without unacceptable trade-offs.

## References

- [ArchWiki: Improving performance](https://wiki.archlinux.org/title/Improving_performance)
- [ArchWiki: Benchmarking](https://wiki.archlinux.org/title/Benchmarking)
- [ArchWiki: Debugging/Profiling](https://wiki.archlinux.org/title/Debugging/Profiling)
