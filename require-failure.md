---
layout: default
title: RequireFailure
---

# Require failure of an other recognizer

With the method `requireFailure()` you can let a recognizer require the failure of an other recognizer before recognizing.
This could become useful when you want to nest two gestures, like pan-horizontal and pan-vertical.
Removing the dependency could be done with the `dropRequireFailure()` method.

````js
var horizontal = new Hammer.Pan({
	event: 'panh',
	direction: Hammer.DIRECTION_HORIZONTAL
});
var vertical = new Hammer.Pan({
	event: 'panv',
	direction: Hammer.DIRECTION_VERTICAL
});
vertical.requireFailure(horizontal);
````
**[View an example implementation.](https://cdn.rawgit.com/hammerjs/hammer.js/master/tests/manual/nested.html)**

## Using requireFailure to recognize multiple taps

Because multiple gestures can be recognized simultaneously and a
gesture can be recognized based on the failure of other gestures.
Multiple taps on the same element can be easily recognized on this way:

````js
var hammer = new Hammer(el, {});

var singleTap = new Hammer.Tap({ event: 'singletap' });
var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
var tripleTap = new Hammer.Tap({event: 'tripletap', taps: 3 });

hammer.add([tripleTap, doubleTap, singleTap]);

tripleTap.recognizeWith([doubleTap, singleTap]);
doubleTap.recognizeWith(singleTap);

doubleTap.requireFailure(tripleTap);
singleTap.requireFailure([tripleTap, doubleTap]);
````

When a tap gesture requires a failure to be recognized, its
recognizer will wait a short period to check that the other gesture has
been failed. In this case, you should not assume that its tap gesture event
will be fired immediately.
