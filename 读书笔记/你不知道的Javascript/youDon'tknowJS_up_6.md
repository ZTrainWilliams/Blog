## 你不知道的javascript 第六章

### 对象的设计模式比较

#### "原型"面向对象风格
``` javascript
    fucntion Foo (who) {
        this.me = who;
    }
    Foo.prototype.identify = function () {
        return "I am" + this.me;
    }
    function Bar (who) {
        Foo.call(this, who);
    }
    Bar.prototype = Object.create(Foo.prototype);

    Bar.prototype.speak = function () {
        alert("Hello," + this.identify() + ".");
    }

    var b1 = new Bar("b1");
    var b2 = new Bar("b2");

    b1.speak();
    b2.speak();
```
### "委托、对象关联"
```javascript
    var Foo = {
        me: null,
        init: function (who) {
            this.me = who;
        },
        identify = function () {
            return "I am" + this.me;
        }
    }

    var Bar = Object.create(Foo);

    Bar.speak = function () {
        alert("Hello," + this.identify() + ".");
    }

    var b1 = Object.create(Bar);
    b1.init("b1");

    var b2 = Object.create(Bar);
    b2.init("b2");

    b1.speak();
    b2.speak();
```

### class实现 控件"类"
``` javascript
class Widget {
    constructor (width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }
    render ($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + 'px',
                height: this.height + "px"
            }).appedTo($where);
        }
    }
}

class Button extends Widget {
    constructor (width, height, label) {
        super(width, height);
        this.label = label || "Default";
        this.$elem = $("<button>").text(this.label);
    }
    render ($where) {
        super($where);
        this.$elem.click(this.onclick.bind(this));
    }
    onClick(evt) {
        console.log("Button" + this.label + "Clicked!");
    }

    $(document).ready(function () {
        var $body = $(document.body);
        var btn1 = new Button(125, 30, "Hello");
        var btn2 = new Button(150, 40, "world");

        btn1.render($body);
        btn2.render($body);
    })
}
```
