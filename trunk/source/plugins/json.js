nulljs.module("com.nulljs.json", function (api) {

	var JSON = !!window.JSON ? window.JSON :
		{
			parse: function (code) {
				return (eval("var json = " + code + ";"), json);
			},
			
			stringify: function (object) {
				throw "Not implemented yet";
			}
		};

	return JSON;
});