nulljs.module("core.TestCase", ["core.closure", "core.TestCase.Report"], function (api) {
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
		
		this.passed = api.core.closure(passed, push);
		this.failed = api.core.closure(failed, push);
		this.broken = api.core.closure(broken, push);
		
		this.methods = methods;
		this.report = new api.core.TestCase.Report();
	};
	
	TestCase.prototype.cleanup = function () {
		this.asserts = 0;
	};
	
	TestCase.prototype.run = function (name, source_url) {
		this.report.link(source_url, name || "Unnamed TestCase").nl();
		for(var i in this.methods) {
			this.cleanup();
			try {
				api.core.closure(this, this.methods[i])();
				this.passed(i);
				this.report.print(this.asserts == 0 ? "I" : ".");
			} catch (e) {
				if(!(e instanceof ExAssertFailed)) {
					this.broken(i);
					this.report.print("B");
                    TestCase.throwMessage(e);
				} else {
					this.failed(i);
					this.report.print("F");
				}
                TestCase.throwMessage((e.message = name + "." + i + ": " + e.message,e ));
			}
		}
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
	
	nulljs.register("core.TestCase", TestCase);
});
