# Documentation Architecture

## Product vision

Arch Linux Handbook is designed as a **technical product**, not a long README.

The reader should always know:

1. where they are;
2. why the step exists;
3. what can go wrong;
4. how to verify success;
5. how to recover;
6. what to do next.

## Visual language

The interface should use:

- calm neutral surfaces;
- strong typography;
- restrained accent color;
- generous but not wasteful spacing;
- clear code blocks;
- visible warning/checkpoint cards;
- consistent iconography;
- responsive navigation;
- excellent dark mode;
- no decorative UI that competes with technical content.

## Navigation

The primary navigation should expose:

- Handbook
- Installation
- Configuration
- Desktop
- Hardware
- Security
- Development
- Troubleshooting
- Reference

The sidebar should reflect the actual execution order without becoming a wall of nested categories.

## Reader states

The design must support three reading modes:

### Learning
Explanations, diagrams, concepts, terminology.

### Doing
Copyable commands, checkpoints, expected results.

### Recovering
Error symptoms, diagnostics, recovery, verification.

A page may support all three, but the doing path must remain visually dominant during installation.

## Responsive design

Desktop:
- persistent documentation navigation;
- readable content column;
- contextual table of contents.

Mobile:
- collapsible navigation;
- full-width code blocks with horizontal scrolling;
- warning cards remain prominent;
- no critical information hidden behind hover.

## Accessibility

The design must maintain:
- keyboard navigation;
- readable contrast;
- semantic headings;
- visible focus states;
- non-color-only status indicators;
- accessible code and links.

## Design references

The implementation follows Docusaurus's supported theme customization model, including custom CSS, stable theme class names, configurable navbar, color mode, and sidebar customization. citeturn0search0turn0search1turn0search2
