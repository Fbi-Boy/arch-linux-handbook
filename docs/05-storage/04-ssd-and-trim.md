---
title: SSD Health and TRIM
---

SSD maintenance should be evidence-driven. Do not apply storage “optimization” commands without first confirming device capability and filesystem support.

## Identify the device

```bash
lsblk -o NAME,MODEL,SIZE,TYPE,FSTYPE,MOUNTPOINTS
lsblk --discard
```

Non-zero discard capability fields indicate that the device exposes discard support.

## Periodic TRIM

For supported filesystems and devices, periodic TRIM can be enabled with the systemd timer:

```bash
systemctl status fstrim.timer
sudo systemctl enable --now fstrim.timer
```

Verify:

```bash
systemctl list-timers fstrim.timer
journalctl -u fstrim.service --since today --no-pager
```

Do not assume that continuous discard mounting is preferable. Evaluate workload, device behavior, and current Arch guidance first.

## SMART evidence

For supported drives, inspect health data before diagnosing storage problems:

```bash
sudo smartctl -a /dev/DEVICE
```

For NVMe devices, use the appropriate NVMe health tooling when available.

## Stop conditions

Stop before running destructive storage commands when:

- the target device is uncertain;
- backup status is unknown;
- a command would erase or sanitize media;
- the drive reports serious hardware errors.

## References

- https://wiki.archlinux.org/title/Solid_state_drive
- https://wiki.archlinux.org/title/S.M.A.R.T.
