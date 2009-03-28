nulljs.module("tests.TestCase", ["core.TestCase"], function (api) {
	
	var TestTestCase = new api.core.TestCase({
		testPassed: function () {
			this.assertTrue(1 == 1, "assertTrue doesn't work");
		},
		
		testFailed: function () {
			this.assertTrue(1 == 0, "I'm Failed Test");
		},
		
		testBroken: function () {
			throw "This is a testBroken exception";
		},
		
		testIncomplete: function () {
		}
	});
	nulljs.publicate("tests.TestCase", TestTestCase);
	nulljs.register("tests.TestCase", TestTestCase);
});
