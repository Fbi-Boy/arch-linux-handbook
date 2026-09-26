---
title: Laptop Power Management
---

Power management has two layers: kernel/hardware behavior and userspace policy. Avoid stacking multiple power-management daemons that compete for the same controls.

## Baseline inspection

```bash
upower -d
cat /sys/power/mem_sleep
systemctl --failed
```

Check whether an existing power-management service is active before installing another.

## Choose one policy layer

Common approaches include:

- desktop-integrated power profiles;
- power-profiles-daemon;
- TLP.

The correct choice depends on the desktop environment and required controls. Do not run overlapping policy daemons without understanding their interaction.

## Suspend verification

Before changing kernel parameters:

```bash
systemctl suspend
```

After resume:

```bash
journalctl -b -1 -k --no-pager | tail -n 100
journalctl -b -k -p warning..alert --no-pager
```

Compare the previous boot's kernel log with the current state.

## Battery investigation

```bash
upower -e
upower -i "$(upower -e | grep BAT | head -n1)"
```

Record capacity, state, power source, and reported health where available.

## Recovery

If suspend/resume becomes unreliable:

1. revert the most recent power-management change;
2. reproduce with the smallest configuration;
3. inspect kernel and firmware messages;
4. test one policy mechanism at a time.

## References

- https://wiki.archlinux.org/title/Power_management
- https://wiki.archlinux.org/title/TLP
