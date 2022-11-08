// 两次遍历
// 问题可以转换成，对 ss 的每个下标 ii，求

// s[i]s[i] 到其左侧最近的字符 cc 的距离
// s[i]s[i] 到其右侧最近的字符 cc 的距离
// 这两者的最小值。

// 对于前者，我们可以从左往右遍历 ss，若 s[i]=cs[i]=c 则记录下此时字符 cc 的的下标 \textit{idx}idx。遍历的同时更新 \textit{answer}[i]=i-\textit{idx}answer[i]=i−idx。

// 对于后者，我们可以从右往左遍历 ss，若 s[i]=cs[i]=c 则记录下此时字符 cc 的的下标 \textit{idx}idx。遍历的同时更新 \textit{answer}[i]=\min(\textit{answer}[i],\textit{idx}-i)answer[i]=min(answer[i],idx−i)。

// 代码实现时，在开始遍历的时候 \textit{idx}idx 可能不存在，为了简化逻辑，我们可以用 -n−n 或 2n2n 表示，这里 nn 是 ss 的长度。

var shortestToChar = function (s, c) {
  const n = s.length;
  const ans = new Array(n).fill(0);

  for (let i = 0, idx = -n; i < n; ++i) {
    if (s[i] === c) {
      idx = i;
    }
    ans[i] = i - idx;
  }

  for (let i = n - 1, idx = 2 * n; i >= 0; --i) {
    if (s[i] == c) {
      idx = i;
    }
    a[i] = idx - i
    ans[i] = Math.min(ans[i], idx - i);
  }
  return ans;
};

console.log(shortestToChar("loveleetcode", "e"));
