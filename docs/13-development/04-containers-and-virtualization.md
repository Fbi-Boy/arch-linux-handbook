---
title: Containers and Virtualization
sidebar_label: Containers & Virtualization
---

## Purpose

Containers and virtual machines solve different isolation problems. Choose the smallest abstraction that matches the workload.

## Decision point

| Requirement | Prefer |
| --- | --- |
| Isolate application dependencies | Containers |
| Run another operating system kernel | Virtual machine |
| Reproduce a development environment | Containers or lightweight VM |
| Stronger kernel boundary | Virtual machine |
| GUI application needing full guest OS | Virtual machine |

This is a workload decision, not a performance ranking.

## Baseline host checks

Before enabling virtualization:

```bash
lscpu | grep -E 'Virtualization|Model name'
grep -E 'vmx|svm' /proc/cpuinfo | head
lsmod | grep -E 'kvm|kvm_(intel|amd)'
```

Record CPU virtualization support, memory capacity, storage capacity, and networking requirements.

## Containers

Containerization shares the host kernel. Treat container images and package sources as software supply-chain inputs.

Before running an image, inspect:

- image source;
- version/tag or digest;
- exposed ports;
- mounted host paths;
- environment variables and secrets;
- required privileges;
- persistent volumes.

Do not mount sensitive host directories by default.

## Virtual machines

A VM adds a guest kernel and virtual hardware layer. Verify that the host has enough memory and storage before creating one.

For KVM-based virtualization, inspect:

```bash
lsmod | grep kvm
sudo journalctl -b -k | grep -Ei 'kvm|virt'
```

## Networking

Treat container/VM networking as another trust boundary.

Inventory listening services:

```bash
ss -lntup
ip -br address
ip route
```

Do not expose management interfaces to the network unless required.

## Storage

Keep VM disks and container volumes on a filesystem with enough free space and a clear backup policy.

A VM disk image is data. It should be backed up according to the same recovery objectives as other important data.

## Recovery

When an isolated workload fails:

1. Determine whether the host is healthy.
2. Determine whether the guest/container starts.
3. Check storage and networking.
4. Inspect logs.
5. Reproduce with the smallest configuration.
6. Restore data from backup when required.

Do not “fix” a container failure by granting broad host privileges without understanding the original failure.

## Stop conditions

Stop when:

- virtualization support is absent or disabled;
- host memory/storage is insufficient;
- a workload requires unexplained privileged access;
- a container image source cannot be trusted;
- networking exposure is unclear.

## References

- ArchWiki: KVM
- ArchWiki: Podman
- ArchWiki: Docker
