---
id: 14-dual-boot
---

# 14 — Windows + Arch Dual Boot

## Safety
Dual boot increases boot and filesystem failure modes. Keep independent recovery routes for both operating systems.

## Preparation
- Backup Windows data.
- Record the partition map.
- Understand Windows recovery.
- Check encryption status and recovery-key availability where applicable.
- Account for Windows filesystem state before Linux access.

## Partition rule
Use Windows tooling for Windows partition resizing where appropriate. Do not recreate EFI or recovery partitions merely to simplify the Linux layout.

## Validation
Test a complete Windows boot, Arch boot, restart from both systems, and verify firmware boot entries remain intact.
