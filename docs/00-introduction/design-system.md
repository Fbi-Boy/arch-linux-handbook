# Documentation Design System

## Design goals
The website should feel like a professional engineering handbook: dense enough for technical work, but readable for beginners.

## Information hierarchy
1. Page title
2. Goal
3. Prerequisites
4. Procedure
5. Checkpoint
6. Expected result
7. Troubleshooting
8. Recovery
9. References

## UI patterns

### Warning
Use for data loss, security consequences, and irreversible operations.

### Checkpoint
Use after every meaningful phase. The reader should know exactly what must be true before continuing.

### Troubleshooting
Use for known failure symptoms with a deterministic diagnostic path.

### Command block
Show one logical operation per block. Explain placeholders before the command.

### Decision table
Use when the correct path depends on hardware, firmware, filesystem, or installation intent.

## Accessibility
- High contrast text
- Descriptive link labels
- No information conveyed by color alone
- Keyboard-accessible navigation
- Clear heading hierarchy
- Responsive code blocks

## Design reference
Docusaurus documentation supports hierarchical pages and ordered sidebars, which matches the handbook's numbered information architecture.
