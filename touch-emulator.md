---
title: Touch Emulator
---

# Emulate touch on a desktop
A debug tool is available to emulate touch support in the browser. It fires DOM touch events as
[specified by W3C](http://www.w3.org/TR/touch-events). When pressing the `shift` key,
you can also use multi-touch events like pinch and rotate.

The tool triggers DOM touch events, so you can also use this in other projects without Hammer.js.

### Usage
Using it is simple. Just include the javascript file, and call the `Emulator()` function before
any other libraries that does something with the touch input.

It will set some fake properties to spoof the touch detection of some libraries,
and triggers `touchstart`, `touchmove` and `touchend` events on your mouse target.

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

Download the script from the repo, or just run `bower install hammer-touchemulator`.

- [GitHub.com/hammerjs/touchemulator](https://github.com/hammerjs/touchemulator)
- [Example with Hammer.js](http://cdn.rawgit.com/hammerjs/touchemulator/master/tests/manual/hammer.html)
- [Example with Leaflet Maps](http://cdn.rawgit.com/hammerjs/touchemulator/master/tests/manual/leaflet.html)

