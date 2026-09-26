---
title: Handbook Design System
sidebar_label: Design System
---

## Purpose

The handbook UI should make technical decisions easier to scan while keeping the visual system restrained and consistent.

## Visual language

Use:

- strong typographic hierarchy;
- neutral surfaces;
- one restrained Arch-inspired accent;
- generous spacing;
- readable code blocks;
- clear warning and checkpoint treatments;
- consistent iconography;
- responsive navigation;
- dark and light themes.

## Reader states

Every procedural page should support three states:

**Learning** — understand the model and decision.

**Doing** — execute the smallest safe procedure.

**Recovering** — diagnose failure without destroying evidence.

## Content rhythm

Prefer this sequence:

### Standard page rhythm

Purpose → Prerequisites → Decision → Procedure → Verification → Failure → Recovery → References

Long pages should use short sections, tables, callouts, and command blocks rather than dense walls of text.

## Safety language

Use explicit visual distinction for:

- destructive operations;
- irreversible changes;
- stop conditions;
- verification gates;
- recovery procedures.

Do not hide safety-critical information in footnotes.

## Responsive behavior

The site should remain usable at narrow widths:

- navigation collapses cleanly;
- code blocks remain horizontally scrollable;
- tables may scroll rather than shrink unreadably;
- controls retain adequate touch targets;
- important warnings remain visible without hover.

## Accessibility

Visual polish must not reduce usability. Maintain:

- semantic headings;
- keyboard navigation;
- visible focus states;
- sufficient contrast;
- descriptive link text;
- meaningful labels for controls;
- reduced-motion compatibility.

## Quality gate

A new page is design-complete when its structure, typography, safety states, responsive behavior, and accessibility remain consistent with the existing handbook.

The design system is a constraint for future contributions, not a one-time landing-page treatment.
