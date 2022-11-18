// 快速排序（Quick Sort）
// 通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。
// 属于比较类排序-交换排序；时间复杂度O(n^2),空间复杂度O(nlog2n),稳定性-不稳定。

// 快速排序使用分治法来把一个串（list）分为两个子串（sub-lists）.算法描述：
// 1、从数列中挑出一个元素，称为 “基准”（pivot）；
// 2、重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
//    在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 3、递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

function QuickSort(arr, left, right) {
  let len = arr.length;
  var index;
  left = typeof left !== "number" ? 0 : left;
  right = typeof right !== "number" ? len - 1 : right;

  if (left < right) {
    index = partitionToIndex(arr, left, right);
    QuickSort(arr, left, index - 1);
    QuickSort(arr, index + 1, right);
  }
  return arr;
}

// 分区
function partitionToIndex(arr, left, right) {
  let piovt = left;
  let index = piovt + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[piovt]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, piovt, index - 1);
  return index - 1;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(QuickSort([2, 8, 6, 5, 4, 7, 9, 10, 1, 3]));
