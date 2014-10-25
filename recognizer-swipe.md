---
layout: default
title: Swipe recognizer
---

# Hammer.Swipe(options)
Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.

| Option    | Default  | Description       |
|-----------|----------|-------------------|
| event     | swipe    | Name of the event. |
| pointers  | 1        | Required pointers. |
| threshold | 10       | Minimal distance required before recognizing. |
| direction | DIRECTION_ALL | Direction of the panning. |
| velocity  | 0.65     | Minimal velocity required before recognizing, unit is in px per ms. |

## Events
- swipe, together with all of below
- swipeleft
- swiperight
- swipeup
- swipedown

## Notes
When calling `Hammer()` to create a simple instance, the pan and swipe recognizers are configured to only detect horizontal gestures.
