---
title: Bluetooth and Audio
---

Bluetooth and audio are layered systems. Diagnose the hardware, kernel driver, service, session, and application separately.

## Bluetooth inventory

```bash
lsusb
lspci -k
rfkill list
systemctl status bluetooth.service
bluetoothctl show
```

For a USB adapter, verify that the kernel exposes the device before debugging pairing.

## Bluetooth workflow

1. Verify radio state.
2. Verify the adapter is visible.
3. Verify BlueZ is running.
4. Scan and pair.
5. Confirm connection.
6. Diagnose audio separately.

Example:

```text
bluetoothctl
power on
agent on
default-agent
scan on
```

Do not paste pairing secrets or private device information into public issue reports.

## Audio layers

Start with ALSA:

```bash
aplay -l
```

Then inspect PipeWire:

```bash
systemctl --user status pipewire.service pipewire-pulse.service
wpctl status
pactl info
```

If there is no sound, determine whether the failure is at ALSA, PipeWire, the selected sink/source, or the application.

## Bluetooth audio

After pairing:

```bash
wpctl status
pactl list sinks short
```

Confirm the Bluetooth sink/profile is present and selected.

## Recovery

For a broken user audio session:

```bash
systemctl --user restart pipewire pipewire-pulse
```

Then re-check:

```bash
wpctl status
pactl info
```

## References

- https://wiki.archlinux.org/title/Bluetooth
- https://wiki.archlinux.org/title/PipeWire
- https://wiki.archlinux.org/title/Sound_system
