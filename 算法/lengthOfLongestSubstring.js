/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // if (s.length === 1) {
  //   return 1;
  // }
  // let max = 0;
  // let hasMap = new Map();
  // let i = 0;
  // let len = s.length;
  // while (i < len) {
  //   let cur = s[i];
  //   if (hasMap.has(cur)) {
  //     let oldIndex = hasMap.get(cur) + 1;
  //     max = Math.max(hasMap.size, max);
  //     hasMap.clear();
  //     hasMap.set(s[oldIndex], oldIndex);
  //     i = oldIndex;
  //   } else {
  //     hasMap.set(cur, i);
  //   }
  //   i++
  // }
  // return Math.max(hasMap.size, max);

  let max = 0
  let hasMap = new Map()
  let len = s.length
  for (let start = 0, end = 0; end < len; end++) {
    let cur = s[end]
    if (hasMap.has(cur)) {
      start = Math.max(hasMap.get(cur), start)
    }
    max = Math.max(max, end - start + 1)
    hasMap.set(cur, end + 1)
    console.log(hasMap)
  }
  return max
};
// console.log(lengthOfLongestSubstring("dvdf"))
console.log(lengthOfLongestSubstring("abcabcbb"))