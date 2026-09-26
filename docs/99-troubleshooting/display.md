# Display and Black-Screen Troubleshooting

Graphics failures should be separated into hardware detection, kernel driver, firmware/userspace, session, and display-manager layers.

## 1. Determine whether the system is alive

Try a TTY:

```text
Ctrl + Alt + F3
```

If a TTY works, the system is running and the failure is likely above the basic boot layer.

Inspect:

```bash
systemctl --failed
loginctl list-sessions
```

## 2. Identify the GPU and driver

```bash
lspci -k | grep -A 3 -E 'VGA|3D|Display'
lsmod
uname -r
```

Kernel messages:

```bash
journalctl -b -k | grep -Ei 'drm|gpu|firmware'
```

Do not install a different graphics driver before identifying the existing GPU and driver.

## 3. Check the display manager

Identify likely display-manager services:

```bash
systemctl list-unit-files --type=service | grep -E 'display-manager|gdm|sddm|lightdm'
```

Then inspect the active failure:

```bash
systemctl status display-manager --no-pager
journalctl -u display-manager -b --no-pager
```

If the generic unit is unavailable, inspect the actual enabled display-manager service.

## 4. Separate session problems

Determine the session type from an active graphical session:

```bash
loginctl show-session "$XDG_SESSION_ID" -p Type
```

A failure that occurs only under one session type should be diagnosed differently from a GPU driver failure affecting every session.

## 5. External display failures

Inspect connectors and kernel messages:

```bash
ls /sys/class/drm/
journalctl -b -k | grep -Ei 'drm|hdmi|displayport|edid'
```

Test one known-good cable/display combination before changing drivers or kernel parameters.

## 6. Recovery

If the last change introduced the black screen:

1. switch to a TTY;
2. inspect the change;
3. revert one configuration change;
4. restart the affected service or reboot;
5. verify;
6. document the result.

Do not stack multiple experimental kernel parameters.

## Stop conditions

Stop and preserve logs when:

- the GPU is not detected;
- kernel logs show repeated hardware/firmware errors;
- the display fails before any userspace session starts;
- storage or filesystem errors appear alongside the graphics failure.

The objective is to identify the smallest failing layer, not to reinstall the entire graphics stack.
