nulljs.module("com.nulljs.date", function () {
	var date = {};
	
	date.absolute = function () {
		var value = new Date(0);
		
		return {
			day: function (d) {
				return (value.setDate(d), this);
			},

			month: function (m) {
				return (value.setMonth(m-1), this);
			},

			year: function (y) {
				return (value.setFullYear(y), this);
			},

			getTime: function () {
				return value.getTime();
			},

			getUTC: function () {
				return value.toUTCString();
			}
		};
	};

	return date;
});