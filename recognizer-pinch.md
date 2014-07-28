---
layout: default
title: Pinch recognizer
---

# Hammer.Pinch(options)
Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).

| Option    | Default  | Description       |
| -----------|----------|-------------------|
| event     | pinch    | Name of the event. |
| pointers  | 2        | Required pointers, with a minimal of 2. |
| threshold | 0        | Minimal scale before recognizing. |

## Events
- pinch, together with all of below
- pinchstart
- pinchmove
- pinchend
- pinchcancel
- pinchin
- pinchout

