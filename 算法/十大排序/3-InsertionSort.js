/*
 * @Author: ZtrainWilliams ztrain1224@163.com
 * @Date: 2022-11-11 10:03:18
 * @Description: 
 */
// 插入排序（Insertion Sort）
// 简单插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
// 属于比较类排序-插入排序；时间复杂度O(n^2),空间复杂度O(1),稳定性-稳定。

// 算法描述：
// 1、从第一个元素开始，该元素可以认为已经被排序；
// 2、取出下一个元素，在已经排序的元素序列中从后向前扫描；
// 3、如果该元素（已排序）大于新元素，将该元素移到下一位置；
// 4、重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
// 5、将新元素插入到该位置后；
// 6、重复步骤2~5。

function insertionSort(arr) {
  let len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1; // 已排序的最后一个值
    current = arr[i];
    while(preIndex >= 0 && arr[preIndex] > current) { // 大于当前值
      arr[preIndex + 1] = arr[preIndex]; // 值替换
      preIndex--;
    }
    arr[preIndex + 1] = current; // 比较完成，插入已排序
  }
  return arr;
}

console.log(insertionSort([2, 8, 6, 5, 4, 7, 9, 10, 1, 3]));
