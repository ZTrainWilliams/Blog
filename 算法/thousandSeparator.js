// 千分符转换，包装number传入
// 测试用例 -123456.1 12

function thousandSeparator(n) {
  let s = n.toString();
  let f = "";
  // 判断是否有负数
  if (s.indexOf("-") !== -1) {
    s = s.replace("-", "");
    f = "-";
  }
  let arr = s.split(".");
  let str = Number(arr[0]).toLocaleString();
  // let str = arr[0].split("").reverse().reduce((p, c, i) => {
  //   console.log(p, c, i)
  //   // 3求余，0则加','
  //   return ((i % 3) ? c : (c + ',')) + p;
  // });
  return f + str + (arr.length > 1 ? '.' + arr[1] : "");
}

console.log(thousandSeparator(-123456.1), thousandSeparator(12));

