---
title: Kernel Modules and sysctl
sidebar_label: Kernel Modules and sysctl
---

## Purpose

Kernel modules extend the running kernel, while sysctl exposes configurable kernel parameters. Inspect the active state before making persistent changes.

## Module inventory

~~~~bash
lsmod
modinfo MODULE
lspci -k
~~~~

For device problems, correlate hardware with the driver shown by `lspci -k` before manually loading a module.

## Load and unload

For temporary testing:

~~~~bash
sudo modprobe MODULE
sudo modprobe -r MODULE
lsmod | grep MODULE
journalctl -b -k | grep -i MODULE
~~~~

Do not unload a module while dependent devices or services are using it.

## Persistent loading

When a module genuinely must load at boot, document it under `/etc/modules-load.d/`. Verify after reboot rather than assuming the configuration worked.

## sysctl

~~~~bash
sysctl vm.swappiness
sysctl kernel.hostname
~~~~

Persistent local overrides belong in `/etc/sysctl.d/`:

~~~~text
# /etc/sysctl.d/99-local.conf
vm.swappiness = 35
~~~~

Apply and verify:

~~~~bash
sudo sysctl --system
sysctl vm.swappiness
~~~~

Avoid copying tuning bundles without understanding every parameter.

## Recovery

Revert the smallest recent module or sysctl change. Restore the previous value and reboot only when the running state cannot safely be restored.

## References

- [ArchWiki: Kernel modules](https://wiki.archlinux.org/title/Kernel_module)
- [ArchWiki: sysctl](https://wiki.archlinux.org/title/Sysctl)
