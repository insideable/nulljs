nulljs.module("core.event", ["core.browser"], function (api) {

	var event = {
		addEventListener: typeof(window.addEventListener) == "undefined" ?
			function (element, event_name, listener) {
				element.attachEvent("on" + event_name, listener);
				addLeakedHook(element, "on" + event_name, listener);
			} :
			function (element, event_name, listener, capture) { element.addEventListener(event_name, listener, capture || false) },

		wrap: api.core.browser.ie ?
				function (e) {
					e.target = e.srcElement;
					e.currentTarget = e.fromElement;
					e.stopPropagation = function() { this.cancelBubble = true; };
					e.preventDefault = function() { this.returnValue = false; };
					return e;
				} :
				function (e) { return e; },

		fireEvent: api.core.browser.ie ?
				function (element, event_type) {
					element.fireEvent("on" + event_type);
				} :
				function (element, event_type) {
					var e = document.createEvent("MouseEvent");
					e.initMouseEvent(event_type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					element.dispatchEvent(e);
				},

		stopEvent: function (event) {
					this.wrap(event);
					event.stopPropagation();
					event.preventDefault();
					return false;
				}
	};

	// protect IE agains memory leaks
	var leakedHooks = [];

	var addLeakedHook = function (element, event_type, listener) {
		var f = (function (element, event_type, listener) {
				return function () {
					element.detachEvent(event_type, listener);
					element.parentNode && element.parentNode.removeChild(element);
				};
			})(element, event_type, listener);
		leakedHooks.push(f);
	}

	var fixMemoryLeaks = function () {
		for(var i = 0; i < leakedHooks.length; leakedHooks[i++]());
	};

	if(api.core.browser.ie) {
		event.addEventListener(window, "unload", fixMemoryLeaks);
	}

	nulljs.register("core.event", event);
});