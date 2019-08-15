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