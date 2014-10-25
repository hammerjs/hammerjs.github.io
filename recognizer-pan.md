---
layout: default
title: Pan recognizer
---

# Hammer.Pan(options)
Recognized when the pointer is down and moved in the allowed direction.

| Option    | Default  | Description       |
| -----------|----------|-------------------|
| event     | pan      | Name of the event. |
| pointers  | 1        | Required pointers. 0 for all pointers. |
| threshold | 10       | Minimal pan distance required before recognizing. |
| direction | DIRECTION_ALL | Direction of the panning. |

## Events
- pan, together with all of below
- panstart
- panmove
- panend
- pancancel
- panleft
- panright
- panup 
- pandown

## Notes
When calling `Hammer()` to create a simple instance, the pan and swipe recognizers are configured to only detect horizontal gestures.
