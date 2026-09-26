# 06 — Base Installation

## Objective
Install the minimal Arch base system into the prepared target filesystem.

## Sequence
1. Confirm network.
2. Confirm partitions and mounts.
3. Install the base system and required firmware.
4. Generate the filesystem table.
5. Enter the installed system with the supported chroot workflow.

## Gate before package installation
- Target root is mounted correctly.
- EFI partition is mounted at the intended location.
- Network works.
- Storage layout is correct.

## After package installation
- Base packages exist in the target root.
- fstab exists and matches actual filesystem identifiers.
- Chroot succeeds.

## Failure handling
Package download failure goes to network diagnostics. Mount or filesystem errors go to storage diagnostics. Do not reformat a partition just because a package command failed.
