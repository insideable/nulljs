# nulljs Core Reference #

Интерфейс объекта: `nulljs.{addPath|addPrefix|load|module|self}()`. Объект является синлтоном, доступен как свойство текущего window браузера.

## `.addPath(prefix, path) -> void` ##

Устанавливает префикс пути `path`, который будет использоваться для загрузки модулей с префиксом `prefix`.

**Пример:**
```
nulljs.addPath("com.skype.", "http://skype.com/js");

// обращаемся к http://skype.com/js/messenger.js
nulljs.load("com.skype.messenger");

// обращаемся к http://skype.com/js/proxy/video.js
nulljs.load("com.skype.proxy.video");

```

## `.addPackage(prefix, package) -> void` ##

Указывает, что модули с префиксом имени `prefix` находятся в файле `package`. При загрузке нескольких модулей с данным префиксом, обращение к `package` будет выполнено только один раз.

**Пример:**
```
nulljs.addPackage("com.google.", "http://google.com/js-api/compressed.js");

nulljs.load("com.google.maps"); // грузим http://google.com/js-api/compressed.js
nulljs.load("com.google.office"); // ничего не грузим
```

## `.load(<modules>) -> Code object` ##

Загружает указанные модули, включая требуемые зависимости. Модули загружаются согласно путям, установленным ранее через `addPath`, `addPackage`.

**Пример:**
```
// загрузим три модуля
nulljs.load("com.example.foo", "com.example.bar", "com.example.zoo");

// версия для ленивых. полезна для пачки модулей с одним префиксом:
nulljs.load("com.example.(foo|bar|zoo)");
// P.S. так зарождался Perl ;-)
```

## `.module(name, constructor) -> void` ##

Декларирует модуль `name` и вызывает `constructor` для инициализации модуля. Обычно, `constructor` возвращает **нечто** (объект, функция, значение), что будет использоваться пользовательским кодом позже.

Перед декларацией модуля можно указать список зависимостей, заюзав nulljs.load().

**Пример:**
```

nulljs.module("com.example.foo", function () {
    return "foo";
});

nulljs.load("com.example.foo").module("com.example.bar", function (api) {
   return function () {
      return [api.com.example.foo, "BAR"];
   }
});

nulljs.load("com.example.bar").module("com.example.zoo", function (api) {
    var push = function (array, value) {
        return (array.push(value), array);
    }

    return push(api.com.example.bar(), "Zoo");
});

nulljs.load("com.example.zoo").run(function (api) {
  alert(api.com.example.zoo.join(":"); // "foo:BAR:Zoo"
});

```

Единственным аргументом (в примере выше - `api`), передаваемым в constructor является хэш, содержащий точки входа задекларированных в `load()` зависимостей. Вложенные зависимости отсутствуют в `api`:
```
nulljs.load("com.example.zoo").run(function (api) {
  alert(api.com.example.zoo.join(":"); // "foo:BAR:Zoo"
  alert(api.com.example.bar) // undefined
});
```