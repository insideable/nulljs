nulljs.load("com.nulljs.(TestCase|curry|context)").module("com.nulljs.tests.TestCurry", function (api) {
	var curry = api.com.nulljs.curry, context = api.com.nulljs.context;

	return new api.com.nulljs.TestCase({
		testCurry: function () {
			
			var f = function (x, y) { return x + y; };

			this.assertTrue(curry(f, 100)(200) == 300, "300 expected");
			this.assertTrue(curry(f, 100, 300)() == 400, "400 expected");
		},

		testContext: function () {
			var g = context(2, curry(function (y, z) { return [this, y, z]; }, 10));
			var h = curry(context(2, function (y, z) { return [this, y, z]; }), 10);

			this.assertTrue(g(30).join(":") == "2:10:30", "context->curry problem");
			this.assertTrue(h(50).join(":") == "2:10:50", "curry->context problem");
		}
	});

});