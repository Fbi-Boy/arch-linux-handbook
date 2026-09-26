---
id: 05-storage
slug: /05-storage
---

# 05 — Storage and Partitioning

> ⚠️ DATA LOSS ZONE: partitioning and filesystem creation can permanently destroy data.

## Workflow
1. Inspect block devices.
2. Identify the physical disk by size, model, and transport.
3. Record existing partitions.
4. Decide the partition layout.
5. Re-check the device immediately before destructive operations.
6. Create filesystems only on intended partitions.
7. Mount and verify.

## Baseline UEFI layout
A simple design may contain:
- EFI System Partition (FAT32)
- root filesystem
- optional swap strategy such as a swap partition, swapfile, or zram

This is a design choice, not a universal requirement.

## Gate
Verify the physical disk, partition table, EFI partition, root partition, mount points, and untouched Windows/recovery partitions.

## Wrong partition formatted
Stop writing to the disk immediately. Do not continue the installation. Use a dedicated recovery workflow.
