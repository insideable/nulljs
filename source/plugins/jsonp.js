nulljs.load("com.nulljs.(dom|random)").module("com.nulljs.jsonp", function (api) {
	
	var $ = api.com.nulljs.dom();

	var makeUrl = function (url, hash) {
		var hash2uri = function (hash) {
			var a = [];
			for(var i in hash) {
				a.push(encodeURIComponent(i) + "=" + encodeURIComponent(hash[i]));
			}
			return a.join("&");
		}
		return url + (url.indexOf("?") == -1 ? "?" : "&") + hash2uri(hash);
	};

	var makeCallback = function (f) {
		var i = 0;
		while(i++ < 10) {
			var name = api.com.nulljs.random.randomId(16);
			if(typeof(window[name]) == "undefined") {
				window[name] = function (content, content_type, headers) {
					f(content, content_type, headers);
				};
				return name;
			}
		}
		throw new Error("com.nulljs.jsonp.makeCallback: cannot find unique name for callback");
	};

	var jsonp = function (url, data, callback) {
		data['callback'] = makeCallback(callback);
		$.append($.head(), $.script(makeUrl(url, data)));
	};

	var JSONP = function (callback) {
		var url, data = {};

		return {
			url: function (_url_) {
				return (url = _url_, this);
			},

			data: function (hash) {
				return (data = hash, this);
			},

			run: function () {
				jsonp(url, data, callback);
			}
		};
	};

	return JSONP;
});
