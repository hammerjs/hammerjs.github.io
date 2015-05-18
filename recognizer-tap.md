---
layout: default
title: Tap recognizer
---

# Hammer.Tap(options)
Recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur between the given
interval and position.  The eventData from the emitted event contains the property `tapCount`,
which contains the amount of multi-taps being recognized.

If an Tap recognizer has a failing requirement, it waits the interval time before emitting the event. This is
because if you want to only trigger a doubletap, hammer needs to see if any other taps are coming in.
[Read more about requireFailure](/require-failure)

| Option    | Default  | Description       |
|-----------|----------|-------------------|
| event     | tap      | Name of the event. |
| pointers  | 1        | Required pointers. |
| taps      | 1        | Amount of taps required. |
| interval  | 300      | Maximum time in ms between multiple taps. |
| time      | 250      | Maximum press time in ms. |
| threshold | 2        | While doing a tap some small movement is allowed. |
| posThreshold | 10    | The maximum position difference between multiple taps. |

## Events
- tap

