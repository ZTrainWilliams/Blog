var maxRotateFunction = function (nums) {
  const n = nums.length;
  let f = 0,
    s = 0;
  for (let i = 0; i < n; i++) {
    f += i * nums[i];
    s += nums[i];
  }
  console.log(f, s);
  let ans = f;
  for (let i = n - 1; i > 0; i--) {
    f += s - n * nums[i];
    console.log(f, s - n * nums[i]);
    ans = Math.max(ans, f);
  }
  return ans;
};

const nums = [-2, 0, 1];
console.log(maxRotateFunction(nums));
