nulljs.module("com.nulljs.dom", function () {

	var appendList = function (element, list) {
		for(var i = 0; i < list.length; i++) {
			list[i] instanceof Array ? appendList(element, list[i]) : element.appendChild(list[i]);
		}
		return element;
	};

	var Dom = function (doc) {
		var D = doc || document;

		var dom = function (tag_name, css, attributes) {
			var e = D.createElement(tag_name);
			css && (e.setAttribute("class", css), (e.className = css));
			attributes && (function () { for (var i in attributes) { e.setAttribute(i, attributes[i]); } })();
			return e;
		};

		dom.id = function (id) {
			return D.getElementById(id);
		};

		dom.clear = function (element) {
			return (element.innerHTML = "", element);
		};

		dom.text = function (string) {
			return D.createTextNode(string);
		};

		dom.append = function (/* element */) {
			var element = arguments[0], i = 0;
			while(++i < arguments.length) {
				arguments[i] instanceof Array ? appendList(element, arguments[i]) : element.appendChild(arguments[i]);
			}
			return element;
		};

		dom.lookup = function (tag_name) {
			return D.getElementsByTagName(tag_name);
		};

		dom.head = function () {
			return this.lookup("head")[0];
		};

		dom.body = function () {
			return this.lookup("body")[0];
		};

		dom.script = function (url) {
			return this("script", "", { src: url });
		};

		return dom;
	};

	return Dom;
});
