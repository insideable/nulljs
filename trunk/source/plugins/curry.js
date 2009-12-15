nulljs.load("com.nulljs.array").module("com.nulljs.curry", function (api) {
	
	var A = api.com.nulljs.array;
	
	return function () {
		var f = arguments[0], args = A(arguments).tail();
		
		return function () {
			return f.apply(this, A(args).append(arguments));
		}
	};
});