// 归并排序（Merge Sort）- 2-路归并
// 归并排序是建立在归并操作上的一种有效的排序算法。
// 该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。
// 将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。
// 若将两个有序表合并成一个有序表，称为2-路归并。
// 属于比较类排序-归并排序；时间复杂度O(nlog2n),空间复杂度O(n),稳定性-稳定。

// 算法描述：
// 1、把长度为n的输入序列分成两个长度为n/2的子序列；
// 2、对这两个子序列分别采用归并排序；
// 3、将两个排序好的子序列合并成一个最终的排序序列。

function mergeSort(arr) {
  let len = arr.length;
  if (len < 2) return arr;
  let middle = Math.floor(len / 2); // n/2 拆分
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right)); // 合并
}

// 归并
function merge(left, right) {
  let result = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }

  while (left.length > 0) {
    result.push(left.shift());
  }
  while (right.length > 0) {
    result.push(right.shift());
  }

  return result;
}

console.log(mergeSort([2, 8, 6, 5, 4, 7, 9, 10, 1, 3]));
