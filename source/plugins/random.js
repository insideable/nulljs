nulljs.module("com.nulljs.random", function () {
	
	var randomString = function (length, chars) {
		var ch = chars || "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz_0123456789";
		var l = length || 16;
		var s = [];
		for(var i = 0, sl = ch.length-1; i < l; i++) {
			s.push(ch.charAt(Math.round(Math.random()*sl)));
		}
		return s.join("");
	};

	var randomId = function (length) {
		return "_" + randomString(length);
	};

	var Random = {
		randomString: randomString,
		randomId: randomId
	};

	return Random;
});
