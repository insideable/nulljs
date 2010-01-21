nulljs.load("com.nulljs.(TestCase|array)").module("com.nulljs.tests.TestArray", function (api) {
	var A = api.com.nulljs.array;

	return new api.com.nulljs.TestCase({
		testEqual: function () {
			this.assertTrue(A.equal([], []), "Equal fails: [], []");
			this.assertTrue(A.equal([], [], [], []), "Equal fails: [], [], [], []");

			this.assertTrue(A.equal([1,2,3], [1,2,3]), "Equal fails: [1,2,3], [1,2,3]");
			
			this.assertTrue(false == A.equal([1,2,3], [1,2,3,4]), "Equal fails: [1,2,3], [1,2,3,4]");

			this.assertTrue(A.equal([9], [9], [9]));
		},

		testShift: function () {
			var a = [1,2,3];
			A.shift(a);
			this.assertTrue(A.equal(a, [2,3]));

			var args = { 0:1, 1:2, 2:3, length: 3 };
			A.shift(args);

			this.assertTrue(A.equal(args, [2,3]));
		},

		testUnshift: function () {
			var a = [1,2,3];
			A.unshift(a, 0);
			this.assertTrue(A.equal(a, [0, 1, 2, 3]), "unshift failed for [1,2,3]");

			var args = { 0:1, 1:2, 2:3, length: 3 };
			A.unshift(args, 0);

			this.assertTrue(A.equal(args, [0, 1, 2, 3]), "unshift failed for arguments object");
		},

		testWrapper: function () {
			var a = A([1,2,3]);
			this.assertTrue(a instanceof Array, "successor of Array expected");
			this.assertTrue(A().length == 0);
		},

		testTail: function () {
			this.assertTrue(A.equal([2,3], A([1,2,3]).tail()));
		},

		testConcat: function () {
			this.assertTrue(A.equal([1,2,3], A([1,2]).append([3])));
		}
	});

});
