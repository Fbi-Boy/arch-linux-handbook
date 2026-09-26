---
title: Application Security Baseline
sidebar_label: Application Security
---

## Purpose

System hardening is incomplete if applications, credentials, and network exposure are ignored.

## Threat model first

Document:

- what data needs protection;
- who can access it;
- what network exposure exists;
- what happens if the machine is lost;
- what recovery capability is required.

Security controls should be tied to a threat, not added blindly.

## Secrets

Do not store credentials in:

- Git repositories;
- shell history;
- public issue reports;
- screenshots;
- documentation examples.

Inspect a project before adding secret handling:

```bash
git status
git grep -n -E 'password|secret|token|api[_-]?key'
```

Treat the output as sensitive if it reveals real credentials.

## File permissions

Inspect sensitive files:

```bash
stat -c '%a %U:%G %n' ~/.ssh/* 2>/dev/null
find ~/.ssh -maxdepth 1 -type f -printf '%m %u:%g %p\n' 2>/dev/null
```

Use the narrowest permissions that satisfy the application.

## Network exposure

Inventory listeners:

```bash
ss -lntup
```

For every exposed service, know:

- why it listens;
- which interface it binds to;
- which users/processes own it;
- whether authentication is enabled;
- whether a firewall policy limits access.

## Supply chain

Prefer official repositories when they satisfy the requirement. For AUR packages and third-party software, inspect build instructions and understand the source before installation.

Do not treat “it installs” as equivalent to “it is trusted.”

## Updates

Keep software current through the package management workflow established elsewhere in this handbook. Avoid partial upgrades and avoid mixing package sources without understanding their compatibility.

## Verification gate

After a security-sensitive change:

```bash
systemctl --failed
ss -lntup
journalctl -b -p warning
```

Then verify the application itself from the intended trust boundary.

## Recovery

If a credential or token may have been exposed:

1. Assume it is compromised.
2. Revoke/rotate it at the issuing service.
3. Remove it from the repository/history where appropriate.
4. Audit logs and access.
5. Document the incident and recovery steps.

Do not merely delete the visible secret and assume the problem is solved.

## References

- ArchWiki: Security
- ArchWiki: General recommendations
- ArchWiki: AUR
