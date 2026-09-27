---
title: Hardware Validation
sidebar_label: Hardware Validation
---

## Purpose

Hardware support is not proven by package installation. Validate the path from physical device to userspace.

## Inventory

~~~~bash
lspci -nn
lsusb
lsblk -o NAME,MODEL,SIZE,FSTYPE,MOUNTPOINTS
lscpu
free -h
ip -br link
~~~~

## Driver validation

~~~~bash
lspci -k
~~~~

Confirm the expected driver is bound to the intended device.

## Firmware validation

~~~~bash
journalctl -b -k | grep -Ei 'firmware|failed|error'
~~~~

Correlate warnings with the affected device.

## Functional validation

Test the actual user-facing function:

- network: obtain an address and reach the intended destination;
- audio: identify the device and test playback/capture;
- graphics: verify the session and acceleration path;
- storage: mount and test read/write;
- Bluetooth: pair and validate the intended profile.

## Regression record

Record hardware model, kernel version, driver, firmware package, test, and result.

## References

- [ArchWiki: General recommendations](https://wiki.archlinux.org/title/General_recommendations)
- [ArchWiki: Hardware detection](https://wiki.archlinux.org/title/Category:Hardware_detection_and_troubleshooting)
