// 桶排序（Bucket Sort）
// 桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。
// 桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排）。
// 桶排序最好情况下使用线性时间O(n)，桶排序的时间复杂度，取决与对各个桶之间数据进行排序的时间复杂度，因为其它部分的时间复杂度都为O(n)

// 算法描述：
// 1、设置一个定量的数组当作空桶；
// 2、遍历输入数据，并且把数据一个一个放到对应的桶里去；
// 3、对每个不是空的桶进行排序；
// 4、从不是空的桶里把排好序的数据拼接起来。

function insertionSort(arr) {
  let len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1; // 已排序的最后一个值
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      // 大于当前值
      arr[preIndex + 1] = arr[preIndex]; // 值替换
      preIndex--;
    }
    arr[preIndex + 1] = current; // 比较完成，插入已排序
  }
  return arr;
}

function bucketSort(arr, size) {
  let len = arr.length;
  if (len === 0) return arr;

  // 确认最大最小值
  let minValue = arr[0];
  let maxValue = arr[0];
  for (let i = 0; i < len; i++) {
    if (arr[i] < minValue) {
      minValue = arr[i];
    } else if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }

  // 桶初始化
  let defaultSize = 5;
  let bucketSize = size || defaultSize;
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  let buckets = new Array(bucketCount);
  for (let i = 0; i < len; i++) {
    buckets[i] = [];
  }
  // 利用映射关系分配到桶中
  for (let i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
  }

  arr.length = 0;
  for (let i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]); // 对每个桶进行排序，这里使用了插入排序
    for (let j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j]);
    }
  }

  return arr;
}

console.log(bucketSort([2, 8, 6, 5, 4, 7, 9, 10, 1, 3]));
