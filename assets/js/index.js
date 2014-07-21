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

	var el = document.querySelector("#hitarea");

	var startX = Math.round((el.parentNode.offsetWidth - el.offsetWidth) / 2);
	var startY = Math.round((el.parentNode.offsetHeight - el.offsetHeight) / 2);

	var ticking = false;
	var transform;

	var mc = new Hammer(el);

	mc.get('pinch').set({ enable: true });
	mc.get('rotate').set({ enable: true });

	mc.on("pan", onPan);
	mc.on("swipe", onSwipe);
	mc.on("rotate", onRotate);
	mc.on("pinch", onPinch);
	mc.on("tap", onTap);
	mc.on("doubletap", onDoubleTap);
	mc.on("hold", onHold);

	mc.on("panstart rotatestart pinchstart", resetElementStart);
	mc.on("panend rotateend pinchend pancancel rotatecancel pinchcancel", resetElementEnd);

	function resetElementStart() {
	    el.className = '';
	}

	function resetElementEnd() {
	    transform = {
	        translate: { x: startX, y: startY },
	        scale: 1,
	        rotate: 0
	    };
	    el.className = 'animate';
	    requestElementUpdate();
	}

	function updateElementTransform() {
	    var value = [
	        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
	        'scale(' + transform.scale + ', ' + transform.scale + ')',
	        'rotate(' + transform.rotate + 'deg)'];
	    el.style.webkitTransform = el.style.transform = value.join(" ");
	    ticking = false;
	}

	function requestElementUpdate() {
	    if(!ticking) {
	        ticking = true;
	        reqAnimationFrame(updateElementTransform);
	    }
	}

	function onPan(ev) {
	    transform.translate = {
	        x: startX + ev.deltaX,
	        y: startY + ev.deltaY
	    };
	    requestElementUpdate();
	}

	function onSwipe(ev) {
	    transform.translate = {
	        x: startX + (ev.deltaX * 1.2),
	        y: startY + (ev.deltaY * 1.2)
	    };
	    transform.scale = 1.2;
	    requestElementUpdate();

	    setTimeout(function () {
	        resetElementEnd();
	    }, 400);
	}

	function onPinch(ev) {
	    transform.scale = ev.scale;
	    requestElementUpdate();
	}

	function onRotate(ev) {
	    transform.rotate = ev.rotation;
	    requestElementUpdate();
	}

	function onTap(ev) {
	    transform.scale = .9;
	    requestElementUpdate();

	    setTimeout(function () {
	        transform.scale = 1;
	        requestElementUpdate();
	    }, 200);
	}

	function onDoubleTap(ev) {
	    transform.rotate = !transform.rotate ? 360 : 0;
	    requestElementUpdate();
	}

	function onHold(ev) {
	    el.style.background = '#fd0';
	    setTimeout(function () {
	        el.style.background = 'white';
	        requestElementUpdate();
	    }, 500);
	}

	resetElementEnd();

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