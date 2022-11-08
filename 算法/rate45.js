// 二维数组逆时针旋转45度
// const list = [
//   [1, 0, 0,],
//   [0, 2, 0,],
//   [0, 0, 3,]
// ];

const list = [
  [1, 0, 0, 0, 0],
  [0, 2, 0, 0, 0],
  [0, 0, 3, 0, 0],
  [0, 0, 0, 4, 0],
  [0, 0, 0, 0, 5],
];

function rate45(arr) {
  let l = arr.length;
  var i = l - 1;
  let res = [];
  // 确定45度转换后，需要用做收集的二级数组
  for (let k = 0; k < 2 * l - 1; k++) {
    res.push([]);
  }

  // 处理右上角
  while (i > 0) {
    let r = 0;
    let c = i; // 二维索引从远端获取
    while (c < l) {
      res[r + i - 1].push(arr[r][c]);
      // r + i - 1 做位置替换
      r += 1;
      c += 1;
    }
    i -= 1;
  }

  i = 0;
  // 处理左下角
  while (i < l) {
    let r = i; // 一维索引从远端获取
    let c = 0;
    while (r < l) {
      res[i + l - 1].push(arr[r][c]);
      r += 1;
      c += 1;
    }
    i += 1;
  }

  return res;
}

console.log(rate45(list));
