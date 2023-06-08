---
layout: default
title: Rotate recognizer
---

# Hammer.Rotate(options)

Recognized when two or more pointer are moving in a circular motion.

| Option    | Default  | Description       |
|----------|----------|-------------------|
| event     | rotate   | Name of the event. |
| pointers  | 2        | Required pointers, with a minimal of 2. |
| threshold | 0        | Minimal rotation before recognizing. |

## Events
- rotate, together with all of below
- rotatestart
- rotatemove
- rotateend
- rotatecancel

## Notes
This recognizer is disabled by default because it would make the element blocking. You can enable it by calling:
````js
hammertime.get('rotate').set({ enable: true });
````
