# Network Failure Recovery

Network diagnosis works best from the physical interface upward:

**device → radio/link → IP → route → DNS → repository/application**.

## 1. Inventory the interface

```bash
ip -br link
ip -br address
lspci -k
lsusb
```

Determine whether the expected network hardware exists and which kernel driver is attached.

## 2. Check radio state

For Wi-Fi:

```bash
rfkill list
```

If the device is blocked, determine whether the block is hardware or software before changing NetworkManager configuration.

## 3. Check NetworkManager

```bash
systemctl status NetworkManager --no-pager
nmcli device status
nmcli general status
```

If NetworkManager is not running:

```bash
systemctl --failed
journalctl -u NetworkManager -b --no-pager
```

Do not restart services repeatedly without reading the error.

## 4. Check association and IP

```bash
nmcli device
ip -br address
ip route
```

For Wi-Fi, inspect visible networks:

```bash
nmcli device wifi list
```

A connected interface without an address points toward DHCP or network configuration rather than DNS.

## 5. Check routing

```bash
ip route
ping -c 3 <default-gateway>
```

If the gateway cannot be reached, stay at the link/IP/route layer. Changing DNS will not repair a missing route.

## 6. Check DNS separately

Inspect resolver configuration:

```bash
resolvectl status
```

Test a name:

```bash
ping -c 3 archlinux.org
```

If IP connectivity works but names fail, investigate the resolver path rather than reinstalling the network driver.

## 7. Check repositories last

```bash
sudo pacman -Syy
```

Use this only when repository metadata itself needs to be refreshed; do not make forced refreshes the default response to every package error.

Then test the package workflow normally:

```bash
sudo pacman -Syu
```

## Failure map

| Observation | Likely layer |
| --- | --- |
| no interface | hardware/driver/firmware |
| interface exists but Wi-Fi blocked | rfkill/radio |
| associated but no address | DHCP/configuration |
| address exists but gateway fails | routing/link |
| gateway works but names fail | DNS |
| DNS works but repositories fail | mirror/repository/package layer |

## Stop condition

If network configuration changes make the situation less clear, record the current state and revert the last change before continuing.
