// nulljs.ajax module
nulljs.module("com.nulljs.ajax", function (api) {
	
	var hash2array = function (hash) {
		var a = [];
		for(var k in hash) {
			a.push(encodeURIComponent(k) + "=" + encodeURIComponent(hash[k]));
		}
		return a;
	};

	var XhrResponse = function (xhr) {
		return {
			header: function (name) {
				return xhr.getResponseHeader(name);
			},

			body: function () {
				return xhr.responseText;
			},

			xml: function () {
				return xhr.responseXML;
			}
		};
	};

	var Ajax = function (callback) {
		var url, method = "GET", data = {}, content_type = "application/x-www-form-urlencoded";
		return {
			url: function (string) {
				return (url = string, this);
			},

			method: function (string) {
				return (method = string, this);
			},

			data: function (hash) {
				return (data = hash, this);
			},

			run: function () {
				var r = (typeof(XMLHttpRequest) != "undefined") ? new XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");

				var get = function () {
					var u = url + (url.indexOf("?") == -1 ? "?" : "&") + hash2array(data).join("&");
					r.open(method, u, !!callback);
					return send(null);
				};

				var post = function () {
					r.open(method, url, !!callback);
					r.setRequestHeader("Content-Type", content_type);
					return send(hash2array(data).join("&"));
				};

				var send = function (data) {
					r.setRequestHeader("If-Modified-Since", new Date(0).toUTCString());
					if(!!callback) {
						r.onreadystatechange = function () {
							if(r.readyState == 4) {
								callback(new XhrResponse(r));
							}
						};
					}
					r.send(data);
					return new XhrResponse(r);
				};

				return method == "GET" ? get() : post();
			}
		}
	};

	return function (callback) {
		return new Ajax(callback);
	};
});
