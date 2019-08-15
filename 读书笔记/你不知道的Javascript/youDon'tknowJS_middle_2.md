你不知道的javascript-中卷-第一章

### 内置类型
空值（null）
未定义 （undefined）
布尔值 （boolean）
数字 （number）
字符串 （string）
符号 （symbol）- ES6
对象 （object）

#### 浮点数
个误差范围值，通常称为“机器精度”（machine epsilon），这个值通常是 2^-52 (2.220446049250313e-16)。
``` javascript
if (!Number.EPSILON) {
    Number.EPSILON = Math.pow(2,-52);
}
function numbersCloseEnoughToEqual(n1,n2) {
    return Math.abs( n1 - n2 ) < Number.EPSILON;
}
var a = 0.1 + 0.2;
var b = 0.3;
numbersCloseEnoughToEqual( a, b ); // true
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ); // false
```

#### 整数检测
要检测一个值是否是整数，可以使用 ES6 中的 Number.isInteger(..), Number.isInteger( 42.0 ); // true
``` javascript
if (!Number.isInteger) {
    Number.isInteger = function(num) {
        return typeof num == "number" && num % 1 == 0;
    };
}
```

#### 不是数字的数字(not a number -> NaN)
NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN != NaN 为 true。
判断是否NaN的方法isNaN(..)，检查参数是否不是 NaN，也不是数字，但是字符串也能被判断成true。
ES6可使用Number.isNaN(..), 之前的
``` javascript
if (!Number.isNaN) {
    Number.isNaN = fucntion (n) {
        return typeof n === 'number' && window.isNaN(n)
    }
}

// 法二
if (!Number.isNaN) {
    Number.isNaN = fucntion (n) {
        return n !== n
    }
}
```

#### 是否负零值
``` javascript
function isNegZero(n) {
    n = Number( n );
    return (n === 0) && (1 / n === -Infinity);
}
```

ES6: Object.is(..) 来判断两个值是否绝对相等


### 基本类型值（scalar primitive）
null、undefined、字符串、数字、布尔和 ES6 中的 symbol。