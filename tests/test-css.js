nulljs.load("com.nulljs.(TestCase|css)").module("com.nulljs.tests.TestCss", function (api) {

	var $ = api.com.nulljs.css();

	var TestCSS = new api.com.nulljs.TestCase({
		testClassName: function () {
			var element = {};
			this.assertTrue($.className(element, "foo") === element, 'element expected');
			this.assertTrue($.className($.className(element, "foo")) == "foo", "'foo' className expected");
		},

		testAddClass: function () {
			var element = $.className({}, "foo");
			var element2 = $.addClass(element, "bar");

			this.assertTrue(element2 === element, "element expected");
			this.assertTrue($.className(element) == "foo bar", "'foo bar' className expected");

			$.addClass(element, "bar");
			this.assertTrue($.className(element) == "foo bar", "unexpected twice 'bar bar'");
		},

		testRemoveClass: function () {
			var element = $.className({}, "foo  bar  zoo");
			var element2 = $.removeClass(element, "bar");

			this.assertTrue(element2 === element, "element expected");
			this.assertTrue($.className(element) == "foo zoo", "'foo zoo' expected");

			$.removeClass(element, "foo");
			this.assertTrue($.className(element) == "zoo", "'zoo' expected");
		}
	});

	return TestCSS;
});
