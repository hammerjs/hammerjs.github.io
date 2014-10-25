---
layout: default
title: Tips 'n Tricks
---

# Tips 'n Tricks

### Event delegation and DOM events
Hammer is able to trigger DOM events with the option `domEvents: true`. This will give your methods like `stopPropagation()`, so you can use event delgation. Hammer will not unbind the bound events.

### Try to avoid vertical pan/swipe
Vertical panning is used to scroll your page, and some (older) browsers don't send events so Hammer isn't
able to recognize these gestures. An option would be to provide an alternative way to do the same action.

### Test on a real device
Sometimes Hammer just needs some fine-tuning, like the swipe velocity or some other thresholds. Also,
for better performance on slower devices your should try to keep you callbacks as simple as possible.
Sites like [JankFree.org](http://jankfree.org/) have articles about how to improve the performance.

### Remove tap highlight on Windows Phone
IE10 and IE11 on Windows Phone have a small tap highlight when you tap an element. Adding this meta tag
removes this.

````html
<meta name="msapplication-tap-highlight" content="no" />
````

### "I can't select my text anymore!"
Hammer is setting a property to improve the UX of the panning on desktop. Regularly, the desktop browser
would select the text while you drag over the page. The `user-select` css property disables this.

If you care about the text-selection and not so much about the desktop experience, you can simply remove
this option from the defaults. Make sure you do this before creating an instance.

````js
delete Hammer.defaults.cssProps.userSelect;
````

### "After a tap, also a click is being triggered, I don't want that!"
That click event is also being called a 'ghost click'. I've created a small function to prevent clicks after a touchend. It is heavily inspired from [this article from Ryan Fioravanti](https://developers.google.com/mobile/articles/fast_buttons#ghost).

- https://gist.github.com/jtangelder/361052976f044200ea17
