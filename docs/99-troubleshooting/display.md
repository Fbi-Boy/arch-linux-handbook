# Display and Black-Screen Troubleshooting

## Triage
1. Can the machine reach a TTY?
2. Is the GPU detected?
3. Is the expected driver/firmware installed?
4. Is the display manager failing?
5. Does the desktop fail only under one session type?
6. Are kernel parameters or custom graphics settings involved?

## Rule
Do not stack random driver packages or kernel parameters. Record the current state, change one variable, and retest.

## Recovery
Use a TTY or live-environment chroot to revert the last known graphics configuration change.
