---
title: Learning and Recovery Map
sidebar_label: Learning and Recovery Map
---

## Start with the reader's state

Use the handbook as a map rather than reading every page linearly.

| State | Start here | Goal |
| --- | --- | --- |
| Learning | Architecture and command reference | Understand the layers |
| Installing | Installation path | Build a working baseline |
| Configuring | Desktop, hardware, security | Add capabilities deliberately |
| Debugging | Troubleshooting | Classify the failure |
| Recovering | Recovery and storage drills | Restore service without destroying evidence |
| Maintaining | Maintenance and observability | Keep the system understandable |

## Failure-first navigation

When something breaks, identify the smallest failing layer:

**Firmware → Bootloader → Kernel → Initramfs → Root filesystem → Userspace → Service → Application**

For network failures:

**Device → Link → Address → Route → DNS → Application**

For hardware:

**Detect → Identify → Driver → Firmware → Service → Userspace → Verify**

## Verification gates

At each layer, answer:

1. What evidence proves the layer is working?
2. What is the smallest change that could repair it?
3. How will the repair be reversed if it fails?

## Recovery principle

Do not jump from symptom to destructive repair.

Preserve evidence first, identify the layer, isolate one variable, repair it, verify the result, and record the outcome.

## Next step

After recovery, return to the normal path and document the root cause. A handbook becomes more valuable when failure cases become reusable knowledge.
