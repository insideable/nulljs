(function () {
	var Loader = function () {
		var paths = {}, packages = {};
		
		var findBaseUrl = function (self_name) {
			var nodes = document.getElementsByTagName("script");
			for(var i = 0; i < nodes.length; i++) {
				var src = nodes[i].getAttribute("src") || ""; 
				if(src.indexOf(self_name) != -1) {
					return src.substr(0, src.indexOf(self_name));
				}
			}
			return "";
		};
		
		this.findUrl = function (module) {
			for(var i in packages) {
				if(module.indexOf(i) == 0) {
					return packages[i];
				}
			}
			return (function () {
				for(var i in paths) {
					if(module.indexOf(i) == 0) {
						return paths[i] + "/" + module.substr(i.length).split(".").join("/") + ".js";
					}
				}
				return (findBaseUrl("/null.js") + "/" + module.split(".").join("/") + ".js")
			})().replace(/([A-Z])/g, function (m) { return "-" + m.toLowerCase() }).replace(/\/-/g, "/");
		};
		
		this.load = (function () {
			var cache = {};
			return function (src) {
				if(!cache[src] || Options.forced_loading) {
					var s = document.createElement("script");
					s.setAttribute("src", src + (Options.forced_loading ? "?" + Math.random() : ""));
					s.setAttribute("type", "text/javascript");
					document.getElementsByTagName("head")[0].appendChild(s);
					cache[src] = true;
				}
			};
		})();
		
		this.Public = {
				addPath: function (prefix, path) {
					paths[prefix] = path;
					return this;
				},
				
				addPackage: function (modules, path) {
					for (var i = 0; i < modules.length; i++) {
						packages[modules[i]] = path;
					}
					return this;
				}
		};
	}
	
	var loader = new Loader(), modules = {}, namespaces = {}, Public = {}, Private = {};
	
	var Options = {
		forced_loading: false
	};
	
	var makeModule = function (name) {
		if(modules[name] == undefined) {
			modules[name] = {
				hooks: [],
				reference: undefined,
				url: loader.findUrl(name),
				dependencies: [],
				init: undefined,
				readystate: "loading"
			};
		}
		return modules[name];
	};

	var loadModule = function (name, callback) {
		var m = makeModule(name);
		callback && m.hooks.push(callback);
		loader.load(m.url);
	};
	
	var declareModule = function (name, dependencies, callback) {
		var m = makeModule(name);
		m.dependencies = dependencies;
		m.init = callback;
		m.readystate = "declared";
		loadDeps(dependencies);
		initModule(name);
	}
	
	var loadDeps = function(deps) {
		for(var i = 0; i < deps.length; i++) {
			loadModule(deps[i]);
		}
	}
	
	var indexOf = function (array, dep) {
		for(var i = 0; i < array.length; i++) {
			if(array[i] == dep) {
				return i;
			}
		}
		return -1;
	};
	
	var depsReady = function (module) {
		for(var i = 0; i < module.dependencies.length; i++) {
			var d = module.dependencies[i];
			if(!modules[d] || modules[d].readystate != "registered") {
				return false;
			}
		}
		return true;
	};
	
	var initModule = function (name) {
		var m = makeModule(name);
		(m.readystate == "declared" &&
			depsReady(m) &&
				(m.readystate = "init",
				 m.init && m.init(Private)));
	};
	
	var callDependedModules = function (name) {
		for(var i in modules) {
			var module = modules[i];
			if(indexOf(module.dependencies, name) != -1) {
				initModule(i);
//				var f = (function (n) { return function () { initModule(n)}})(i);
//				setTimeout(f, 10);
			}
		}
	};
	
	var callModuleHooks = function (name) {
		var m = makeModule(name);
		for(var i = 0; i < m.hooks.length; i++) {
			m.hooks[i] && m.hooks[i]();
		}
	};
	
	var registerModule = function (name, reference) {
		var m = makeModule(name);
		m.reference = reference;
		m.readystate = "registered";
		
		makePath(Private, name, reference);
		
		callModuleHooks(name);
		callDependedModules(name);
	};
	
	var publicateModule = function (name, reference) {
		merge(nulljs, makePath(Public, name, reference));
	};
	
	var merge = function (dst, src) {
		for(var i in src) {
			(dst[i] == undefined) && (dst[i] = src[i]);
		};
		return dst;
	};

	var extend = function (dst, src) {
		for(var i in src) {
			dst[i] = src[i];
		};
		return dst;
	};

	var makeNamespace = function (ns) {
		return namespaces[ns] == undefined ? namespaces[ns] = {} : namespaces[ns];
	};
	
	var makePath = function (root, path, reference) {
		var p = path.split("."), x = root;
		for(var i = 0; i < p.length - 1; i++) {
			x = x[p[i]] == undefined ? x[p[i]] = {} : x[p[i]];
		}
		x[p[p.length - 1]] = 
			(x[p[p.length - 1]] == undefined ? reference : merge(reference, x[p[p.length - 1]]));
			
		return root;
	};
	
	var resolveDeps = function (dependencies, ns) {
		for(var i = 0; i < dependencies.length; i++) {
			if(dependencies[i].indexOf("::") == 0) {
				// side-effect, it's OK
				dependencies[i] = ns + "." + dependencies[i].substr(2);
			}
		}
		return dependencies;
	};
	
	var nulljs = {
		loader: loader.Public,
		
		load: function (module, callback) {
			loadModule(module, callback);
		},
		
		module: function (module, dependencies, callback) {
			declareModule(module, resolveDeps(dependencies, module), callback);
		},
		
		register: function (module, reference) {
			registerModule(module, reference);
		},
		
		publicate: function (path, reference) {
			publicateModule(path, reference);
		},
		
		ns: function (ns) {
			return makeNamespace(ns);
		},
		
		setup: function (options) {
			return (extend(Options, options), this);
		},
		
		$: {
			namespaces: namespaces,
			modules: modules,
			Private: Private,
			Public: Public
		}
	};
	
	window.nulljs = nulljs;
	
})();
