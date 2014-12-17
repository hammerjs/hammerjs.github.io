---
layout: default
title: Toggle recognizers
---

# Toggle recognizers at runtime

A gesture can be enabled/disabled based on its `enable` property
which must setup through the `set` call or its constructor parameter.

````js
hammer.get('tap').set({ enable: false });

//Then you could enable it again when necessary

hammer.get('tap').set({ enable: true });
````

Instead of toggling the `enable` property each time on your app, you
could delegate this responsibility to a custom function which will be
checked with each new incoming touch event to decide if the event can be dispatched
to the recognizer or not. This feature provides support to build complex gesture scenarios
based on App/UI logic.

````js
var view = View.extend({
	state: 'ACTIVE',
	score: 0,
	canRecognizeTap: function(recognizer, event) {
		return this.state !== 'INACTIVE' && this.score > 0;
	});
};

var mc = new Hammer.Manager(viewElement, {});
var canEnable = function(rec, input) {
	return view.canRecognizeTap(rec, input);
}
mc.add(new Hammer.Tap({enable: canEnable}));
````

The `Manager.enable` option also works this way.
