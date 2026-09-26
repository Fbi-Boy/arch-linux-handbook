---
id: partitioning
title: Partitioning strategy
sidebar_label: Partitioning strategy
---

# Partitioning strategy

Partitioning is where the installation becomes destructive. The handbook therefore separates **design** from **execution**.

## First principle

There is no universally correct partition layout. ArchWiki explicitly treats partitioning as dependent on flexibility, performance, security, available storage, and the intended workload.

The simplest modern layout for many UEFI systems is:

```text
GPT
├── EFI System Partition
├── optional swap
└── Linux root
```

A separate `/home` partition is a design choice, not a requirement.

## UEFI/GPT baseline

A practical baseline:

| Purpose | Type | Typical planning |
| --- | --- | --- |
| ESP | EFI System Partition | about 1 GiB gives comfortable room |
| Swap | Linux swap | workload-dependent |
| Root | Linux filesystem | remaining space |

ArchWiki currently documents an ESP around 1 GiB in its example UEFI/GPT layout and notes that swap sizing depends on workload and hibernation requirements.

## ESP

The EFI System Partition is a FAT-formatted, firmware-accessible partition used by UEFI boot loaders and related files.

Check for an existing ESP before creating another:

```bash
fdisk -l /dev/<disk>
```

On a machine that already contains Windows, reusing the existing ESP may be appropriate. Never format an existing ESP blindly.

## Swap

Swap is not synonymous with RAM.

Choose based on:

- available disk space,
- memory pressure,
- workload,
- hibernation requirements,
- filesystem strategy.

For hibernation, swap capacity must be planned around the amount of memory that must be preserved, rather than blindly applying a universal formula.

## Root filesystem

A single root filesystem is often the simplest baseline. It reduces unnecessary boundaries and makes capacity management straightforward.

Alternative designs—Btrfs subvolumes, separate `/home`, LVM, encryption layers—should be introduced when there is a concrete reason to use them.

## Filesystem choice

Common options include:

- ext4 — straightforward and mature;
- Btrfs — snapshots, subvolumes, compression, and copy-on-write features;
- XFS — strong large-filesystem/workload characteristics.

Do not select a filesystem because it appears more advanced. Select it because its features solve a requirement.

## Partitioning safety gate

Before writing a partition table:

```bash
lsblk -o NAME,SIZE,TYPE,FSTYPE,LABEL,MODEL,MOUNTPOINTS
fdisk -l
```

Then record:

```text
TARGET DISK:
MODEL:
SIZE:
CURRENT PARTITIONS:
INSTALLATION MODE:
ESP:
SWAP:
ROOT:
DATA TO PRESERVE:
```

Only after this record matches the intended design should destructive partitioning begin.

## References

- ArchWiki: Partitioning
- ArchWiki: EFI system partition
- ArchWiki: Swap
