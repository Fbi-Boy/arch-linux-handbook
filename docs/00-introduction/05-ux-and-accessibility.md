---
title: UX and Accessibility
sidebar_label: UX and Accessibility
---

## Purpose

A technical handbook is also a user interface. The reader must scan, understand risk, copy commands, verify outcomes, and recover from mistakes.

## Reader-state design

Every procedure should make the current state obvious:

- **Learning** — explains the concept and decision.
- **Doing** — presents the smallest safe command sequence.
- **Recovering** — preserves evidence and isolates the failure.

Use the visual rhythm:

**STOP → CHECK → VERIFY → CONTINUE**

## Information hierarchy

A page should normally contain:

1. Purpose
2. Prerequisites
3. Decision point
4. Procedure
5. Verification
6. Failure and recovery
7. References

Avoid long undifferentiated command dumps.

## Accessibility rules

Prefer descriptive headings, meaningful link text, tables only when they improve comparison, code blocks with surrounding explanation, sufficient contrast in light and dark themes, keyboard-accessible controls, and information that does not depend on color alone.

Do not use icons as the only label for an action.

## Command presentation

A command block should tell the reader what it changes and how to verify it. Destructive commands require device identification and a stop condition immediately before execution.

## Responsive behavior

The site should remain usable on narrow screens. Navigation must remain reachable, code blocks should scroll horizontally, tables should remain readable, and warnings must not depend on hover.

## Design tokens

Keep the visual system restrained:

- Arch-inspired blue as the accent;
- neutral surfaces for content;
- strong text hierarchy;
- consistent spacing;
- rounded cards used for grouping, not decoration;
- dark mode as a first-class theme.

## Quality gate

Before publishing a page:

- read it once as a beginner;
- read it again as an operator;
- verify every command;
- test links;
- check dark/light contrast;
- check mobile layout;
- confirm recovery guidance exists for risky operations.
