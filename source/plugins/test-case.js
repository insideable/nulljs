nulljs.load("com.nulljs.(context|TestCase.Report)").module("com.nulljs.TestCase", function (api) {
	
	var context = api.com.nulljs.context;

	var ExAssertFailed = function (message) {
		this.message = message;
	};

    ExAssertFailed.prototype = new Error;

    ExAssertFailed.prototype.toString = function () {
        return this.message;
    };
	
	var push = function (value) {
		this.push(value);
	};
	
	var TestCase = function (methods) {
		var passed = [], failed = [], broken = [], incomplete = [];
		
		this.passed = context(passed, push);
		this.failed = context(failed, push);
		this.broken = context(broken, push);
		this.incomplete = context(incomplete, push);
		
		this.methods = methods;
		this.report = new api.com.nulljs.TestCase.Report(passed, failed, broken, incomplete);
	};
	
	TestCase.prototype.cleanup = function () {
		this.asserts = 0;
	};
	
	TestCase.prototype.run = function (name, source_url) {
		this.report.link(source_url, name || "Unnamed TestCase").nl();
		for(var i in this.methods) {
			this.cleanup();
			try {
				context(this, this.methods[i])();
				this.report.print(this.asserts == 0 ? (this.incomplete([i]), "I") : (this.passed(i), "."));
			} catch (e) {
				if(!(e instanceof ExAssertFailed)) {
					this.broken([i, e]);
					this.report.print("B");
				} else {
					this.failed([i, e]);
					this.report.print("F");
				}
			}
		}
		this.report.printSummary();
	};

    TestCase.throwMessage = function (e) {
        setTimeout(function () {
            throw e;
        }, 0);
    };
	
	TestCase.prototype.assertTrue = function (condition, message) {
		if(condition == false) {
			throw new ExAssertFailed(message);
		}
		this.asserts++;
	};
	
	return TestCase;
});
