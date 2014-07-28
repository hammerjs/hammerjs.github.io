---
layout: default
title: jQuery Plugin
---

# jQuery plugin
A small jQuery plugin is available, and is just a small wrapper around the `Hammer()` class.
It also extends the `Manager.emit` method by triggering jQuery events.

````js
$(element).hammer(options).bind("pan", myPanHandler);
````

The Hammer instance is stored at `$element.data("hammer")`.

- [Get the plugin at GitHub](https://github.com/hammerjs/jquery.hammer.js)
