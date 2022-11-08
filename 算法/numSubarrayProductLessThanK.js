// 给你一个整数数组 nums 和一个整数 k ，请你返回子数组内所有元素的乘积严格小于 k 的连续子数组的数目。
// 输入：nums = [10,5,2,6], k = 100
// 输出：8
// 解释：8 个乘积小于 100 的子数组分别为：[10]、[5]、[2],、[6]、[10,5]、[5,2]、[2,6]、[5,2,6]。
// 需要注意的是 [10,5,2] 并不是乘积小于 100 的子数组。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  let n = nums.length, ret = 0;
  let prod = 1, left = 0;
  for (let j = 0; j < n; j++) {
    prod *= nums[j];
    while (left <= j && prod >= k) {
      console.log(ret, j, left, prod, nums[left])
      prod /= nums[left];
      left++;
      console.log(ret, j, left, prod)
    }
    // console.log(ret, j, left, prod)
    ret += j - left + 1;
  }
  return ret;

  // let res = [];
  // for (let i = 0; i < nums.length; i++) {
  //   let v = nums[i]
  //   if (v < k) {
  //     res.push(v)
  //   }
  //   getNextArr([v], v, i)
  // }
  // function getNextArr(nextArr, next, i) {
  //   let j = i + 1
  //   if (j >= nums.length) {
  //     return false
  //   }
  //   let v = next * nums[j];
  //   if (v < k ) {
  //     let curArr = [...nextArr, nums[j]];
  //     res.push(curArr);
  //     getNextArr(curArr, v, j);
  //   }
  // }
  // return res.length;
};

console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100));
