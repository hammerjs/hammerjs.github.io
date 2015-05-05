---
layout: default
title: API
---

# General API

- [Hammer](#hammer)
- [Hammer.defaults](#hammer.defaults)
- [Hammer.Manager](#hammer.manager)
- [Hammer.Recognizer](#hammer.recognizer)
- [Hammer.input event](#hammer.input-event)
- [Event object](#event-object)
- [Constants](#constants)
- [Utils](#utils)

## Hammer
Creates a Manager instance with a default set of recognizers and returns the manager instance. The default set
contains `tap`, `doubletap`, `pan`, `swipe`, `press`, `pinch` and `rotate` recognizer instances.

You should only use this when you're fine with the default setup, or have set your own initial setup.

### Contructor(HTMLElement, [options])
Just your element, and options. the options will be merged with Hammer.defaults. Also,
the recognizer set as defined in `Hammer.defaults.preset` will be added.

If you'll pass an empty `recognizer` option, no initial recognizers will be added.

````js
var myElement = document.getElementById('hitarea');
var mc = new Hammer(myElement);
````

---

## Hammer.defaults
The defaults when creating an instance that are merged being with your options.

### touchAction: 'compute'
Accepts the `compute`, `auto`, `pan-y`, `pan-x` and `none` values. The default option will choose the
correct value for you, based on the recognizers.

### domEvents: false
Let Hammer also fire DOM events. This is a bit slower, so disabled by default. Recommended to set to `true` if you want to play with event delegation.

### enable: true
Accepts a boolean, or an function that should return a boolean which is.

### cssProps: {....}
A collection of css properties that improve the handling of the input events. For details [take a look at
the JSDoc.](/jsdoc/Hammer.defaults.cssProps.html)

### preset: [....]
Default recognizer setup when calling `Hammer()`. When creating a new Manager these will be skipped.

By default it adds a set of `tap`, `doubletap`, `press`, _horizontal_ `pan` and `swipe`, and the
multi-touch `pinch` and `rotate` recognizers. The pinch and rotate recognizers are disabled by default
because they would make the element blocking.

---

## Hammer.Manager
The Manager is the container of all the recognizer instances for your element. It sets up the input
event listeners, and sets the touch-action property for you on the element.

### constructor(HTMLElement, [options])
Just your element, and options. the options will be merged with Hammer.defaults.

````js
var mc = new Hammer.Manager(myElement);
````

You can setup an initial recognizer set with the option `recognizers`. The Array should be structured
like this;

````js
var mc = new Hammer.Manager(myElement, {
	recognizers: [
		// RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
		[Hammer.Rotate],
		[Hammer.Pinch, { enable: false }, ['rotate']],
		[Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
	]
});
````

### set(options)
Change an option on the manager instance. Using this method is recommended,
because it will update the `touchAction` value if needed.

````js
mc.set({ enable: true });
````

### get(string), add(Recognizer) and remove(Recognizer)
Add a new `Recognizer` instance to the Manager. The order of adding is also the order of the recognizers being
executed. Just like the `get` method, it returns the added `Recognizer` instance.
The `get` and `remove` methods takes the event name (from a recognizer) or a recognizer instance as an argument.

Add and remove also accept an array of recognizers.

````js
// both return instance of myPinchRecognizer
mc.get('pinch');
mc.get(myPinchRecognizer);
````

````js
mc.add(myPinchRecognizer); // returns the recognizer
mc.add([mySecondRecogizner, myThirdRecognizer]);
````

````js
mc.remove(myPinchRecognizer);
mc.remove('rotate');
mc.remove([myPinchRecognizer, 'rotate']);
````

### on(events, handler) and .off(events, [handler])
Listen to events triggered by the added recognizers, or remove the binded events. Accepts multiple events seperated
by a space.

````js
mc.on("pinch", function(ev) {
	console.log(ev.scale);
});
````

### stop([force])
Stop recognizing for the current input session. When forced, the recognizer cycle is stopped immediately.

### destroy()
Unbinds all events and input events and makes the manager unusable. It does NOT unbind any domEvent listeners.

---

## Hammer.Recognizer
Every Recognizer extends from this class. All recognizers also have the option `enable`,
which is a boolean value or a callback function to enable/disable the recognizer on the fly.

### constructor([options])
Just set the options.

````js
var pinch = new Hammer.Pinch();
mc.add(pinch); // add it to the Manager instance
````

### set(options)
Change an option on the recognizer instance. Using this method is recommended,
because it will update the `touchAction` value if needed.

### recognizeWith(otherRecognizer) and dropRecognizeWith(otherRecognizer)
Run the recognizer simultaneous with the given other recognizer, in both directions. This is usable for like
combining a pan with a swipe at the end, or a pinch with the ability to rotate the target as well. Dropping the
connection only removes the link on the recognizer, not on the other recognizer. Both accept an
array of recognizers.

If the recognizer is added to a manager, then this method also accepts the other recognizer's event name
as a string.

- [Read more about recognizeWith](/recognize-with)

### requireFailure(otherRecognizer) and dropRequireFailure(otherRecognizer)
Run the recognizer only when the other recognizer fails. Dropping the connection only removes the link on the
recognizer, not on the other recognizer. Both accept an array of recognizers.

If the recognizer is added to a manager, then this method also accepts the other recognizer's event name
as a string.

- [Read more about requireFailure](/require-failure)

---

## Hammer.input event
A *secret* event is being triggered by Hammer, `hammer.input`. It is being emitted on every input that is being received, and enabled you to things with the raw input. Small, but powerful feature.

````js
hammertime.on("hammer.input", function(ev) {
   console.log(ev.pointers);
});
````

---

## Event object
All events that Hammer triggers all receive an event object containing the following properties.

| Name			| Value |
|-----------------------|-------|
| type		        | Name of the event. Like `panstart`. |
| deltaX		| Movement of the X axis. |
| deltaY		| Movement of the Y axis. |
| deltaTime		| Total time in ms since the first input. |
| distance 		| Distance moved. |
| angle			| Angle moved. |
| velocityX		| Velocity on the X axis, in px/ms. |
| velocityY		| Velocity on the Y axis, in px/ms |
| velocity		| Highest velocityX/Y value. |
| direction		| Direction moved. Matches the `DIRECTION` constants. |
| offsetDirection	| Direction moved from it's starting point. Matches the `DIRECTION` constants. |
| scale			| Scaling that has been done when multi-touch. 1 on a single touch. |
| rotation		| Rotation (in deg) that has been done when multi-touch. 0 on a single touch. |
| center		| Center position for multi-touch, or just the single pointer. |
| srcEvent		| Source event object, type `TouchEvent`, `MouseEvent` or `PointerEvent`. |
| target		| Target that received the event. |
| pointerType		| Primary pointer type, could be `touch`, `mouse`, `pen` or `kinect`. |
| eventType		| Event type, matches the `INPUT` constants. |
| isFirst		| `true` when the first input. |
| isFinal		| `true` when the final (last) input. |
| pointers		| Array with all pointers, including the ended pointers (`touchend`, `mouseup`). |
| changedPointers	| Array with all new/moved/lost pointers. |
| preventDefault	| Reference to the `srcEvent.preventDefault()` method. Only for experts! |

---

## Constants
All constants are defined at the `Hammer` object. Since it are binary flags,
you can use bitwise operators on it. MDN has some excellent
[documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
about this.

### Directions
Used for setting the direction of a recognizer, and for reading the value of an event.

| Name              | Value         |
|-------------------|---------------|
| DIRECTION_NONE    | 1             |
| DIRECTION_LEFT    | 2             |
| DIRECTION_RIGHT   | 4             |
| DIRECTION_UP      | 8             |
| DIRECTION_DOWN    | 16            |
| DIRECTION_HORIZONTAL | 6          |
| DIRECTION_VERTICAL   | 24         |
| DIRECTION_ALL     | 30            |

### Input Events
Hammer maps all types of input (mousedown, mousemove, touchmove, pointercancel) to these contants.

| Name              | Value         |
|-------------------|---------------|
| INPUT_START       | 1             |
| INPUT_MOVE        | 2             |
| INPUT_END         |  4            |
| INPUT_CANCEL      | 8             |

### Recognizer States
Used internally by the recognizers to define its state.

| Name              | Value         |
|-------------------|---------------|
| STATE_POSSIBLE | 1 |
| STATE_BEGAN | 2 |
| STATE_CHANGED | 4 |
| STATE_ENDED | 8 |
| STATE_RECOGNIZED | STATE_ENDED |
| STATE_CANCELLED | 16 |
| STATE_FAILED | 32 |

---

## Utils

### Hammer.on(element, types, handler)
Wrapper around `addEventListener` that accepts multiple event types.

````js
Hammer.on(window, "load resize scroll", function(ev) {
	console.log(ev.type);
});
````
 
### Hammer.off(element, types, handler)
Like `Hammer.on`, this is a wrapper around `removeEventListener` that accepts multiple event types.

### Hammer.each(obj, handler)
Iterate an array or an object's own properties.

````js
Hammer.each([10,20,30,40], function(item, index, src) { });
Hammer.each({a:10, b:20, c:30}, function(item, key, src) { });
````

### Hammer.merge(obj1, obj2)
Merge properties from obj2 into obj1. Properties won't be overwritten.

````js
var options = {
	b: false
};

var defaults = {
	a: true,
	b: true,
	c: [1,2,3]
};
Hammer.merge(options, defaults);

// options.a == true
// options.b == false
// options.c == [1,2,3]
````

### Hammer.extend(obj1, obj2)
Extend obj1 with the properties from obj2. Properties will be overwritten.

````js
var obj1 = {
	a: true,
	b: false,
	c: [1,2,3]
};

var obj2 = {
	b: true,
	c: [4,5,6]
};
Hammer.extend(obj1, obj2);

// obj1.a == true
// obj1.b == true
// obj1.c == [4,5,6]
````

### Hammer.inherit(child, base, [properties])
Simple class inheritance.

````js
function Animal(name) {
	this.name = name;
}

function Dog() {
	Animal.apply(this, arguments);
}

Hammer.inherit(Dog, Animal, {
	bark: function() {
		alert(this.name);
	}
});

var dog = new Dog('Spaikie');
dog.bark();
````

### Hammer.bindFn(fn, scope)
Simple alternative for `Function.bind`.

````js
function myFunction(ev) {
	console.log(this === myContext); // is true
}

var myContext = {
	a: true,
	b: false
};

window.addEventListener('load', Hammer.bindFn(myFunction, myContext), false);
````

### Hammer.prefixed(obj, name)
Get the (prefixed) property from the browser.

````js
Hammer.prefixed(document.body.style, 'userSelect');
// returns "webkitUserSelect" on Chrome 35
````
