# Changelog

## v1.0.0 — 2026-09-27

### Added

- Complete installation path from preparation through first boot.
- Bootloader strategy, systemd-boot, initramfs, microcode, UKI, and boot recovery.
- Storage, filesystem, SSD/TRIM, LUKS, Btrfs, and storage recovery guidance.
- Network architecture, wireless recovery, network services, SSH, VPN, and remote access guidance.
- Desktop, GPU, Wayland, Bluetooth, audio, power, and hardware validation guidance.
- Security baseline, service hardening, Secure Boot, firewall, application security, and accessibility guidance.
- Development environment, Git/SSH, AUR, containers, package management, and kernel/driver guidance.
- Maintenance, backup/recovery readiness, observability, package cleanup, and release gates.
- Layered troubleshooting for boot, network, packages, display, hardware, memory, storage, systemd, and signatures.
- Recovery matrix and incident playbooks.
- Command reference, architecture map, navigation/search guidance, and contributor quality loop.
- Responsive documentation landing page and consistent dark/light visual system.
- Automated documentation quality, link, and production build checks.

### Quality

- Destructive procedures are guarded by inspection and verification steps.
- Recovery procedures follow Preserve → Identify → Isolate → Repair → Verify → Record.
- Documentation references prioritize ArchWiki and upstream sources.
- Production build and repository CI are required release gates.

## Unreleased

Future changes are expected to be maintenance and targeted corrections rather than another broad expansion of the handbook scope.
