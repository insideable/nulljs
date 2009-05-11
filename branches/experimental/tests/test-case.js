nulljs.load("com.nulljs.TestCase").module("com.nulljs.tests.TestCase", function (api) {
	
	var TestTestCase = new api.com.nulljs.TestCase({
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

	return TestTestCase;
});
