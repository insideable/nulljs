nulljs.load("com.nulljs.(TestCase|json)").module("com.nulljs.tests.TestJson", function (api) {
	var JSON = api.com.nulljs.json;

	return new api.com.nulljs.TestCase({
		testParse: function () {
			var code = JSON.parse("{\"foo\":\"bar\"}");

			this.assertTrue(typeof code == "object", "object expected");
			this.assertTrue(typeof code.foo == "string", "code.foo should be a string");
			this.assertTrue(code.foo == "bar", "foo == 'bar' expected");
		}
	});
	
});
