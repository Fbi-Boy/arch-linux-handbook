---
id: partition-and-format
title: Partition and format safely
sidebar_label: Partition and format safely
---

# Partition and format safely

This page deliberately does not provide a blind copy-paste destructive command. The device path must be substituted only after verification.

## 1. Identify the disk

```bash
lsblk -o NAME,SIZE,TYPE,FSTYPE,LABEL,MODEL,MOUNTPOINTS
```

For NVMe drives, a partition may look like `/dev/nvme0n1p1`. For SATA/SCSI disks it may look like `/dev/sda1`.

Do not infer the target from the name alone.

## 2. Create the partition table

For a clean UEFI installation, GPT is the normal baseline.

Choose one partitioning tool and inspect its output after changes.

For example:

```bash
fdisk /dev/<disk>
```

or:

```bash
cfdisk /dev/<disk>
```

After writing the table:

```bash
lsblk -o NAME,SIZE,TYPE,FSTYPE,PARTTYPE,MOUNTPOINTS
fdisk -l /dev/<disk>
```

## 3. Format only the intended partitions

Example pattern for a new ESP and root partition:

```bash
mkfs.fat -F 32 /dev/<esp-partition>
mkfs.ext4 /dev/<root-partition>
```

If swap is part of the design:

```bash
mkswap /dev/<swap-partition>
swapon /dev/<swap-partition>
```

**Never** substitute these commands into an existing partition that contains data you intend to keep.

## 4. Mount

For a simple root + ESP layout:

```bash
mount /dev/<root-partition> /mnt
mkdir -p /mnt/boot
mount /dev/<esp-partition> /mnt/boot
```

If your bootloader strategy uses a different ESP mount point, keep the layout consistent with that bootloader's documented requirements.

## 5. Verify mounts

```bash
findmnt -R /mnt
lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINTS
swapon --show
```

Expected conceptually:

```text
root partition → /mnt
ESP            → /mnt/boot
swap           → active swap (if selected)
```

## Stop conditions

Stop immediately if:

- the mounted filesystem is not the intended partition,
- the ESP contains data that should not be erased,
- the root filesystem is mounted from the wrong device,
- the partition table differs from the plan,
- or the target disk cannot be positively identified.

## Next

Proceed to [base installation](../installation/base-install) after the mount gate passes.
