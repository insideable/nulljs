nulljs.load("com.nulljs.(TestCase|memoize)").module("com.nulljs.tests.TestMemoize", function (api) {

	var time = function (f) {
		var d1 = new Date().getTime();
		var r = f();
		var d2 = new Date().getTime();

		return [d2 - d1, r];
	};

	var curry = function (f, x) {
		return function () {
			return f.call(this, x);
		}
	};
	
	return new api.com.nulljs.TestCase({
		testMemoize: function () {
			var Memoize = api.com.nulljs.memoize();

			var fib = function (n) {
				return n > 1 ? fib(n - 1) + fib(n - 2) : (n > 0 ? 1 : 0);
			};

			var fast_fib = Memoize(function (n) {
				return n > 1 ? fast_fib(n - 1) + fast_fib(n - 2) : (n > 0 ? 1 : 0);
			});

			var v1 = time(curry(fib, 17)), v2 = time(curry(fast_fib, 17));
			
			this.assertTrue(v1[0] > v2[0], "Memoized function timing seems problematic");
			this.assertTrue(v1[1] == v2[1], "Evaluation results should be identical");
			
		}
	});
});