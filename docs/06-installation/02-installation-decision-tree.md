# 06.2 — Installation Decision Tree

## Firmware

**UEFI?**

- Yes → continue with UEFI layout.
- No → stop and decide whether legacy BIOS is actually required.

## Existing operating system

**Windows present?**

- Yes → use the dual-boot safety path.
- No → clean-disk installation can be considered after backup verification.

## Storage

**Need encryption?**

- Yes → select and validate an encryption architecture before formatting.
- No → continue with a standard filesystem design.

**Need snapshots?**

- Yes → evaluate Btrfs/snapshot design before installation.
- No → a simpler filesystem may reduce operational complexity.

## Swap

Choose based on requirements:

- zram
- swapfile
- swap partition

Do not install every option by default.

## Desktop

Choose after the base system boots:

- KDE Plasma
- GNOME
- XFCE
- compositor/window-manager workflow

## Principle

The handbook intentionally avoids a single “best” architecture. The correct design depends on firmware, existing OS, storage requirements, hardware, recovery needs, and intended workload.
