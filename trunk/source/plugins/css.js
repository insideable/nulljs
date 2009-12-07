nulljs.load("com.nulljs.array").module("com.nulljs.css", function (api) {

	var A = api.com.nulljs.array;

	var matchArgs = function (patterns) {
		var any_count = patterns["*"] || function () {
			throw "No pattern found for " + arguments;
		};
		
		return function () {
			return (patterns[arguments.length] || any_count).apply(window, arguments);
		};
	};

	var setClassName = function (element, class_name) {
		return (element.className = class_name, element);
	};

	var getClassName = function (element) {
		return element.className;
	};

	var getNamesList = function (class_name) {
		return class_name.split(" ");
	};

	var addClass = function (element, class_name) {
		(A(getNamesList(element.className)).indexOf(class_name) == -1) && (element.className += " " + class_name);
		return element;
	};

	var removeClass = function (element, class_name) {
		element.className = A(getNamesList(element.className)).filter(function (c) { return !!c && (c != class_name); }).join(" ");
		return element;
	};

	return function () {
		return {
			className: matchArgs({1: getClassName, 2: setClassName }),
			addClass: addClass,
			removeClass: removeClass
		};
	};
});