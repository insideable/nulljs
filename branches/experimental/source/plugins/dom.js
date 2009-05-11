nulljs.module("com.nulljs.dom", function () {
	var D = document;

	var Dom = function (tag_name, css, attributes) {
		var e = D.createElement(tag_name);
		css && (e.setAttribute("class", css), (e.className = css));
		attributes && (function () { for (var i in attributes) { e.setAttribute(i, attributes[i]); } })();
		return e;
	};

	Dom.bindTo = function (doc) {
		return (D = doc || document, Dom);
	}

	Dom.id = function (id) {
		return D.getElementById(id);
	};

	Dom.clear = function (element) {
		return (element.innerHTML = "", element);
	};

	Dom.text = function (string) {
		return D.createTextNode(string);
	};

	Dom.append = function (/* element */) {
		var element = arguments[0], i = 0;
		while(++i < arguments.length) {
			element.appendChild(arguments[i]);
		}
		return element;
	};

	Dom.appendList = function (element, list) {
//		return nulljs.dom.append.apply(element, list);
		for(var i = 0; i < list.length; i++) {
			list[i] instanceof Array ? Dom.appendList(element, list[i]) : element.appendChild(list[i]);
		}
		return element;
	};

	Dom.lookup = function (tag_name) {
		return D.getElementsByTagName(tag_name);
	};

	Dom.head = function () {
		return Dom.lookup("head")[0];
	};

	Dom.body = function () {
		return Dom.lookup("body")[0];
	};

	Dom.script = function (url) {
		return Dom("script", "", { src: url });
	};

	return Dom;
});