nulljs.load("com.nulljs.(event|dom)").module("com.nulljs.draggable", function (api) {
	
	var zIndex = (function (initial) {
		var index = initial;
		return function () { return index++; };
	})(100);

	var NJ = api.com.nulljs;

	var draggable = function (control, container) {
		var dx, dy, dragging = false;
		var onStartDrag = function (event) {
			dragging = true;
			dx = parseInt(container.offsetLeft || 0) + 0 - event.clientX;
			dy = parseInt(container.offsetTop || 0) + 0 - event.clientY;
			container.style.zIndex = zIndex();
			return NJ.event.stopEvent(event);
		};

		var onDrag = function (event) {
			if(dragging) {
				container.style.left = (event.clientX + dx) + "px";
				container.style.top = (event.clientY + dy) + "px";
				return NJ.event.stopEvent(event);
			}
			return true;
		};

		var onStopDrag = function (event) {
			dragging = false;
			return NJ.event.stopEvent(event);
		};

		var onFocus = function (event) {
			container.style.zIndex = zIndex();
		};

		NJ.event.addEventListener(container, "click", onFocus, false);
		NJ.event.addEventListener(control, "mousedown", onStartDrag, false);
		NJ.event.addEventListener(document, "mouseup", onStopDrag, false);
		NJ.event.addEventListener(document, "mousemove", onDrag, true);

		container.style.position = "absolute";

		return container;
	};

	return draggable;
});