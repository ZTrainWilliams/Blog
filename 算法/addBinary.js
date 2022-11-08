// 二进制求和（双指针）

var addBinary = function (a, b) {
  const res = [];
  // 进位
  let c = 0;
  // 两指针初始化尾部
  let i = a.length - 1;
  let j = b.length - 1;
  while (i >= 0 || j >= 0 || c) {
    // 获取指针指向的数字
    const aa = Number(a[i]) ? Number(a[i]) : 0;
    const bb = Number(b[j]) ? Number(b[j]) : 0;
    let sum = aa + bb + c;
    if (sum === 2) {
      // 如果和为2，则进位，和更新为0
      sum = 0;
      c = 1;
    } else if (sum === 3) {
      // 如果和为3，则进位，和更新为1
      sum = 1;
      c = 1;
    } else {
      // 否则进位为0
      c = 0;
    }
    // 更新后的sum从数组头部插入数组
    res.unshift(sum);
    console.log(res, sum, c);
    i--;
    j--;
  }
  // 返回字符串
  return res.join("");
};

console.log(addBinary('1111', '1111'))