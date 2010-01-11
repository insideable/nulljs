nulljs.module("com.nulljs.array", function (api) {

	var forEach = function (f, context) {
		for(var i = 0, len = this.length >>> 0; i < len; i++) {
			if(i in this) {
				f.call(context, this[i], i, this);
			}
		}
		return this;
	},

	map = function (f, context) {
		var a2 = A([]);
		this.forEach(function (value, index) {
			a2[index] = f.call(context, value, index, this);
		}, this);
		return a2;
	},

	filter = function (f, context) {
		var r = A([]);
		this.forEach(function (value, index) {
			f.call(context, value, index, this) && (r.push(value));
		}, this);
		return r;
	},

	indexOf = function (value) {
		for(var i = 0, len = this.length >>> 0; i < len; i++) {
			if(this[i] == value) {
				return i;
			}
		}
		return -1;
	},

	copy = function () {
		return this.map(function (value) { return value; });
	},

	tail = function () {
		return this.filter(function (v, index) { return index > 0; });
	},

	drop = function () {
		return (this.shift(), this);
	},

	// append differ from concat, append works with argument object correctly
	append = function (/*array1, array2, ... */) {
		for(var i = 0, l = arguments.length; i < l; i++) {
			var arr = arguments[i];
			for(var j = 0, k = arr.length; j < k; j++) {
				this.push(arr[j]);
			}
		}
		return this;
	};

	var A = function (source) {
		var hash = {forEach: forEach, map: map, filter: filter, indexOf: indexOf, copy: copy, append: append, tail: tail };
		for(var i in hash) {
			if(i in source == false) {
				source[i] = hash[i];
			}
		}
		return source;
	};

	A.equal = function (/* array1, array2, ... */) {
		var eq = true, a1 = arguments[0], L = arguments.length, l = arguments[0].length;
		
		A(arguments).forEach(function (a) {
			l < a.length && (l = a.length, a1 = a);
		});

		for(var i = 0; i < a1.length; i++) {
			var v = a1[i];
			for(var j = 0; j < L; j++) {
				if(v != arguments[j][i]) {
					return false;
				}
			}
		}
		return true;
	};

	A.shift = function (array) {
		return Array.prototype.shift.call(array);
	};

	A.unshift = function (array, value) {
		return Array.prototype.unshift.call(array, value);
	};

	return A;
});