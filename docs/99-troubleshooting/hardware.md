# Hardware and Peripheral Troubleshooting

Hardware problems should be reduced from device detection to driver, firmware, service, and userspace behavior.

## Inventory

```bash
lspci -nnk
lsusb
lsblk -f
rfkill list
```

Record the exact device ID before searching for a driver or workaround.

## Wi-Fi

Check:

```bash
ip -br link
rfkill list
lspci -k
journalctl -b -k | grep -Ei 'wifi|wlan|firmware|iwlwifi|ath|rtw'
```

Separate radio-blocked, driver-missing, firmware-failed, association, DHCP, and DNS failures.

## Bluetooth

Check:

```bash
systemctl status bluetooth.service
bluetoothctl show
journalctl -u bluetooth.service -b --no-pager
```

If the adapter disappears after suspend, compare kernel and Bluetooth logs across the suspend/resume boundary.

## Audio

```bash
aplay -l
wpctl status
pactl info
```

If ALSA sees no device, do not start by changing PipeWire profiles. Fix the lower layer first.

## Webcam

```bash
lsusb
v4l2-ctl --list-devices
```

If the device exists but an application cannot access it, inspect permissions and the application's portal/session behavior.

## Touchpad and input

```bash
libinput list-devices
journalctl -b -k | grep -Ei 'input|i2c|hid'
```

Avoid random kernel parameters. First identify the controller and the failing layer.

## Recovery pattern

**Detect → Identify → Driver → Firmware → Service → Userspace → Verify**

Change one layer at a time and record the result.

## References

- https://wiki.archlinux.org/title/Network_configuration/Wireless
- https://wiki.archlinux.org/title/Bluetooth
- https://wiki.archlinux.org/title/PipeWire
- https://wiki.archlinux.org/title/Libinput
