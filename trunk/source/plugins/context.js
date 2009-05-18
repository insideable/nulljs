nulljs.module("com.nulljs.context", function (api) {
	return function (context, f) {
		return function () { return f.apply(context, arguments); };
	};
});