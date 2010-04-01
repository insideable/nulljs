nulljs.load("com.nulljs.(TestCase|hooks)").module("com.nulljs.tests.TestHooks", function (api) {
	var H = api.com.nulljs.hooks;

	return new api.com.nulljs.TestCase({
		testHooks: function()
        {
            var h1_test = false;
            var h2_test = false;
            var h3_test = false;

            var h2_result = null;
            var h3_result = null;

            var h1 = function()
            {
                h1_test = true;
            };

            var h2 = function(p)
            {
                h2_test = true;
                h2_result = p;
            };

            var h3 = function(p)
            {
                h3_test = true;
                h3_result = p;
            };

            H.addHook("hook1", h1);
            H.addHook("hook1", h2);
            H.addHook("hook2", h3);

            H.raiseHooks("hook1", {data: 345});
            H.raiseHooks("hook2");

            this.assertTrue(h1_test, "hook1 -> h1 didn't raise");
            this.assertTrue(h2_test, "hook1 -> h2 didn't raise");
            this.assertTrue(h2_result && h2_result.data == 345, "hook1 -> send params error");
            this.assertTrue(h3_test, "hook2 -> h3 didn't raise");
            this.assertTrue(!h3_result, "hook2 -> bad params");

            h1_test = false;
            h2_test = false;
            h3_test = false;

            h2_result = null;
            h3_result = null;

            H.raiseHooks("hook1", {data: 345});
            H.raiseHooks("hook2");

            this.assertTrue(h1_test, "hook1 -> h1 didn't raise");
            this.assertTrue(h2_test, "hook1 -> h2 didn't raise");
            this.assertTrue(h2_result && h2_result.data == 345, "hook1 -> send params error");
            this.assertTrue(h3_test, "hook2 -> h3 didn't raise");
            this.assertTrue(!h3_result, "hook2 -> bad params");

            h1_test = false;
            h2_test = false;

            H.clearHooks("hook1");
            H.raiseHooks("hook1");
            this.assertTrue(!h1_test || !h2_test, "clear doesn't work");
        }
	});

});
