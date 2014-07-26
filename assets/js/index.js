/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var emulator = __webpack_require__(1);
	emulator();

	var toggle = document.querySelector(".toggle-sidebar");
	var target = document.querySelector(".sidebar");
	if(toggle && target) {
	    toggle.addEventListener("click", function(ev) {
	        if(target.className.indexOf('show') === -1) {
	            target.className += ' show';
	        } else {
	            target.className = target.className.replace('show', '');
	        }
	        ev.preventDefault();
	    });
	}

	window.addEventListener("load", function() {
	    if(document.querySelector("#hitarea")) {
	        __webpack_require__(2);
	    }
	});

	__webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;(function(window, document, exportName, undefined) {
	    "use strict";

	    var isMultiTouch = false;
	    var multiTouchStartPos;
	    var eventTarget;
	    var touchElements = {};

	    // polyfills
	    if(!document.createTouch) {
	        document.createTouch = function(view, target, identifier, pageX, pageY, screenX, screenY, clientX, clientY) {
	            // auto set
	            if(clientX == undefined || clientY == undefined) {
	                clientX = pageX - window.pageXOffset;
	                clientY = pageY - window.pageYOffset;
	            }

	            return new Touch(target, identifier, {
	                pageX: pageX,
	                pageY: pageY,
	                screenX: screenX,
	                screenY: screenY,
	                clientX: clientX,
	                clientY: clientY
	            });
	        };
	    }

	    if(!document.createTouchList) {
	        document.createTouchList = function() {
	            var touchList = new TouchList();
	            for (var i = 0; i < arguments.length; i++) {
	                touchList[i] = arguments[i];
	            }
	            touchList.length = arguments.length;
	            return touchList;
	        };
	    }

	    /**
	     * create an touch point
	     * @constructor
	     * @param target
	     * @param identifier
	     * @param pos
	     * @param deltaX
	     * @param deltaY
	     * @returns {Object} touchPoint
	     */
	    function Touch(target, identifier, pos, deltaX, deltaY) {
	        deltaX = deltaX || 0;
	        deltaY = deltaY || 0;

	        this.identifier = identifier;
	        this.target = target;
	        this.clientX = pos.clientX + deltaX;
	        this.clientY = pos.clientY + deltaY;
	        this.screenX = pos.screenX + deltaX;
	        this.screenY = pos.screenY + deltaY;
	        this.pageX = pos.pageX + deltaX;
	        this.pageY = pos.pageY + deltaY;
	    }

	    /**
	     * create empty touchlist with the methods
	     * @constructor
	     * @returns touchList
	     */
	    function TouchList() {
	        var touchList = [];

	        touchList.item = function(index) {
	            return this[index] || null;
	        };

	        // specified by Mozilla
	        touchList.identifiedTouch = function(id) {
	            return this[id + 1] || null;
	        };

	        return touchList;
	    }


	    /**
	     * Simple trick to fake touch event support
	     * this is enough for most libraries like Modernizr and Hammer
	     */
	    function fakeTouchSupport() {
	        var objs = [window, document.documentElement];
	        var props = ['ontouchstart', 'ontouchmove', 'ontouchcancel', 'ontouchend'];

	        for(var o=0; o<objs.length; o++) {
	            for(var p=0; p<props.length; p++) {
	                if(objs[o] && objs[o][props[p]] == undefined) {
	                    objs[o][props[p]] = null;
	                }
	            }
	        }
	    }

	    /**
	     * we don't have to emulate on a touch device
	     * @returns {boolean}
	     */
	    function hasTouchSupport() {
	        return ("ontouchstart" in window) || // touch events
	               (window.Modernizr && window.Modernizr.touch) || // modernizr
	               (navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2; // pointer events
	    }

	    /**
	     * only trigger touches when the left mousebutton has been pressed
	     * @param touchType
	     * @returns {Function}
	     */
	    function onMouse(touchType) {
	        return function(ev) {
	            if (ev.which !== 1) {
	                return;
	            }

	            // The EventTarget on which the touch point started when it was first placed on the surface,
	            // even if the touch point has since moved outside the interactive area of that element.
	            // also, when the target doesnt exist anymore, we update it
	            if (ev.type == 'mousedown' || !eventTarget || (eventTarget && !eventTarget.dispatchEvent)) {
	                eventTarget = ev.target;
	            }

	            // shiftKey has been lost, so trigger a touchend
	            if (isMultiTouch && !ev.shiftKey) {
	                triggerTouch('touchend', ev);
	                isMultiTouch = false;
	            }

	            triggerTouch(touchType, ev);

	            // we're entering the multi-touch mode!
	            if (!isMultiTouch && ev.shiftKey) {
	                isMultiTouch = true;
	                multiTouchStartPos = {
	                    pageX: ev.pageX,
	                    pageY: ev.pageY,
	                    clientX: ev.clientX,
	                    clientY: ev.clientY,
	                    screenX: ev.screenX,
	                    screenY: ev.screenY
	                };
	                triggerTouch('touchstart', ev);
	            }

	            // reset
	            if (ev.type == 'mouseup') {
	                multiTouchStartPos = null;
	                isMultiTouch = false;
	                eventTarget = null;
	            }
	        }
	    }

	    /**
	     * trigger a touch event
	     * @param eventName
	     * @param mouseEv
	     */
	    function triggerTouch(eventName, mouseEv) {
	        var touchEvent = document.createEvent('Event');
	        touchEvent.initEvent(eventName, true, true);

	        touchEvent.altKey = mouseEv.altKey;
	        touchEvent.ctrlKey = mouseEv.ctrlKey;
	        touchEvent.metaKey = mouseEv.metaKey;
	        touchEvent.shiftKey = mouseEv.shiftKey;

	        touchEvent.touches = getActiveTouches(mouseEv, eventName);
	        touchEvent.targetTouches = getActiveTouches(mouseEv, eventName);
	        touchEvent.changedTouches = getChangedTouches(mouseEv, eventName);

	        eventTarget.dispatchEvent(touchEvent);
	    }

	    /**
	     * create a touchList based on the mouse event
	     * @param mouseEv
	     * @returns {TouchList}
	     */
	    function createTouchList(mouseEv) {
	        var touchList = new TouchList();

	        if (isMultiTouch) {
	            var f = TouchEmulator.multiTouchOffset;
	            var deltaX = multiTouchStartPos.pageX - mouseEv.pageX;
	            var deltaY = multiTouchStartPos.pageY - mouseEv.pageY;

	            touchList.push(new Touch(eventTarget, 1, multiTouchStartPos, (deltaX*-1) - f, (deltaY*-1) + f));
	            touchList.push(new Touch(eventTarget, 2, multiTouchStartPos, deltaX+f, deltaY-f));
	        } else {
	            touchList.push(new Touch(eventTarget, 1, mouseEv, 0, 0));
	        }

	        return touchList;
	    }

	    /**
	     * receive all active touches
	     * @param mouseEv
	     * @returns {TouchList}
	     */
	    function getActiveTouches(mouseEv, eventName) {
	        // empty list
	        if (mouseEv.type == 'mouseup') {
	            return new TouchList();
	        }

	        var touchList = createTouchList(mouseEv);
	        if(isMultiTouch && mouseEv.type != 'mouseup' && eventName == 'touchend') {
	            touchList.splice(1, 1);
	        }
	        return touchList;
	    }

	    /**
	     * receive a filtered set of touches with only the changed pointers
	     * @param mouseEv
	     * @param eventName
	     * @returns {TouchList}
	     */
	    function getChangedTouches(mouseEv, eventName) {
	        var touchList = createTouchList(mouseEv);

	        // we only want to return the added/removed item on multitouch
	        // which is the second pointer, so remove the first pointer from the touchList
	        //
	        // but when the mouseEv.type is mouseup, we want to send all touches because then
	        // no new input will be possible
	        if(isMultiTouch && mouseEv.type != 'mouseup' &&
	            (eventName == 'touchstart' || eventName == 'touchend')) {
	            touchList.splice(0, 1);
	        }

	        return touchList;
	    }

	    /**
	     * show the touchpoints on the screen
	     */
	    function showTouches(ev) {
	        var touch, i, el, styles;

	        // first all visible touches
	        for(i = 0; i < ev.touches.length; i++) {
	            touch = ev.touches[i];
	            el = touchElements[touch.identifier];
	            if(!el) {
	                el = touchElements[touch.identifier] = document.createElement("div");
	                document.body.appendChild(el);
	            }

	            styles = TouchEmulator.template(touch);
	            for(var prop in styles) {
	                el.style[prop] = styles[prop];
	            }
	        }

	        // remove all ended touches
	        if(ev.type == 'touchend' || ev.type == 'touchcancel') {
	            for(i = 0; i < ev.changedTouches.length; i++) {
	                touch = ev.changedTouches[i];
	                el = touchElements[touch.identifier];
	                if(el) {
	                    el.parentNode.removeChild(el);
	                    delete touchElements[touch.identifier];
	                }
	            }
	        }
	    }

	    /**
	     * TouchEmulator initializer
	     */
	    function TouchEmulator() {
	        if (hasTouchSupport()) {
	            return;
	        }

	        fakeTouchSupport();

	        window.addEventListener("mousedown", onMouse('touchstart'), false);
	        window.addEventListener("mousemove", onMouse('touchmove'), false);
	        window.addEventListener("mouseup", onMouse('touchend'), false);

	        // it uses itself!
	        window.addEventListener("touchstart", showTouches, false);
	        window.addEventListener("touchmove", showTouches, false);
	        window.addEventListener("touchend", showTouches, false);
	        window.addEventListener("touchcancel", showTouches, false);
	    }

	    // start distance when entering the multitouch mode
	    TouchEmulator.multiTouchOffset = 75;

	    /**
	     * css template for the touch rendering
	     * @param touch
	     * @returns object
	     */
	    TouchEmulator.template = function(touch) {
	        var size = 30;
	        var transform = 'translate('+ (touch.clientX-(size/2)) +'px, '+ (touch.clientY-(size/2)) +'px)';
	        return {
	            position: 'fixed',
	            left: 0,
	            top: 0,
	            background: '#fff',
	            border: 'solid 1px #999',
	            opacity: .6,
	            borderRadius: '100%',
	            height: size + 'px',
	            width: size + 'px',
	            padding: 0,
	            margin: 0,
	            display: 'block',
	            overflow: 'hidden',
	            pointerEvents: 'none',
	            webkitUserSelect: 'none',
	            mozUserSelect: 'none',
	            userSelect: 'none',
	            webkitTransform: transform,
	            mozTransform: transform,
	            transform: transform
	        }
	    };

	    // export
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
	            return TouchEmulator;
	        }.call(exports, __webpack_require__, exports, module)), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module != "undefined" && module.exports) {
	        module.exports = TouchEmulator;
	    } else {
	        window[exportName] = TouchEmulator;
	    }
	})(window, document, "TouchEmulator");


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* kind of messy code, but good enough for now
	*/
	// polyfill
	var reqAnimationFrame = (function () {
	    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	})();

	var screen = document.querySelector(".device-screen");
	var el = document.querySelector("#hitarea");

	var START_X = Math.round((screen.offsetWidth - el.offsetWidth) / 2);
	var START_Y = Math.round((screen.offsetHeight - el.offsetHeight) / 2);

	var ticking = false;
	var transform;
	var timer;

	var mc = new Hammer.Manager(el);

	mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

	mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
	mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
	mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

	mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
	mc.add(new Hammer.Tap());

	mc.on("panstart panmove", onPan);
	mc.on("rotatestart rotatemove", onRotate);
	mc.on("pinchstart pinchmove", onPinch);
	mc.on("swipe", onSwipe);
	mc.on("tap", onTap);
	mc.on("doubletap", onDoubleTap);

	mc.on("hammer.input", function(ev) {
	    if(ev.isFinal) {
	        resetElement();
	    }
	});

	function logEvent(ev) {
	    el.innerText = ev.type;
	}

	function resetElement() {
	    el.className = 'animate';
	    transform = {
	        translate: { x: START_X, y: START_Y },
	        scale: 1,
	        angle: 0,
	        rx: 0,
	        ry: 0,
	        rz: 0
	    };
	    requestElementUpdate();
	}

	function updateElementTransform() {
	    var value = [
	        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
	        'scale(' + transform.scale + ', ' + transform.scale + ')',
	        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
	    ];

	    value = value.join(" ");
	    el.style.webkitTransform = value;
	    el.style.mozTransform = value;
	    el.style.transform = value;
	    ticking = false;
	}

	function requestElementUpdate() {
	    if(!ticking) {
	        reqAnimationFrame(updateElementTransform);
	        ticking = true;
	    }
	}

	function onPan(ev) {
	    el.className = '';
	    transform.translate = {
	        x: START_X + ev.deltaX,
	        y: START_Y + ev.deltaY
	    };

	    logEvent(ev);
	    requestElementUpdate();
	}

	var initScale = 1;
	function onPinch(ev) {
	    if(ev.type == 'pinchstart') {
	        initScale = transform.scale || 1;
	    }

	    el.className = '';
	    transform.scale = initScale * ev.scale;

	    logEvent(ev);
	    requestElementUpdate();
	}

	var initAngle = 0;
	function onRotate(ev) {
	    if(ev.type == 'rotatestart') {
	        initAngle = transform.angle || 0;
	    }

	    el.className = '';
	    transform.rz = 1;
	    transform.angle = initAngle + ev.rotation;

	    logEvent(ev);
	    requestElementUpdate();
	}

	function onSwipe(ev) {
	    var angle = 50;
	    transform.ry = (ev.direction & Hammer.DIRECTION_HORIZONTAL) ? 1 : 0;
	    transform.rx = (ev.direction & Hammer.DIRECTION_VERTICAL) ? 1 : 0;
	    transform.angle = (ev.direction & (Hammer.DIRECTION_RIGHT | Hammer.DIRECTION_UP)) ? angle : -angle;

	    clearTimeout(timer);
	    timer = setTimeout(function () {
	        resetElement();
	    }, 300);

	    logEvent(ev);
	    requestElementUpdate();
	}

	function onTap(ev) {
	    transform.rx = 1;
	    transform.angle = 25;

	    clearTimeout(timer);
	    timer = setTimeout(function () {
	        resetElement();
	    }, 200);

	    logEvent(ev);
	    requestElementUpdate();
	}

	function onDoubleTap(ev) {
	    transform.rx = 1;
	    transform.angle = 80;

	    clearTimeout(timer);
	    timer = setTimeout(function () {
	        resetElement();
	    }, 500);

	    logEvent(ev);
	    requestElementUpdate();
	}

	resetElement();

	document.querySelector(".device-button").addEventListener("click", function(){
	document.querySelector(".device").classList.toggle('hammertime');
	}, false);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-30289566-1', 'auto');
	ga('send', 'pageview');

	!function (d, s, id) {
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (!d.getElementById(id)) {
	        js = d.createElement(s);
	        js.id = id;
	        js.src = "//platform.twitter.com/widgets.js";
	        fjs.parentNode.insertBefore(js, fjs);
	    }
	}(document, "script", "twitter-wjs");


/***/ }
/******/ ])