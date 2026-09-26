# Network Failure Recovery

## Triage layers
1. Device detected
2. Radio enabled
3. Link/association established
4. IP address assigned
5. Default route available
6. DNS works
7. Repository endpoint reachable

## Rule
Test one layer at a time. Avoid changing multiple network components simultaneously.

## Common outcomes
- Missing interface → hardware/firmware path
- Wi-Fi disabled → rfkill/radio path
- Authentication failure → credentials/security path
- No address → DHCP path
- IP works but names fail → DNS path
- DNS works but packages fail → routing/repository/mirror path
