// 手写Promise，文章【https://juejin.cn/post/6945319439772434469】
// 声明状态常量
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    try {
      // executor 执行器
      executor(this.resolve, this.reject);
      // resolve和reject为什么要用箭头函数？
      // 如果直接调用的话，普通函数this指向的是window或者undefined
      // 用箭头函数就可以让this指向当前实例对象
    } catch (error) {
      this.reject(error);
    }
  }

  // 状态存储
  status = PENDING;

  value = null; // 成功后的值

  reason = null; // 失败后的原因

  // 存储成功回调函数
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallbacks = [];

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        // 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        // 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };

  then(onFulfilled, onRejected) {
    const realOnFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    const realOnRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const nextPromise = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value);
            resolvePromise(nextPromise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason);
            resolvePromise(nextPromise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      // 判断状态
      if (this.status === FULFILLED) {
        // 调用成功回调，并且把值返回
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        // 调用失败回调，并且把原因返回
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });
    return nextPromise;
  }

  // resolve 静态方法
  static resolve(parameter) {
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    return new MyPromise((resolve) => {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

function resolvePromise(nextPromise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (nextPromise === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }

  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

const promise = new MyPromise((resolve, reject) => {
  resolve("success");
  // reject('err')
});

// 第一个then方法中的错误要在第二个then方法中捕获到
promise
  .then(
    (value) => {
      console.log(1);
      console.log("resolve", value);
      throw new Error("then error");
    },
    (reason) => {
      console.log(2);
      console.log(reason.message);
    }
  )
  .then(
    (value) => {
      console.log(3);
      console.log(value);
    },
    (reason) => {
      console.log(4);
      console.log(reason.message);
    }
  );
