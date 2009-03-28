nulljs.module("tests.TestClosure", ["core.TestCase", "core.closure"], function (api) {
	
	var test = new api.core.TestCase({
		testClosureContext: function () {
			this.assertTrue(api.core.closure(this, function () { return this; })() === this, "closure() should pass context to specified function");
		},
		
		testClosureArgs: function () {
			this.assertTrue(api.core.closure(1024, function (x, y) { return x * this - y; })(2, 48) == 2000, "closure() should pass function arguments");
		}
	});
	
	nulljs.publicate("tests.TestClosure", test);
	nulljs.register("tests.TestClosure", test);
});
