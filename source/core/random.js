nulljs.module("core.random", [], function (api) {
	
	function randomString(length) {
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-+=~`'\";:[]{}<>,./?\|";
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz0123456789";
		var l = length || 16;
		var s = [];
		for(var i = 0, sl = chars.length-1; i < l; i++) {
			s.push(chars.charAt(Math.round(Math.random()*sl))); 
		}
		return s.join("");
	};
	
	var Public = {
		makeString: randomString
	};
	
	nulljs.publicate("core.random", Public);
	nulljs.register("core.random");
});