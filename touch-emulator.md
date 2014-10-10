---
layout: default
title: Touch Emulator
---

# Emulate touch on a desktop
Hammer provides a debug tool to emulate touch support in the browser. It fires DOM touch events as
[specified by W3C](http://www.w3.org/TR/touch-events). When pressing the `shift` key,
you can also use multi-touch events like pinch and rotate. You can also use this in other projects without Hammer.js.

## How to use
Include the javascript file, and call the `TouchEmulator()` function before any other libraries that do something with the 
touch input. It will set some fake properties to spoof the touch detection of some libraries, and triggers `touchstart`, `touchmove` and `touchend` events on the mouse target.
 
````html
<script src="touch-emulator.js"></script>
<script> TouchEmulator(); </script>
````

````js
function log(ev) {
 console.log(ev);
}

document.body.addEventListener('touchstart', log, false);
document.body.addEventListener('touchmove', log, false);
document.body.addEventListener('touchend', log, false);
````

Also, the script includes polyfills for `document.createTouch` and `document.createTouchList`.

## How it works
It listens to the `mousedown`, `mousemove` and `mouseup` events, and translates them to touch events. If the mouseevent
has the `shiftKey` property to `true`, it enables multi-touch. 

The script also prevents the following mouse events on the page: 
`mousedown`, `mouseenter`, `mouseleave`, `mousemove`, `mouseout`, `mouseover` and `mouseup`.

## Web platform tests
The script has been tested with the w3c web platform tests and passes all tests, except these;

- *assert_true: event is a TouchEvent event expected true got false*
  - We trigger an event of the type `Event`
- *assert_equals: touch list is of type TouchList expected "[object TouchList]" but got "[object Array]"*
- *assert_equals: touch is of type Touch expected "[object Touch]" but got "[object Object]"*

## Bookmarklet
````js
javascript:!function(a){var b=a.createElement("script");b.onload=function(){TouchEmulator()},b.src="//cdn.rawgit.com/hammerjs/touchemulator/0.0.2/touch-emulator.js",a.body.appendChild(b)}(document);
````

Download the script from the repo, or just run `bower install hammer-touchemulator`.

- [GitHub.com/hammerjs/touchemulator](https://github.com/hammerjs/touchemulator)
- [Example with Hammer.js](http://cdn.rawgit.com/hammerjs/touchemulator/master/tests/manual/hammer.html)
- [Example with Leaflet Maps](http://cdn.rawgit.com/hammerjs/touchemulator/master/tests/manual/leaflet.html)

