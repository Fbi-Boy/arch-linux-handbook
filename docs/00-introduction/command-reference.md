---
title: Command Reference
sidebar_label: Command Reference
---

## Purpose

This is a quick-reference index for commands used throughout the handbook. It is not a substitute for a command's manual page.

## Inspect

| Goal | Command |
| --- | --- |
| Block devices | `lsblk -f` |
| Mount tree | `findmnt -R /` |
| PCI devices | `lspci -k` |
| USB devices | `lsusb` |
| CPU | `lscpu` |
| Memory | `free -h` |
| Network | `ip -br address` |
| Services | `systemctl --failed` |
| Logs | `journalctl -b -p warning` |
| Kernel | `uname -r` |

## Storage

| Goal | Command |
| --- | --- |
| Filesystems | `lsblk -f` |
| Mounts | `findmnt` |
| Disk usage | `df -h` |
| Btrfs subvolumes | `btrfs subvolume list /` |
| SSD discard capability | `lsblk --discard` |

## Boot and recovery

| Goal | Command |
| --- | --- |
| Boot state | `bootctl status` |
| UEFI entries | `efibootmgr -v` |
| Kernel command line | `cat /proc/cmdline` |
| Initramfs contents | `lsinitcpio` |
| Regenerate initramfs | `mkinitcpio -P` |

## Security

| Goal | Command |
| --- | --- |
| Listening sockets | `ss -lntup` |
| Failed services | `systemctl --failed` |
| Service sandboxing | `systemd-analyze security SERVICE` |
| Current user | `id` |
| SSH configuration | `sshd -T` |

## Network

| Goal | Command |
| --- | --- |
| Interfaces | `ip -br link` |
| Addresses | `ip -br address` |
| Routes | `ip route` |
| Resolver | `resolvectl status` |
| NetworkManager | `nmcli device status` |
| Radio blocks | `rfkill list` |

## Rule

For recovery, prefer **inspect → classify → change one thing → verify** over memorizing destructive commands.

When uncertain, use the command's manual:

```bash
man COMMAND
COMMAND --help
```
