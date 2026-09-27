---
title: Handbook Quality Gate
sidebar_label: Handbook Quality Gate
---

## Purpose

This handbook is maintained like a technical product. Every new procedure should be reviewable, reproducible, accessible, and recoverable.

## Content gate

Before merging a page:

- explain the goal and assumptions;
- show the decision point;
- provide the smallest useful command sequence;
- provide verification;
- describe failure and recovery;
- link authoritative references;
- avoid unsupported universal claims.

## Safety gate

For storage, encryption, boot, firewall, package signing, and Secure Boot topics:

- identify the target before changing it;
- state destructive-operation boundaries;
- preserve recovery paths;
- never hide risk behind a copy-paste command.

## Design gate

Check:

- light and dark theme;
- mobile layout;
- heading hierarchy;
- code-block readability;
- table overflow;
- keyboard access;
- warning visibility without relying on color alone.

## Technical gate

Run the repository CI checks:

1. documentation quality;
2. link validation;
3. Docusaurus build.

Fix the root cause instead of weakening a quality rule.

## Review gate

Self-review the rendered page as:

- a beginner learning the concept;
- an operator following the procedure;
- a person recovering from failure.

A page is ready when all three perspectives can reach the intended verification point without guessing.

## Maintenance gate

After publication, revisit pages when Arch Linux, Docusaurus, package tooling, or referenced upstream interfaces materially change.
