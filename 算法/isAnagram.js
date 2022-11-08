// 给定两个字符串 s 和 t ，编写一个函数来判断它们是不是一组变位词（字母异位词）。

// 注意：若 s 和 t 中每个字符出现的次数都相同且字符顺序不完全相同，则称 s 和 t 互为变位词（字母异位词）。

var isAnagram = function (s, t) {
  if (s.length !== t.length || s == t) {
    return false;
  }
  let hasMap = {};
  for (let i = 0; i < s.length; ++i) {
    hasMap[s[i]] = hasMap[s[i]] ? ++hasMap[s[i]] : 1;
  }

  for (let i = 0; i < t.length; ++i) {
    hasMap[t[i]] = hasMap[t[i]] ? --hasMap[t[i]] : -1;
    if (hasMap[t[i]] < 0) {
      return false
    }
  }
  return true;

  // 三 官方 hash表
  // if (s.length !== t.length || s == t) {
  //   return false;
  // }
  // const table = new Array(26).fill(0);
  // for (let i = 0; i < s.length; ++i) {
  //   table[s.codePointAt(i) - 'a'.codePointAt(0)]++;
  // }
  // console.log(table)
  // for (let i = 0; i < t.length; ++i) {
  //   table[t.codePointAt(i) - 'a'.codePointAt(0)]--;
  //   if (table[t.codePointAt(i) - 'a'.codePointAt(0)] < 0) {
  //     return false;
  //   }
  // }
  // return true;

  // 二 官方
  // if (s.length !== t.length || s === t) {
  //   return false
  // } else {
  //   return [...s].sort().join('') === [...t].sort().join('')
  // }

  // 一
  // if (s.length !== t.length || t.length === 1) {
  //   return false
  // }
  // let tArr = t.split('')
  // for (let i = 0; i < tArr.length; i++) {
  //   let cur = tArr[i]
  //   let net = s.indexOf(cur)
  //   if (net === -1) {
  //     return false
  //   } else {
  //     s = s.replace(cur, '')
  //   }
  // }
  // if (s === '') { return true }
};

console.log(isAnagram('rat', 'cat'))
console.log(isAnagram("managramm", "mnagaramm"));
