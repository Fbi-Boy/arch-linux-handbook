---
id: live-environment
title: Boot the live environment
sidebar_label: Boot the live environment
---

The live environment is the controlled workspace used to inspect hardware, establish networking, partition storage, install the base system, and enter the new system with `arch-chroot`.

## 1. Firmware boot menu

Insert the verified installation USB and open the firmware boot menu.

Prefer the entry explicitly marked as UEFI when the target installation is UEFI.

Disable assumptions about vendor-specific keys: common examples include F12, F9, Esc, or a dedicated boot-menu key.

## 2. Confirm the environment

After booting, inspect:

```bash
uname -m
cat /sys/firmware/efi/fw_platform_size
```

For a normal x86_64 UEFI installation, expect:

```text
x86_64
64
```

## 3. Keyboard layout

The live environment uses the US keymap by default. List available keymaps:

```bash
localectl list-keymaps
```

Load the required layout:

```bash
loadkeys <layout>
```

Example:

```bash
loadkeys us
```

Test characters that matter for commands, especially `/`, `-`, `_`, `:`, and `@`.

## 4. Network gate

Inspect interfaces:

```bash
ip link
```

For wired networking, connect the cable and test connectivity.

For Wi-Fi, use the tools available in the current live image and verify the connection before continuing.

Then test both IP reachability and DNS:

```ping -c 3 1.1.1.1
ping -c 3 archlinux.org
```

## 5. Time

Check:

```timedatectl status
```

If the live environment's time service is inactive, enable network time synchronization as appropriate:

```timedatectl set-ntp true
```

Recheck before package installation.

## Stop conditions

Return to firmware configuration or fix the live environment if:

- the machine booted the wrong mode,
- the target disk is not visible,
- networking cannot be established,
- the keyboard layout prevents reliable command entry,
- or system time is clearly incorrect.

## Next

Continue to [storage planning](../../05-storage/01-partitioning-strategy.md) only after the preflight gate passes.
