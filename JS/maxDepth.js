/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var maxDepth = function (root) {
    console.log(root)
  if (root == null) return 0;
  let queue = [];
  queue.push(root);
  let ans = 0;
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      // 队头出队列
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    ans += 1;
  }
  return ans;
};

console.log(maxDepth([3,9,20,null,null,15,7]))

// 作者：angela-x
// 链接：https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/solution/die-dai-he-di-gui-liang-chong-si-lu-zui-emd85/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。