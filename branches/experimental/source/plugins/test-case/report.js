nulljs.load("com.nulljs.(dom|array|context)").module("com.nulljs.TestCase.Report", function (api) {
	var $D = (window.top == window ? window : window.top).document;
	var $ = api.com.nulljs.dom.bindTo($D), A = api.com.nulljs.array, context = api.com.nulljs.context;
	
	var Report = function (passed, failed, broken, incomplete) {
		$.append($.body(), this.container = $("pre", "", { style: "font-family: courier new, fixed; font-size: 10pt" }));
//		this.container = $D.getElementsByTagName("body")[0].appendChild($D.createElement("div"));
		this.results = [passed, failed, broken, incomplete];
	};

	var r = function (f) {
		return function () {
			return (f.apply(this, arguments), this);
		};
	};
	
	Report.prototype.print = r(function (message) {
		$.append(this.container, $.text(message));
	});
	
	Report.prototype.nl = r(function () {
		$.append(this.container, $("br"));
	});
	
	Report.prototype.link = r(function (href, title) {
		$.append(this.container,
			$.append($("a", "", {href: href || "#"}), $.text(title || "")));
	});

	Report.prototype.hr = r(function () {
		$.append(this.container, $("hr"));
	});

	Report.prototype.printSummary = function () {
		this.nl().print("Passed: " + this.results[0].length)
			.print(", Failed: " + this.results[1].length)
			.print(", Broken: " + this.results[2].length)
			.print(", Incomplete: " + this.results[3].length);

		if(this.results[1].length > 0 || this.results[2].length > 0) {
			if(this.results[1].length > 0) {
				this.nl().nl().print("Failed Asserts:");
				A(this.results[1]).forEach(context(this, function (assert) {
					this.nl().print("    " + assert[0] + " => " + assert[1]);
				}));
			}

			if(this.results[2].length > 0) {
				this.nl().nl().print("Broken Asserts:");
				A(this.results[2]).forEach(context(this, function (assert) {
					this.nl().print("    " + assert[0] + " => " + assert[1]);
				}));
			}

			this.hr();
		}
		
	};

	return Report;
});
