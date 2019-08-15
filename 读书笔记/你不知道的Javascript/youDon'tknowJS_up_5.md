
### 笨蛋 .__proto__
.__proto__看起来更像一个属性，实际上更像一个getter/setter
大致：
``` javascript
Object.defineProperty(Object.prototype, "__proto__", {
    get: function () {
        return Object.getPrototypeOf(this);
    },
    set: function (o) {
        Object.setPrototypeOf(this, o); // ES6
        return o;
    }
})
```

### Object.create ES5前的polyfill
```javascript
if (!Object.create) {
    Object.create = function (o) {
        function F(){}
        F.prototype = o;
        return new F()
    }
}
```

