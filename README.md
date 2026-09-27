# Arch Linux Handbook

> Professional, practical, recovery-first documentation for installing, configuring, securing, troubleshooting, and maintaining Arch Linux.

## v1.0.0

The first release candidate of the handbook is complete as a cohesive documentation product: installation, system configuration, boot, desktop, hardware, security, development, maintenance, dual boot, troubleshooting, and recovery are connected by one verification-first workflow.

## Handbook flow

**Prepare → Verify → Install → Configure → Boot → Desktop → Hardware → Secure → Develop → Maintain → Recover**

The operating principle is:

**STOP → CHECK → VERIFY → CONTINUE**

## Start here

1. [Introduction](docs/00-introduction/README.md)
2. [Preparation](docs/01-preparation/README.md)
3. [Installation media](docs/02-installation-media/README.md)
4. [Boot](docs/03-boot/README.md)
5. [Network](docs/04-network/README.md)
6. [Storage](docs/05-storage/README.md)
7. [Base installation](docs/06-installation/README.md)
8. [System configuration](docs/07-system-configuration/README.md)
9. [Bootloader](docs/08-bootloader/README.md)
10. [Desktop](docs/10-desktop/README.md)
11. [Hardware](docs/11-hardware/README.md)
12. [Security](docs/12-security/README.md)
13. [Development](docs/13-development/README.md)
14. [Dual boot](docs/14-dual-boot/README.md)
15. [Maintenance](docs/15-maintenance/README.md)
16. [Troubleshooting](docs/99-troubleshooting/README.md)

## Quality model

Every major procedure is designed around:

- prerequisites and decision points;
- explicit verification;
- failure classification;
- recovery guidance;
- authoritative references;
- destructive-operation safety gates.

Automated repository gates validate documentation quality, local links, and the Docusaurus production build.

## Project standards

- Prefer official Arch Linux and upstream documentation.
- Never assume a disk name or hardware identifier.
- Avoid partial upgrades.
- Do not disable package signature verification as a troubleshooting shortcut.
- Preserve evidence before recovery.
- Make one controlled change at a time.
- Keep generic procedures separate from hardware-specific paths.

## References

- [ArchWiki Installation Guide](https://wiki.archlinux.org/title/Installation_guide)
- [ArchWiki General Recommendations](https://wiki.archlinux.org/title/General_recommendations)
- [ArchWiki System Maintenance](https://wiki.archlinux.org/title/System_maintenance)
- [Arch Linux Wiki](https://wiki.archlinux.org/)

## Development

Requirements:

- Node.js 20 or newer
- npm

Run locally:

```bash
npm install
npm run start
```

Build the production site:

```bash
npm run build
```

## Project status

**Release:** v1.0.0  
**Status:** stable documentation baseline  
**Maintenance model:** update technical guidance when upstream behavior or supported workflows change.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), and [CHANGELOG.md](CHANGELOG.md).
