nulljs.module("com.nulljs.array", function () {
	var A = function (array) {
		var a = array || [];
		return {
			forEach: function (f) {
				for(var i = 0; i < a.length; i++) {
					f(a[i], i, a);
				}
				return a;
			},

			map: function (f) {
				var r = [];
				for(var i = 0; i < a.length; i++) {
					r.push(f(a[i], i, a));
				}
				return r;
			},

			filter: function (f) {
				var r = [];
				for(var i = 0; i < a.length; i++) {
					var x = f(a[i], i, a);
					x && r.push(a[i]);
				}
				return r;
			}
		};
	};
	return A;
});