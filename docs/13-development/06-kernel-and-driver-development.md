---
title: Kernel and Driver Development
sidebar_label: Kernel and Driver Development
---

## Purpose

Kernel and out-of-tree driver work can affect boot, graphics, networking, storage, and Secure Boot. Treat it as an isolated engineering workflow.

## Identify the target

~~~~bash
uname -r
lspci -k
lsusb
modinfo MODULE
~~~~

Record kernel version, hardware ID, current driver, and intended replacement.

## External modules

External modules generally need headers matching the kernel they are built for. Prefer reproducible package or DKMS workflows.

~~~~bash
modinfo MODULE
lsmod
journalctl -b -k | grep -Ei 'module|firmware|driver'
~~~~

## DKMS

~~~~bash
dkms status
~~~~

A kernel update can require external modules to be rebuilt.

## Secure Boot

Secure Boot can add module-signing requirements depending on policy. Verify the trust chain before assuming an external module can load.

## Recovery

Keep a known-good kernel and boot entry. If a new module causes failure, boot the fallback path and isolate the offending component.

## References

- [ArchWiki: Signed kernel modules](https://wiki.archlinux.org/title/Signed_kernel_modules)
- [ArchWiki: Kernel modules](https://wiki.archlinux.org/title/Kernel_module)
- [ArchWiki: DKMS](https://wiki.archlinux.org/title/Dynamic_Kernel_Module_Support)
