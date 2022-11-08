// 剑指 Offer II 003. 前 n 个数字二进制中 1 的个数
// 给定一个非负整数 n ，请计算 0 到 n 之间的每个数字的二进制表示中 1 的个数，并输出一个数组。
// 输入: n = 2
// 输出: [0,1,1]
// 解释:
// 0 --> 0
// 1 --> 1
// 2 --> 10

/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const bits = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    console.log(i, bits[i >> 1], bits )
    bits[i] = bits[i >> 1] + (i & 1);
  }
  return bits;

  // let res = new Array(n + 1).fill(0);
  // for (let i = 1; i <= n; i++) {
  //   res[i] = i.toString(2).match(/1/g).length
  // }
  // return res


  // let res = [0];
  // for (let i = 1; i < n + 1; i++) {
  //   res.push(getNum(i));
  // }
  // function getNum(i) {
  //   let binary = i.toString(2);
  //   let l = binary.length - 1;
  //   let num = 0;
  //   console.log(binary, binary[l], num);
  //   while (l >= 0) {
  //     if (binary[l] == 1) {
  //       ++num;
  //     }
  //     l--;
  //   }
  //   return num;
  // }
  // return res;
};

console.log(countBits(5))
