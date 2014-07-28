---
layout: default
title: Touch Action
---

# The Touch-action property
Chrome 35+, IE10+ and soon FireFox, support the `touch-action` property. This property tells the browser how to
handle touches on an element. It improves the detection and experience of the gestures a lot, because it can prevent
scrolling of the page without any JavaScript has to be executed, which can be too late in some cases.

Hammer uses a javascript fallback for this property when needed, so it is working with non-supporting browsers
too. Still, on some (unpopular) devices the fallback might not work as good as the native support.

By default it sets a value based on the recognizer settings. You can overwrite this by giving the option `touchAction`
to the Manager.

When you set the touchAction to `auto` it doesnt prevent any defaults, and Hammer would probably break. You have to
call `preventDefault` manually to fix this. You should only use this if you know what you're doing.

**[View the touch-action test.](https://cdn.rawgit.com/hammerjs/hammer.js/master/tests/manual/touchaction.html)**

### Preferred touch-action values per gesture
If you _do_ want to set your own value, then the table below should help you a bit...

| Gesture | Least restrictive touch-action value  |
| ---------|---------------------------------------|
| press   | auto               |
| tap     | auto               |
| multitap | manipulation      |
| vertical pan/swipe | pan-x   |
| horizontal pan/swipe | pan-y |
| rotate  | pan-x pan-y        |
| pinch   | pan-x pan-y        |
