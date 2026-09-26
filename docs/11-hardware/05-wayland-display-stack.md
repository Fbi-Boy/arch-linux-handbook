---
title: Wayland and Display Stack
sidebar_label: Wayland Display
---

## Purpose

Display problems are easier to solve when the graphical stack is treated as layers rather than as one “desktop” problem.

## Layer model

**GPU → kernel DRM → firmware/driver → Mesa or userspace graphics → Wayland compositor → display manager/session → application**

A failure at one layer can make higher layers appear broken.

## Inventory

Start with evidence:

```bash
lspci -k | grep -A 3 -E 'VGA|3D|Display'
uname -r
lsmod
journalctl -b -k | grep -Ei 'drm|gpu|firmware'
```

Then identify the session:

```bash
loginctl list-sessions
loginctl show-session "$XDG_SESSION_ID" -p Type
echo "$XDG_CURRENT_DESKTOP"
echo "$XDG_SESSION_TYPE"
```

## Wayland vs X11

Wayland is a protocol used by compositors; it is not itself a desktop environment.

A desktop environment may provide a compositor, while a standalone compositor can provide the graphical session directly.

Choose based on:

- hardware compatibility;
- application requirements;
- input/display features;
- remote-desktop requirements;
- maintenance requirements.

Avoid changing several display components simultaneously.

## Black screen workflow

If a graphical login fails:

1. Switch to a TTY.
2. Verify GPU and kernel logs.
3. Check the display manager.
4. Check the session type.
5. Reproduce with the smallest possible graphical configuration.
6. Change one layer at a time.

Useful checks:

```bash
systemctl --failed
systemctl status display-manager
journalctl -b -u display-manager --no-pager
journalctl -b -p err..alert
```

## External display

Inspect connectors and kernel events before changing configuration:

```bash
ls /sys/class/drm/
journalctl -b -k | grep -Ei 'drm|hdmi|displayport|edp'
```

Do not assume a display cable, compositor, GPU driver, or desktop configuration is responsible until evidence narrows the layer.

## Recovery

If the graphical stack is broken but the system boots, the TTY is the primary recovery surface.

Keep a known-good session configuration and record the package/driver changes that preceded the failure.

## Stop conditions

Stop before adding kernel parameters or replacing the graphics stack when:

- the GPU driver has not been identified;
- the failure is not reproducible;
- logs have not been captured;
- multiple display components were changed at once.

## References

- [ArchWiki: Xorg](https://wiki.archlinux.org/title/Xorg)
- [ArchWiki: Wayland](https://wiki.archlinux.org/title/Wayland)
- [ArchWiki: General-purpose_GPU_acceleration](https://wiki.archlinux.org/title/General-purpose_GPU_acceleration)
