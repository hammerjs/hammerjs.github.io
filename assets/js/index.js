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

	if(document.querySelector("#hitarea")) {
	    __webpack_require__(1);
	}

	__webpack_require__(2);


/***/ },
/* 1 */
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
	    //el.innerText = ev.type;
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
/* 2 */
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
