# 你不知道的javascript-中卷-第五章 - 语句和表达式

## 5.1　语句和表达式
“句子”（sentence）是完整表达某个意思的一组词，由一个或多个“短语”（phrase）组成，
它们之间由标点符号或连接词（and 和 or 等）连接起来。短语可以由更小的短语组成。有
些短语是不完整的，不能独立表达意思；有些短语则相对完整，并且能够独立表达某个意
思。这些规则就是英语的语法。
JavaScript 的语法也是如此。语句相当于句子，表达式相当于短语，运算符则相当于标点
符号和连接词。

### 5.1.1　语句的结果值
语句都有一个结果值（statement completion value，undefined 也算）。
var b // undefined
b = 18 // 18
ES5 规 范 12.2 节中的变量声明（VariableDeclaration）算法实际上有一个返回值,但是这
个值被变量语句（VariableStatement）算法屏蔽掉了（for..in 循环除外），最后返回结果
为空（undefined）。

### 5.1.2　表达式的副作用
最常见的有副作用:
1.函数调用

``` javascript
function foo() {
    a = a + 1;
}
var a = 1;
foo(); // 结果值：undefined。副作用：a的值被改变
```

2. 递增运算符 ++ 和递减运算符 -- 都是一元运算符
如++a，它的副作用（将 a 递增）产生在表达式返回结果值之前，而 a++ 的副作用则产生在
之后。

3.delete 返回 true，否则返回 false。其副作用是属性被从对象中删除（或者单元从 array
中删除）。

4. = 运算符
``` javascript
var a;
a = 42; // 42
a; // 42
```
a = 42 中的 = 运算符看起来没有副作用，实际上它的结果值是 42，它的副作用是将 42 赋
值给 a。

### 5.1.3　上下文规则
1. 大括号
 (1). 对象常量
 (2). 标签  // { foo: bar() }

2. 代码块
[] + {}; // "[object Object]"
{} + []; // 0 {}为空代码块

3. 对象解构（{ .. }）

4. else if 和可选代码块
事实上 JavaScript 没有 else if，但 if 和 else 只包含单条语句的时候可以省略代码块的
{ }。
if (b) { .. } else { .. } 实际上是跟在 else 后面的一个单独的语句，所以带不带 { } 都
可以。换句话说，else if 不符合前面介绍的编码规范，else 中是一个单独的 if 语句。

## 5.2　运算符优先级
MDN： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

### 5.2.1　短路
对&& 和 || 来说，如果从左边的操作数能够得出结果，就可以忽略右边的操作数。我们将这
种现象称为“短路”（即执行最短路径）。

### 5.2.3　关联
关联和执行顺序不是一回事
，? : 是右关联，并且它的组合方式会影响返回结果。
``` javascript
var a = true, b = false, c = true, d = true, e = false;
a ? b : (c ? d : e); // false, 执行 a 和 b
(a ? b : c) ? d : e; // false, 执行 a, b 和 e
```
= 运算符也是右关联

### 5.2.4　释疑
既要依赖运算符优先级 / 关联规则，也要适当使用 ( ) 自行控制方式。
如果运算符优先级 / 关联规则能够令代码更为简洁，就使用运算符优先级 / 关联规则；而如果
( ) 有助于提高代码可读性，就使用 ( )。

## 5.3　自动分号
有时 JavaScript 会自动为代码行补上缺失的分号，即自动分号插入（Automatic Semicolon
Insertion，ASI）。
ASI 实际上是一个“纠错”（error correction）机制，这里的错误是指解析器错误。
ASI 的目的在于提高解析器的容错性。

## 5.4　错误
JavaScript 不仅有各种类型的运行时错误（TypeError、ReferenceError、SyntaxError 等），
它的语法中也定义了一些编译时错误。
错误类型，分为两大类：早期错误（编译时错误，无法被捕获）和运行时错误（可以通过 try..catch 来捕获）。

*提前使用变量
ES6 规范定义了一个新概念，叫作 TDZ（Temporal Dead Zone，暂时性死区）。
TDZ 指的是由于代码中的变量还没有初始化而不能被引用的情况。


## 5.5　函数参数
TDZ 违规的例子，在ES6 中的函数参数默认值同样存在
``` javascript
var b = 3;
function foo( a = 42, b = a + b + 5 ) {
 // ..
}
```
b = a + b + 5 在参数 b（= 右边的 b，而不是函数外的那个）的 TDZ 中访问 b，所以会出
错。而访问 a 却没有问题，因为此时刚好跨出了参数 a 的 TDZ。

对 ES6 中的参数默认值而言，参数被省略或被赋值为 undefined 效果都一样，都是取该参
数的默认值。
向函数传递参数时，arguments 数组中的对应单元会和命名参数建立关联（linkage）以得
到相同的值。相反，不传递参数就不会建立关联。


## 5.6 try..finally
finally 中的代码总是会在 try 之后执行，如果有 catch 的话则在 catch 之后执行。也可以
将 finally 中的代码看作一个回调函数，即无论出现什么情况最后一定会被调用。
如果 finally 中抛出异常（无论是有意还是无意），函数就会在此处终止。如果此前 try 中
已经有 return 设置了返回值，则该值会被丢弃。

通常来说，在函数中省略 return 的结果和 return; 及 return undefined; 是一样的，但是
在 finally 中省略 return 则会返回前面的 return 设定的返回值。

## 5.7 switch
if ... else if ... else 的简化版
``` javascript
switch (a) {
    case 2:
    // 执行一些代码
    break;
    case 42:
    // 执行另外一些代码
    break;
    default:
    // 执行缺省代码
}
```
case 表达式的匹配算法与 === 相同。

可通过强制类型转换来进行相等比较：
``` javascript
var a = "42";
switch (true) {
    case a == 10:
    console.log( "10 or '10'" );
    break;
    case a == 42;
    console.log( "42 or '42'" );
    break;
    default:
    // 永远执行不到这里
}
// 42 or '42'
```
case 中还可以出现各种表达式，它会将表达式的结果值和 true 进行比较。

case 如果没有使用break，会先遍历并找到所有匹配的 case，如果没有匹配则执行default 中的代码。


# 附录
1.官方 ECMAScript 规范包括 Annex B，差异只存在于浏览器中。

2.宿主对象，宿主环境（浏览器等）创建并提供给 JavaScript 引擎的变量——所谓的“宿
主对象”（包括内建对象和函数）。

3.由于浏览器演进的历史遗留问题，在创建带有 id 属性的 DOM 元素时也会创建同名的全局变量。

5. <script>，如果 script 中的代码（无论是内联代码还是外部代码）发生错误，它会像独立的
JavaScript 程序那样停止，但是后续的 script 中的代码（仍然共享 global）依然会接着运
行，不会受影响。

4.JavaScript 的最佳实践是：不要扩展原生原型。

6. ES5 规范在 7.6.1 节中定义了一些“保留字”，我们不能将它们用作变量名，ES5之前也不能用
来作为对象常量中的属性名称或者键值。

7.实现中的限制：
• 字符串常量中允许的最大字符数（并非只是针对字符串值）；
• 可以作为参数传递到函数中的数据大小（也称为栈大小，以字节为单位）；
• 函数声明中的参数个数；
• 未经优化的调用栈（例如递归）的最大层数，即函数调用链的最大长度；
• JavaScript 程序以阻塞方式在浏览器中运行的最长时间（秒）；
• 变量名的最大长度。
我们不会经常碰到这些限制，但应该对它们有所了解，特别是不同的 JavaScript 引擎的限
制各异。