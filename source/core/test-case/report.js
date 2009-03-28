nulljs.module("core.TestCase.Report", [], function (api) {
	var $D = (window.top == window ? window : window.top).document;
	
	var Report = function () {
		this.container = $D.getElementsByTagName("body")[0].appendChild($D.createElement("div"));
	};
	
	Report.prototype.print = function (message) {
		this.container.appendChild($D.createTextNode(message));
		return this;
	};
	
	Report.prototype.nl = function () {
		this.container.appendChild($D.createElement("br"));
		return this;
	};
	
	Report.prototype.link = function (href, title) {
		
//		$.element("a", {href: href || "#"}, $.text(title || ""));
		
		var a = this.container.appendChild($D.createElement("a"));
		a.appendChild($D.createTextNode(title || ""));
		a.setAttribute("href", href || "#");
		return this;
	};
	
	nulljs.register("core.TestCase.Report", Report);
});