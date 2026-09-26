# 04 — Network

## Goal
Establish reliable connectivity before package installation.

## Layers
Device → radio/link → association → IP → route → DNS → repository.

## Wi-Fi
Use the live environment wireless tooling to discover the interface, scan, authenticate, and verify connectivity.

## Verification
Test both IP connectivity and DNS resolution. Association alone does not prove that package downloads will work.

## Failure matrix
| Symptom | First checks |
|---|---|
| Interface missing | hardware detection, firmware, rfkill |
| SSID missing | radio state, distance, regulatory state |
| Authentication fails | credentials and security mode |
| No IP | DHCP/network configuration |
| IP works, names fail | DNS |
| Packages fail | routing, DNS, mirror/repository access |

Do not reinstall the OS to solve a network-layer problem.
