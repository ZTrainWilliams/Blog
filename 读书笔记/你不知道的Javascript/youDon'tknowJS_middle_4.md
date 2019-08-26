# 你不知道的javascript-中卷-第四章 - 强制类型转换

将值从一种类型转换为另一种类型通常称为类型转换（type casting），这是显式的情况；隐
式的情况称为强制类型转换（coercion）。
个人则倾向于用“隐式强制类型转换”（implicit coercion）和“显式强制类型转换”（explicit coercion）来区分。
``` javascript
var a = 42;
var b = a + ""; // 隐式强制类型转换
var c = String( a ); // 显式强制类型转换
```
##　抽象值操作
### ToString
数组的默认 toString() 方法经过了重新定义，将所有单元字符串化以后再用 "," 连接起来。

undefined、function、symbol（ES6+）和包含循环引用（对象之间相互引用，形成一个无限循环）
的对象都不符合 JSON结构标准，支持 JSON 的语言无法处理它们。
JSON.stringify(..) 在对象中遇到 undefined、function 和 symbol 时会自动将其忽略，在
数组中则会返回 null（以保证单元位置不变）。

#### toJSON
对象中定义了 toJSON() 方法，JSON 字符串化时会首先调用该方法，然后用它的返回
值来进行序列化。
toJSON() 应该“返回一个能够被字符串化的安全的 JSON 值”。

JSON.stringify(..) 传递一个可选参数 replacer，它可以是数组或者函数，用
来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除，和 toJSON() 很像

``` javascript
var a = {
    b: 42,
    c: "42",
    d: [1,2,3]
};
JSON.stringify( a, ["b","c"] ); // "{"b":42,"c":"42"}"
JSON.stringify( a, function(k,v){
    if (k !== "c") return v;
});
// "{"b":42,"d":[1,2,3]}"
```

### ToNumber
true 转换为 1，false 转换为 0。undefined 转换为 NaN，null 转换为 0。
ToNumber 对以 0 开头的十六进制数并不按十六进制处理。
对象（包括数组）会首先被转换为相应的基本类型值,如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。


### ToBoolean
可强制转化成假值：undefined、null、+-0、NaN、""、false。
真值（truthy value）就是假值列表之外的值。


## 　显式强制类型转换
String、Number、.toString、 +c
+ 运算符的一元（unary）形式（即只有一个操作数）。+ 运算符显式地将 c 转
换为数字，而非数字加法运算。

####  日期显式转换为数字
(new Date).getTime()、  +new Date()、  Date.now()

#### ~ 运算符
~x 大致等同于 -(x+1)。
-1 是一个“哨位值”， C 语言中我们用 -1 来代表函数执行失败，用大于等于 0 的值来代表函数执行成功，
JavaScript 中有很多方法查找失败返回-1（indenOf、find），if (~a.indexOf(..)) 仍然是对 indexOf(..) 的返回结果进行
隐式强制类型转换，0 转换为 false，其他情况转换为 true。
代码上来讲人认为 ~ 比 >= 0 和 == -1 更简洁。

#### 字位截除
~~ 中的第一个 ~ 执行 ToInt32 并反转字位，然后第二个 ~ 再进行一次字位反转，即将所有
字位反转回原值，最后得到的仍然是 ToInt32 的结果。
``` javascript
Math.floor( -49.6 ); // -50
~~-49.6; // -49

~~1E20 / 10; // 166199296
1E20 | 0 / 10; // 1661992960
(1E20 | 0) / 10; // 166199296
```

### 显式解析数字字符串
parseInt() 函数可解析一个字符串，并返回一个整数。只有字符串中的第一个数字会被返回,开头和结尾的空格是允许的。
如果字符串的第一个字符不能被转换为数字，那么 parseFloat() 会返回 NaN。

ES5 之前的 parseInt(..) 如果没有第二个参数来指定转换的基数（又称为 radix: 2 ~ 36），会根据字符串的第一个字符来自行决定基数。
ES5 开始 parseInt(..) 默认转换为十进制数。

### 显式转换为布尔值
建议使用 Boolean(a) 和 !!a 来进行显式强制类型转换


## 4.4隐式强制类型转换
隐式强制类型转换指的是那些隐蔽的强制类型转换，副作用也不是很明显。

### 4.4.2　字符串和数字之间的隐式强制类型转换
通过重载，+ 运算符即能用于数字加法，也能用于字符串拼接。
其中一个操作数是字符串（或者数组、对象通过ToPrimitive 抽象操作后），则执行字符串拼接；否则执行数字加法。

a + "" 会对 a 调用 valueOf() 方法，然后通过 ToString 抽象操作将返回值转换为字符串。
而 String(a) 则是直接调用 ToString()。
``` javascript
var a = {
    valueOf: function() { return 42; },
    toString: function() { return 4; }
};
a + ""; // "42"
String( a ); // "4"
```

- * / 这三个运算符都需要被转换为数字，它们首先被转换为字符串（通过强制类型转换toString()），
然后再转换为数字。

