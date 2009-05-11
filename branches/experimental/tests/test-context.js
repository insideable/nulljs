nulljs.load("com.nulljs.(TestCase|context)").module("com.nulljs.tests.TestContext", function (api) {
	
	var test = new api.com.nulljs.TestCase({
		testContext: function () {
			this.assertTrue(api.com.nulljs.context(this, function () { return this; })() === this, "com.nulljs.context() should pass context to specified function");
		},
		
		testArguments: function () {
			this.assertTrue(api.com.nulljs.context(1024, function (x, y) { return x * this - y; })(2, 48) == 2000, "com.nulljs.context() should pass function arguments");
		}
	});

	return test;
});
