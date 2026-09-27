---
title: Contributor Quality Loop
sidebar_label: Contributor Quality Loop
---

## Purpose

This project uses small, reviewable changes even when a feature batch contains many documents.

## Standard loop

```text
PLAN
  ↓
BRANCH
  ↓
WRITE
  ↓
SELF-REVIEW
  ↓
CI
  ↓
CORRECT
  ↓
REVIEW
  ↓
MERGE
  ↓
VERIFY
```

## Commit rules

Prefer commits that answer one question:

- add one technical path;
- improve one navigation surface;
- correct one class of links;
- refine one visual system;
- repair one CI issue.

Avoid commits that mix unrelated rewrites.

## Self-review checklist

Before requesting review:

- Is the procedure technically bounded?
- Is the failure path explicit?
- Are destructive operations guarded?
- Are commands reproducible?
- Are links valid?
- Are sidebar IDs valid?
- Are headings compatible with the Markdown lint rules?
- Does the page work in light and dark themes?
- Is mobile content readable?
- Does the page tell the reader what to verify?

## CI interpretation

A green CI run proves the repository passed the configured automated gates. It does not replace technical review.

A review should therefore inspect both the **diff** and the **reader experience**.

## Design is a quality gate

Documentation is an interface. Typography, spacing, hierarchy, code presentation, navigation, and responsive behavior affect whether a reader can execute a recovery procedure safely.

Keep the visual language consistent with the handbook's STOP → CHECK → VERIFY → CONTINUE model.
