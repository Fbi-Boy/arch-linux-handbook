---
title: Accessibility and Secure Input
sidebar_label: Accessibility & Input
---

## Purpose

Accessibility is part of a usable system, not a final cosmetic layer. Input and assistive technologies should be configured without weakening the system's security boundary.

## Input inventory

Identify the hardware and session first:

```bash
lsusb
libinput list-devices
loginctl list-sessions
echo "$XDG_SESSION_TYPE"
```

Record keyboard, mouse, touchpad, touchscreen, display, and audio requirements.

## Assistive technologies

Document the actual requirement before installing additional software:

- screen magnification;
- screen reader;
- high-contrast or larger UI;
- keyboard navigation;
- alternative input devices;
- speech input;
- visual or auditory notifications.

Prefer desktop-native accessibility controls when they satisfy the requirement.

## Secure input

Accessibility software may legitimately need access to input or screen content. Treat that access as privileged capability.

Before enabling a component, identify:

- what data it can observe;
- what input it can generate;
- whether it starts automatically;
- what user account runs it;
- whether remote access is involved.

Do not grant broad system permissions merely because an accessibility application requests them.

## Verification

After configuration:

```bash
systemctl --failed
loginctl list-sessions
journalctl -b -p warning
```

Then test the actual accessibility workflow rather than only checking that a package is installed.

## Recovery

Keep a normal keyboard/TTY path available. If an accessibility component interferes with login or input:

1. switch to a TTY;
2. disable the smallest affected component;
3. restore the previous configuration;
4. verify the session;
5. document the working configuration.

## References

- [ArchWiki: Accessibility](https://wiki.archlinux.org/title/Accessibility)
- [ArchWiki: Input device](https://wiki.archlinux.org/title/Input_device)
