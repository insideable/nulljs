nulljs.module("core.browser", [], function(api) {
	
	var Browser = {
		engine: {name: false, version: false},
		platform: {name: (navigator.platform.match(/mac|win|linux/i) || ["unknown"])[0].toLowerCase()},
		features: {xpath: !!(document.evaluate), air: !!(window.runtime)}
	};
	
	var detectTridentVersion = function () {
		return (typeof(window.XDomainRequest) != "undefined" ? 6 : (typeof(window.XMLHttpRequest) != "undefined" ? 5 : 4));
	};
	
	Browser.engine = 
		(window.opera ? {name: "presto", version: (document.getElementsByClassName) ? 950 : 925} :
		(window.ActiveXObject ? {name: "trident", version: detectTridentVersion() } :
		(!navigator.taintEnabled ? {name: "webkit", version: (Browser.features.xpath) ? 420 : 419} :
		(document.getBoxObjectFor != null ? {name: "gecko", version: (document.getElementsByClassName) ? 19 : 18} : 
			{name: false, version: false}))));
	
	Browser[Browser.engine.name] = Browser[Browser.engine.name + Browser.engine.version] = true;
	
	Browser.ie  = typeof(Browser.trident) != "undefined";
	Browser.ie6 = typeof(Browser.trident4) != "undefined";
	Browser.ie7emu = typeof(Browser.trident6) != "undefined" && navigator.appVersion.indexOf("MSIE 7.0") > -1;
	Browser.ie7 = Browser.ie7emu || typeof(Browser.trident5) != "undefined";
	Browser.ie8 = typeof(Browser.trident6) != "undefined" && navigator.appVersion.indexOf("MSIE 8.0") > -1;
	
	Browser.ff = typeof(Browser.gecko) != "undefined";
	Browser.ff2 = typeof(Browser.gecko18) != "undefined";
	Browser.ff3 = typeof(Browser.gecko19) != "undefined";
	
	Browser.opera = typeof(Browser.presto) != "undefined";
	
	Browser.chrome = navigator.userAgent.match(/Chrome/i) != null;
	
	Browser.safari = !Browser.chrome && typeof(Browser.webkit) != "undefined";
	
	
	
	Browser.Page = {
		scrollTop: Browser.webkit ?
				function () { return document.body.scrollTop } :
				function () { return document.documentElement.scrollTop },
		
		scrollLeft: Browser.webkit ?
				function () { return document.body.scrollLeft } :
				function () { return document.documentElement.scrollLeft },
		
		width: Browser.webkit || Browser.ie7 || Browser.ie6  ?
				function () { return document.body.clientWidth } : 
				function () { return document.documentElement.clientWidth },
		
		height: Browser.webkit || Browser.ie7 || Browser.ie6 ?
				function () { return document.body.clientHeight } : 
				function () { return document.documentElement.clientHeight },
		
		characterSet: typeof(document.characterSet) != "undefined" ? document.characterSet : document.charset
	};

    nulljs.register("core.browser", Browser);
});