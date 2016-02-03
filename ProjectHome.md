**nulljs** is tiny modular framework with dynamic modules (aka plugins) loading support.

Basics usage example:
```
<script type="text/javascript" src="http://nulljs.googlecode.com/svn/trunk/source/null.js">
</script>
<script type="text/javascript">
nulljs.addPath("com.example", "http://my.domain/project/");
</script>
```

Now we define new module and store it as http://my.domain/project/sum.js:
```
nulljs.module("com.example.sum", function (api) {
    var sum = function (a, b) {
        return a + b;
    };

    return sum;
});
```

Somewhere in other part of code we have to use our _com.example.sum_ module:

```
nulljs.load("com.example.sum").run(function (api) {

    alert(api.com.example.sum(100, 230));

});
```

[API Reference](ApiIndex.md)