### 4.4.3　布尔值到数字的隐式强制类型转换
onlyOne的唯一真值实现，可多个参数。
``` javascript
fucntion onlyOne () {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        // 跳过假值，和处理0一样，但是避免了NaN
        if (arguments[i]) {
            sum += arguments[i];
        }
    }
    return sum == 1;
}

var a = true;
var b = false;
onlyOne( b, a ); // true
onlyOne( b, a, b, b, b ); // true
onlyOne( b, b ); // false
onlyOne( b, a, b, b, b, a ); // false
```

### 4.4.4　隐式强制类型转换为布尔值
(1) if (..) 语句中的条件判断表达式。
(2) for ( .. ; .. ; .. ) 语句中的条件判断表达式（第二个）。
(3) while (..) 和 do..while(..) 循环中的条件判断表达式。
(4) ? : 中的条件判断表达式。
(5) 逻辑运算符 ||（逻辑或）和 &&（逻辑与）左边的操作数（作为条件判断表达式）。

### 4.4.5 || 和 && (选择器运算符)
ES5 规范 11.11 节：&& 和 || 运算符的返回值并不一定是布尔类型，而是两个操作数其中一个的值。

&&如果第一个操作数为真值，则 && 运算符“选择”第二个操作数作为返回值，这也叫作“守护运算符”。
常见if (a) { foo(); }，JavaScript代码压缩工具用的是 a && foo()。

### 4.4.6　符号的强制类型转换
``` javascript
    var s1 = Symbol( "cool" );
    String( s1 ); // "Symbol(cool)"
    var s2 = Symbol( "not cool" );
    s2 + ""; // TypeError
```
符号不能够被强制类型转换为数字（显式和隐式都会产生错误），但可以被强制类型转换
为布尔值（显式和隐式结果都是 true）。


## 宽松相等和严格相等
宽松相等（loose equals）== 和严格相等（strict equals）=== 都用来判断两个值是否“相等”,
=== 检查值和类型是否相等, == 允许在相等比较中进行强制类型转换,而 === 不允许。

### 4.5.2　抽象相等
非常规情况：
NaN 不等于 NaN
+0 等于 -0

``` txt
1. 字符串和数字之间的相等比较
ES5 规范 11.9.3.4-5 这样定义：
(1) 如果 Type(x) 是数字，Type(y) 是字符串，则返回 x == ToNumber(y) 的结果。
(2) 如果 Type(x) 是字符串，Type(y) 是数字，则返回 ToNumber(x) == y 的结果。

2. 其他类型和布尔类型之间的相等比较
规范 11.9.3.6-7 是这样说的：
(1) 如果 Type(x) 是布尔类型，则返回 ToNumber(x) == y 的结果；
(2) 如果 Type(y) 是布尔类型，则返回 x == ToNumber(y) 的结果。

3. null 和 undefined 之间的相等比较
null 和 undefined 之间的 == 也涉及隐式强制类型转换。ES5 规范 11.9.3.2-3 规定：
(1) 如果 x 为 null，y 为 undefined，则结果为 true。
(2) 如果 x 为 undefined，y 为 null，则结果为 true。

4. 对象和非对象之间的相等比较
关于对象（对象 / 函数 / 数组）和标量基本类型（字符串 / 数字 / 布尔值）之间的相等比
较，ES5 规范 11.9.3.8-9 做如下规定：
(1) 如果 Type(x) 是字符串或数字，Type(y) 是对象，则返回 x == ToPrimitive(y) 的结果；
(2) 如果 Type(x) 是对象，Type(y) 是字符串或数字，则返回 ToPromitive(x) == y 的结果。
```

### 4.5.3　比较少见的情况
1.返回其他数字
Number.prototype.valueOf = function() {
 return 3;
};

2.假值的相等比较 (假阳)
"0" == false; // true -- 晕！
false == 0; // true -- 晕！
false == ""; // true -- 晕！
false == []; // true -- 晕！
"" == 0; // true -- 晕！
"" == []; // true -- 晕！
0 == []; // true -- 晕！

[] == ![] // true
0 == "\n"; // true ToNumber("\n") => 0


## 4.6　抽象关系比较
* ES5 规范 11.8.5 节定义了“抽象关系比较”（abstract relational comparison），分为两个部
分：比较双方都是字符串（后半部分）和其他情况（前半部分）。

* 比较双方首先调用 ToPrimitive，如果结果出现非字符串，就根据 ToNumber 规则将双方强
制类型转换为数字来进行比较。

1.比较双方都是字符串，则按字母顺序来进行比较
``` javascript
var a = [ "42" ]; // [4, 2]
var b = [ "043" ]; // [0, 4, 2]
a < b; // 4 < 0 => false
```
2. 比较双方都是数组，则按数组顺序([0])来进行比较
3. JavaScript 中 <= 是“不大于”的意思（即 !(a > b)，处理为 !(b < a)）。同理 a >= b 处理为 b <= a。
如：a <= b 被处理为 b < a，然后将结果反转。因为 b < a 的结果是 false，所以 a <= b 的结果是 true。
