nulljs.module("core.closure", [], function (api) {
	nulljs.register("core.closure",
		function (context, f) {
			return function () { return f.apply(context, arguments); }
		});
});