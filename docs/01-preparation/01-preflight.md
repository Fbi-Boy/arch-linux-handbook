---
id: preflight
title: Preflight checklist
sidebar_label: Preflight checklist
---

Tujuan preflight adalah memastikan instalasi dapat dilakukan tanpa menebak kondisi mesin.

## STOP sebelum menyentuh disk

Pastikan:

- [ ] Backup data penting sudah selesai dan dapat dibaca.
- [ ] Target disk sudah diidentifikasi dengan ukuran dan model yang benar.
- [ ] Jika dual-boot, partisi Windows/OS lain sudah dipetakan.
- [ ] Boot mode yang direncanakan adalah UEFI jika perangkat mendukungnya.
- [ ] Charger terpasang untuk laptop.
- [ ] Koneksi internet tersedia atau metode koneksi alternatif sudah disiapkan.
- [ ] Media instalasi berasal dari sumber resmi.
- [ ] ISO sudah diverifikasi sebelum digunakan.

> **Rule:** jangan menjalankan perintah destruktif hanya karena perintah tersebut ada di tutorial. Verifikasi target terlebih dahulu.

## Identifikasi perangkat

Dari live environment:

```bash
lsblk -o NAME,SIZE,TYPE,FSTYPE,LABEL,MODEL,MOUNTPOINTS
```

Untuk detail partition table:

```bash
fdisk -l
```

Cari:

1. model disk,
2. ukuran disk,
3. tipe partition table,
4. partisi yang sudah ada,
5. mount point aktif.

Jangan mengandalkan nama seperti `/dev/sda` atau `/dev/nvme0n1` sebagai asumsi universal.

## Verify boot mode

Arch's current Installation Guide recommends checking the UEFI firmware platform size:

```bash
cat /sys/firmware/efi/fw_platform_size
```

- `64` → UEFI x86_64.
- `32` → UEFI IA32.
- File tidak tersedia → kemungkinan booted in legacy BIOS/CSM.

If the intended installation is UEFI but the live medium was booted in legacy mode, stop and boot the USB in UEFI mode first.

## Clock and network

Check time synchronization:

```timedatectl status
```

The live environment normally provides a working time service. Confirm network reachability before package installation:

```ping -c 3 archlinux.org
```

If DNS fails, distinguish it from a complete network failure:

```ping -c 3 1.1.1.1
getent hosts archlinux.org
```

## Decision gate

Proceed only when all of these are true:

```text
BACKUP OK
  ↓
TARGET DISK IDENTIFIED
  ↓
BOOT MODE VERIFIED
  ↓
NETWORK VERIFIED
  ↓
ISO VERIFIED
  ↓
PARTITION PLAN UNDERSTOOD
  ↓
SAFE TO MODIFY DISK
```

## References

- ArchWiki: Installation guide
- ArchWiki: Partitioning
- ArchWiki: EFI system partition
