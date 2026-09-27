---
title: Installation Validation
sidebar_label: Installation Validation
---

## Purpose

A successful installation is more than a successful reboot. Validate firmware mode, storage topology, boot path, identity, networking, and package state.

## Firmware and storage

~~~~bash
test -d /sys/firmware/efi && echo UEFI
lsblk -f
findmnt -R /
~~~~

Confirm the expected ESP, root filesystem, and mount relationships.

## Boot validation

~~~~bash
bootctl status
efibootmgr -v
uname -r
~~~~

Confirm the intended boot entry, kernel, and initramfs are present.

## System identity

~~~~bash
hostnamectl
timedatectl status
localectl status
id
~~~~

## Network and services

~~~~bash
ip -br address
systemctl --failed
systemctl is-system-running
~~~~

## Package state

~~~~bash
pacman -Q
pacman -Qe
~~~~

## Acceptance gate

The installation can move to post-install configuration when the expected storage topology, boot path, identity, network, and service state are verified.

If one gate fails, repair that layer before adding more software.

## References

- [ArchWiki: General recommendations](https://wiki.archlinux.org/title/General_recommendations)
- [ArchWiki: Installation guide](https://wiki.archlinux.org/title/Installation_guide)
