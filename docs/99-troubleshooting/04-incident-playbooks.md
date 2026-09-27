---
title: Incident Playbooks
sidebar_label: Incident Playbooks
---

## Purpose

These playbooks convert common failures into short, repeatable recovery procedures.

## Playbook: system does not boot

**Signal:** the machine reaches firmware but does not reach a usable Arch session.

1. Confirm firmware mode.
2. Inspect EFI entries with `efibootmgr -v`.
3. Inspect bootloader state with `bootctl status`.
4. If the bootloader starts, inspect kernel/initramfs and root discovery.
5. Enter the live environment in the same firmware mode when recovery is required.
6. Mount the installed system and EFI system partition.
7. Use `arch-chroot` and repair only the failing layer.
8. Regenerate initramfs or reinstall the bootloader only when evidence supports it.
9. Verify the boot path before rebooting.

See [Boot recovery](./boot.md).

## Playbook: network is unavailable

**Signal:** the expected interface is missing, disconnected, or cannot reach a known endpoint.

1. `ip -br link`
2. `rfkill list` for wireless.
3. `lspci -k` or `lsusb` to identify the device.
4. Check the relevant service.
5. Verify address assignment.
6. Verify the route.
7. Verify DNS separately.
8. Test a known endpoint only after the lower layers are healthy.

See [Network troubleshooting](./network.md).

## Playbook: package operation fails

**Signal:** pacman reports synchronization, signature, conflict, or database problems.

1. Preserve the exact error.
2. Check time synchronization.
3. Inspect repository configuration and package databases.
4. Do not disable signature verification.
5. Do not perform a partial upgrade.
6. If the local database is damaged, follow a database-recovery procedure rather than deleting it blindly.
7. Verify package state after repair.

See [Package troubleshooting](./package-manager.md).

## Playbook: graphical session fails

**Signal:** black screen, display-manager loop, session crash, or unusable graphics.

1. Switch to a TTY.
2. Inspect GPU and kernel driver.
3. Inspect display-manager status.
4. Inspect the current session type.
5. Inspect the journal for the current boot.
6. Change one layer at a time.
7. Re-test the smallest failing boundary.

See [Display troubleshooting](./display.md).

## Recovery evidence template

Record:

```text
Date/time:
Symptom:
Last known-good state:
Recent change:
First failing layer:
Evidence:
Change made:
Verification:
Final state:
Follow-up:
```

## References

- [System maintenance](https://wiki.archlinux.org/title/System_maintenance)
- [Pacman restore local database](https://wiki.archlinux.org/title/Pacman/Restore_local_database)
