---
layout: default
title: RecognizeWith
---

# Simultaneous recognizing
If you want to recognize two gestures simultaneously, you can use the the `recognizeWith()` method. The example
below does this with the pinch and rotate recognizers, which will improve usability.

````js
var pinch = new Hammer.Pinch();
var rotate = new Hammer.Rotate();
pinch.recognizeWith(rotate);
````

Now Hammer is able to run pinch and rotate the same time. You can also separate them with the `dropRecognizeWith()` method on
the recognizer instance.

**[View an example implementation.](https://cdn.rawgit.com/hammerjs/hammer.js/master/tests/manual/visual.html)**
