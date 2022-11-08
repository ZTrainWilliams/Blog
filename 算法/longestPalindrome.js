/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (!s || s.length < 1) {
    return "";
  }
  let len = s.length;
  let start = 0,
    end = 0;
  for (i = 0; i < len; i++) {
    let n1 = expandAroundCenter(i, i);
    let n2 = expandAroundCenter(i, i + 1);
    let max = Math.max(n1, n2);
    console.log(max, i, n1, n2);
    if (max > end - start) {
      start = i - Math.floor((max - 1) / 2);
      end =  i + max / 2;
    }
    // console.log(start, end)
  }
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < len && s.charAt(left) == s.charAt(right)) {
      --left;
      ++right;
    }
    return right - left - 1;
  }
  return s.substring(start, end + 1);
};

console.log(longestPalindrome("babad"));
console.log(longestPalindrome("cbbd"));
// console.log(longestPalindrome("ccbd"));

