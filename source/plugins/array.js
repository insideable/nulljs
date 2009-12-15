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
			},
			indexOf: function (value) {
				for(var i = 0; i < a.length; i++) {
					if(a[i] === value) {
						return i;
					}
				}
				return -1;
			},

			copy: function () {
				return A(a).map(function (item) { return item; });
			},

			// A([1,2,3]).tail() == [2,3]
			tail: function () {
				var x = A(a).copy(); x.shift();
				return x;
			},

			append: function () {
				for(var i = 0, l = arguments.length; i < l; i++) {
					var arr = arguments[i];
					for(var j = 0, k = arr.length; j < k; j++) {
						a.push(arr[j]);
					}
				}
				return a;
			}
		};
	};
	return A;
});