# com.nulljs.memoize #

**memoize** implements cached calling of _clean functions_.

Usage:
```
var f = api.com.nulljs.memoize()(<function expression>);
```

Call to api.com.nulljs.memoize() creates new memoize() function each time when called, so it is safe to modify memoize() in application code.

Example:
```

nulljs.load("com.nulljs.memoize").run(function (api) {
            var Memoize = api.com.nulljs.memoize();

            var fib = function (n) {
                    return n > 1 ? fib(n - 1) + fib(n - 2) : (n > 0 ? 1 : 0);
            };

            var fast_fib = Memoize(function (n) {
                    return n > 1 ? fast_fib(n - 1) + fast_fib(n - 2) : (n > 0 ? 1 : 0);
            });

            var now = function () { return +new Date()};

            var time = function (f) {
                    return function (t0) {
                            f();
                            return (now() - t0);
                    }(now());
            };

            alert("Fib timings: " + time(function () { fib(30) }));
            alert("Fast Fib timings: " + time(function () { fast_fib(30) }));
        });

```