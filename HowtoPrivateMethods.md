
```
// some utils for our magic ;-)

var context = function (ctx, f, pub) {
	return function () {
		var v = f.apply(ctx, arguments);
		return v === ctx ? pub : v;
	}
};

var Private = function (pub, priv) {
	for(var p in pub) {
		if(pub[p] instanceof Function) {
			pub[p] = context(priv, pub[p], pub);
			priv[p] = context(pub, pub[p], pub);
		}
	}
	return pub;
}


// example of "class" with private properties

var Foo = function () {
	
	var Foo = function (x) {
		this.priv_x = x;
	};

	Foo.prototype.setX = function (x) {
		this.priv_x = x;
	};

	Foo.prototype.getX = function () {
		return this.priv_x;
	};

	var PublicFoo = function (x) {
		return Private(this, new Foo(x));
	}

	PublicFoo.prototype.x = function (x) {
		return (arguments.length == 0) ? this.getX() : (this.setX(x), this);
	};

	return PublicFoo;

}();

// some tests

var o = new Foo(111);
alert(o.x());			// 111
alert(o.priv_x);		// undefined
alert(o.x(111).priv_x);	// undefined
alert(o.x(222).x())		// 222

```