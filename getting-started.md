---
layout: default
title: Getting Started
---

# Getting Started
Hammer is a open-source library that can recognize gestures made by touch, mouse and pointerEvents.
It doesn't have any dependencies, and it's small, only __{{site.data.hammer.gzipped}} minified + gzipped__!

- [Minified code (v{{site.data.hammer.version}})](/dist/hammer.min.js)
- [Uncompressed code (v{{site.data.hammer.version}})](/dist/hammer.js)
- [Changelog](/changelog)
- [Browse the source on GitHub](https://github.com/hammerjs/hammer.js/tree/master/)
- Looking for the 1.1 version? [You can find it here.](https://github.com/hammerjs/hammer.js/tree/1.1.x)

> ##### What's new in 2.0?
It's completely rewritten, with reusable gesture recognizers, and improved support for the recent mobile
browsers by making use of the touch-action css property when possible. Also support for multiple Hammer
instances the same time, so multi-user became possible.

---

## Usage

It's easy to use, just include the library and create a new instance.

````js
var hammertime = new Hammer(myElement, myOptions);
hammertime.on('pan', function(ev) {
	console.log(ev);
});
````

By default it adds a set of `tap`, `doubletap`, `press`, _horizontal_ `pan` and `swipe`, and the
multi-touch `pinch` and `rotate` recognizers. The pinch and rotate recognizers are disabled by default
because they would make the element blocking, but you can enable them by calling:

````js
hammertime.get('pinch').set({ enable: true });
hammertime.get('rotate').set({ enable: true });
````

Enabling vertical or all directions for the `pan` and `swipe` recognizers:

````js
hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
````

Also the viewport meta tag is recommended, it gives more control back to the webpage by disabling the
doubletap/pinch zoom. More recent browsers that support the touch-action property don't require this.

````html
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
````

### More control
You can setup your own set of recognizers for your instance. This requires a bit more code, but it gives you more
control about the gestures that are being recognized.

````js
var mc = new Hammer.Manager(myElement, myOptions);

mc.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
mc.add( new Hammer.Tap({ event: 'quadrupletap', taps: 4 }) );

mc.on("pan", handlePan);
mc.on("quadrupletap", handleTaps);
````
The example above creates an instance containing a `pan` and a `quadrupletap` gesture. The recognizer instances you
create are being executed in the order they are added, and only one can be recognized at the time.

See the pages about the [`recognizeWith`](/recognize-with) and [`requireFailure`](/require-failure) for
more details.

### Notes
Built by [Jorik Tangelder](https://twitter.com/jorikdelaporik). It's recommended to listen to [this loop](http://soundcloud.com/eightmedia/hammerhammerhammer) while using hammer.js.
Follow [@jorikdelaporik](https://twitter.com/jorikdelaporik) for some tweets about this library.
