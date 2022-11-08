// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function (s) {
  const n = s.length;
  if (n % 2 === 1) {
    return false;
  }
  // 确认闭合括号的哈希表
  const pairs = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);
  const stk = [];
  for (let ch of s) {
    if (pairs.has(ch)) {
      // 当查找到关闭的括号
      // 1. 关闭的括号其实直接说明不能保证闭合
      // 2. 数组最后一项能否跟当前ch闭合
      if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
        return false;
      }
      // 闭合则消除记录
      stk.pop();
    } else {
      // 起始括号放着到数组中
      stk.push(ch);
    }
  }
  return !stk.length;
};
// 测试用例
let testList = [
  '{}',
  '()',
  '[]',
  '(){}[]',
  '{{}}',
  '{}}',
  '}{',
  '{{(})}'
]
testList.forEach((v, i) => {
  console.log(i, v,  isValid(v))
})