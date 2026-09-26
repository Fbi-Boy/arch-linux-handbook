---
title: Desktop Strategy
sidebar_label: Desktop Strategy
---

## Purpose

Choose a desktop stack from workflow, hardware, compatibility, and maintenance requirements. There is no universal desktop choice.

## Before installing

Confirm the base system is healthy:

```bash
systemctl is-system-running
ip -br address
sudo pacman -Syu
```

Do not add a graphical stack while the base system is still being repaired.

## Decision matrix

| Requirement | Direction | Main consideration |
| --- | --- | --- |
| Integrated desktop | GNOME or KDE Plasma | More integrated components |
| Traditional workflow | Xfce | Lower complexity |
| Minimal graphical system | Window manager/compositor | More manual configuration |
| Wayland-first workflow | Wayland desktop/compositor | Application and GPU compatibility |
| Constrained hardware | Lightweight desktop/window manager | Reduce background work and effects |

These are categories, not rankings. Verify current package names and compatibility against ArchWiki before installation.

## Display stack

Wayland is the modern Linux display-protocol direction, while Xorg remains relevant for compatibility and specific workflows. Select the session based on actual application and hardware requirements.

## Installation pattern

Install one intended desktop stack and one intended display manager. Avoid enabling multiple display managers simultaneously.

Verify installed display-manager units:

```bash
systemctl list-unit-files --type=service | grep -E 'display-manager|gdm|sddm|lightdm'
```

## Verification gate

After reboot:

```bash
loginctl list-sessions
loginctl show-session "$XDG_SESSION_ID" -p Type
systemctl --failed
```

The graphical session should start, the session type should match the intended stack, and unrelated failed units should be investigated.

## Recovery

If the graphical session fails, switch to a TTY with `Ctrl+Alt+F3` and inspect the smallest failing layer:

```bash
systemctl status display-manager
journalctl -b -p err..alert
systemctl --failed
```

Do not reinstall the whole desktop before identifying whether the failure is the display manager, GPU driver, session, or user configuration.

## Next step

Continue with hardware and graphics configuration before performance tuning.

## References

- ArchWiki: Desktop environment
- ArchWiki: Wayland
- ArchWiki: Xorg
- ArchWiki: Display manager
