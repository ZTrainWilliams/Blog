// 给定一个已按照 升序排列  的整数数组 numbers ，请你从数组中找出两个数满足相加之和等于目标数 target 。
// 函数应该以长度为 2 的整数数组的形式返回这两个数的下标值。numbers 的下标 从 0 开始计数 ，
// 所以答案数组应当满足 0 <= answer[0] < answer[1] < numbers.length 。
// 假设数组中存在且只存在一对符合条件的数字，同时一个数字不能使用两次。

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  // 二分查找
  for (let i = 0; i < numbers.length; i++) {
    let low = i + 1;
    let high = numbers.length - 1;
    let mid;
    while (high >= low) {
      // mid = Math.floor((low + high) / 2);
      mid = (high - low) / 2 + low;
      console.log(i, low, high, mid);
      if (numbers[mid] === target - numbers[i]) {
        return [i, mid];
      } else if (numbers[mid] > target - numbers[i]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
  }

  // 双指针向中间靠拢
  // let i = 0;
  // let l = numbers.length - 1;
  // while (l > i) {
  //   let sum = numbers[i] + numbers[l]
  //   if (sum === target) {
  //     return [i, l]
  //   } else if (sum > target) {
  //     --l
  //   } else {
  //     ++i
  //   }
  // }
  return [];
};

console.log(twoSum([1, 2, 4, 6, 10], 8));
