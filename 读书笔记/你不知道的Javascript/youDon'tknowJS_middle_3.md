你不知道的javascript-中卷-第三章

## 原生函数

### 内建函数 -> 原生函数
常用：String()、 Object()、 Number()、 Boolean()、 Array()、 Function()、 RegExp()、Date()、Error()、 Symbol()

``` javascript
var a = new String('b');
typeof a; // 'object'
a instanceofString; // true
Object.prototype.toString.call(a); // "[object String]"
```

### 内部属性 [[Class]]
所有 typeof 返回值为 "object" 的对象（如数组）都包含一个内部属性 [[Class]]（我们可
以把它看作一个内部的分类，而非传统的面向对象意义上的类）。这个属性无法直接访问，
一般通过 Object.prototype.toString(..) 来查看.

基 本 类 型 值 没 有 .length和 .toString() 这样的属性和方法，需要通过封装对象才能访问

### 解释
``` javascript
var a = new Boolean( false );
if (!a) {
    console.log( "Oops" ); // 执行不到这里
}
```
为 false 创建了一个封装对象，然而该对象是真值（“truthy”，即总是返回 true)。

### 拆封
可使用valueOf函数获得封装对象的基本类型值。
var a = new String( "abc" );
var b = new Number( 42 );
var c = new Boolean( true );
a.valueOf(); // "abc"
b.valueOf(); // 42
c.valueOf(); // true


### 原生函数作为构造函数
于数组（array）、对象（object）、函数（function）和正则表达式，我们通常喜欢以常
量的形式来创建它们。实际上，使用常量和使用构造函数的效果是一样的（创建的值都是
通过封装对象来包装）。
不建议使用new 的构造函数，会出现意想不到的效果。

Date.now() 等于 (new Date()).getTime()