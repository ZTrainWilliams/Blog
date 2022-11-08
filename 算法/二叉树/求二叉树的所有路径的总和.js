// 求二叉树的所有路径的总和
const tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: {
      val: 4,
      left: null,
      right: null,
    },
  },
  right: {
    val: 5,
    left: null,
    right: null,
  },
};

function getTreePathsCounts(root) {
  let paths = [];
  const get_path = function (root, path) {
    if (root) {
      path += root.val;
      if (root.left === null && root.right === null) {
        paths.push(path);
      } else {
        get_path(root.left, path);
        get_path(root.right, path);
      }
    }
  };
  get_path(root, "");
  return (paths || []).reduce((p, c) => {
    p += Number(c);
    return p;
  }, 0);
}
// console.log(getTreePathsCounts(tree));

function getTreePathsCounts2(root) {
  let counts = 0;
  const get_path = function (root, count, n) {
    if (root) {
      count = count * (n > 0 ? 10 : 1) + Number(root.val);
      if (root.left === null && root.right === null) {
        counts += count;
      } else {
        ++n;
        get_path(root.left, count, n);
        get_path(root.right, count, n);
      }
    }
  };
  get_path(root, 0, 0);
  return counts;
}
console.log('getTreePathsCounts2', getTreePathsCounts2(tree));

// 求二叉树的所有路径 1->2->3
function binaryTreePaths(root) {
  let paths = [];
  let get_paths = function (root, path) {
    if (root) {
      path += root.val.toString();
      // 判断是否叶子节点
      if (root.left === null && root.right === null) {
        paths.push(path); // 叶子节点放入结果
      } else {
        path += "->";
        // 递归左右树杈
        get_paths(root.left, path);
        get_paths(root.right, path);
      }
    }
  };
  get_paths(root, "");
  return paths;
}
// console.log(binaryTreePaths(tree))
