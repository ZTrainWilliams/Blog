// 可以引⼊的库和版本相关请参考 “环境说明”

function callIsArray(v) {
  return Object.prototype.toString.call(v) === "[object Array]";
}

function intersection(arrA, arrB) {
  if (!callIsArray(arrA) || !callIsArray(arrB)) {
    return "请保证传参为数组";
  }

  function findStartItem(arr, index, v) {
    for (let i = index; i < arr.length; i++) {
      if (arr[i] === v) {
        return i;
      }
    }
    return -1;
  }

  let result = [];
  let nextIndex = 0; // 记录下次起始位
  // 以最小数组做其实循环查询,且为递增数组
  let aList = [...(arrA.length > arrB.length ? arrB : arrA)];
  let bList = arrA.length > arrB.length ? arrA : arrB;

  for (let i = 0; i < aList.length; i++) {
    let idx = findStartItem(bList, nextIndex, aList[i]);

    if (idx !== -1) {
      nextIndex = ++idx;
      result.push(aList[i]);
    }
  }
  return result;
}

function main() {
  var arrA = [0, 1, 2, 3, 4, 5, 6];
  var arrB = [1, 2, 5, 10, 12, 13];

  intersection(arrA, arrB);
}

main();
