---
title: Recovery Matrix
sidebar_label: Recovery Matrix
---

## Purpose

Use this matrix to choose the smallest safe diagnostic path before attempting repair.

| Symptom | First inspection | Classification | Recovery entry |
| --- | --- | --- | --- |
| Firmware does not show Arch | `bootctl status`, `efibootmgr -v` | Firmware / EFI entry | [Boot recovery](./boot.md) |
| Bootloader appears but Arch fails | `cat /proc/cmdline`, bootloader status | Bootloader / kernel | [Boot recovery](./boot.md) |
| Root filesystem is not found | `lsblk -f`, `blkid`, initramfs output | Storage / root discovery | [Storage recovery](../05-storage/06-btrfs-snapshots-and-recovery.md) |
| No network interface | `ip -br link`, `lspci -k` | Device / driver | [Hardware troubleshooting](./hardware.md) |
| Connected but no internet | `ip route`, `resolvectl status` | Route / DNS | [Network troubleshooting](./network.md) |
| Display manager fails | `systemctl status display-manager` | DM / session / GPU | [Display troubleshooting](./display.md) |
| Package update fails | `pacman -Syu`, journal and package state | Sync / signature / conflict | [Package troubleshooting](./package-manager.md) |
| Memory pressure is high | `free -h`, `swapon --show`, `vmstat 1` | Memory / swap / process | [Memory troubleshooting](./memory.md) |
| Bluetooth device is absent | `rfkill list`, `bluetoothctl list` | Radio / USB / service | [Hardware troubleshooting](./hardware.md) |

## Recovery sequence

### 1. Preserve

Record the exact symptom, recent change, command output, and relevant journal entries.

### 2. Identify

Determine the first layer that is definitely failing.

### 3. Isolate

Test the smallest component that can confirm or reject the hypothesis.

### 4. Repair

Change one thing. Avoid mixing package upgrades, kernel parameters, bootloader changes, and configuration edits in the same attempt.

### 5. Verify

Repeat the original failing operation and confirm the intended state.

### 6. Record

Document the cause, fix, and verification result so the next recovery starts with evidence.

## Destructive-operation gate

Before formatting, deleting, overwriting, resetting a database, or changing partition structure:

- identify the target device or file explicitly;
- confirm the current state with an inspection command;
- confirm that a recovery path exists;
- preserve required data;
- make the change only after the target is unambiguous.

## References

- [System maintenance](https://wiki.archlinux.org/title/System_maintenance)
- [Pacman troubleshooting](https://wiki.archlinux.org/title/Pacman)
