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

function getArrDifSameValue(arr1, arr2) {
  var result = [];
  for (var i = 0; i < arr2.length; i++) {
    var obj = arr2[i];
    let index = arr1.findIndex((v) => {
      return v === obj.value;
    });
    if (index !== -1) {
      result.push(obj);
    }
    // var isExist = false;
    // for (var j = 0; j < arr1.length; j++) {
    //   var aj = arr1[j];
    //   if (aj == value) {
    //     isExist = true;
    //     break;
    //   }
    // }
    // if (isExist) {
    //   result.push(obj);
    // }
  }
  return result;
}

function getArrDifSameValue2(arr1, arr2) {
  let newArr = [].concat(arr1, arr2);
  let res = [];
  let map = new Map();
  for (var i = 0; i < newArr.length; i++) {
    if (map.has(newArr[i])) {
      res.push(newArr[i]);
    } else {
      map.set(newArr[i], 1);
    }
  }
  return res;
}

// function compare(arr1, arr2) {
//   let result = new Map();
//   arr1.forEach((item) => {
//     let cur = arr2.find(v => {return v.id === item.id})
//     if(cur){
//       result.set(cur.id, cur)
//     }
//   })
//   return result.values();
// }

// function compare(arr1, arr2) {
//   let result = new Map();
//   let map2 = new Map();
//   arr2.forEach((item) => {
//     map2.set(item.id, item)
//   })
//   arr1.forEach((item) => {
//     let cur = arr2.has(item.id)
//     if(cur){
//       result.set(cur.id, cur)
//     }
//   })
//   return result.values();
// }

console.log(getArrDifSameValue2([0, 1, 2, 3, 4, 5, 6], [1, 2, 5, 10, 12, 13]));
