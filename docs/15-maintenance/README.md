---
id: 15-maintenance
slug: /15-maintenance
---

# 15 — Maintenance

Arch Linux follows a rolling-release model, so maintenance is an ongoing operating-system task.

## Routine
- Read current Arch news before relevant upgrades.
- Update through the supported package manager.
- Monitor disk space.
- Review failed systemd services.
- Inspect logs when diagnosing failures.
- Maintain backups.
- Keep recovery media available.

## Package discipline
Avoid partial upgrades. Do not mix random repositories or blindly copy old commands. Check current official documentation when behavior changes.

## Incident response
When an update causes failure, identify whether the layer is package state, kernel/initramfs, bootloader, graphics, network, or user configuration before changing several layers at once.
