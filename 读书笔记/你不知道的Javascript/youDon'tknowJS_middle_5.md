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



