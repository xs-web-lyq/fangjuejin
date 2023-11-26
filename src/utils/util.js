/**
 * 工具函数
 */

// 节流函数 ---- 第一次会触发，最后一次不会触发 ---- 使用时间戳
export function throttle(fn, delay) {
  // 保存当前上下文
  let that, args;
  // 之前的时间戳
  let old = 0;
  return function () {
    that = this;
    // 获取传递的参数
    args = arguments;
    // 获取当前时间戳
    let now = new Date().valueOf();
    // 如果当前时间戳 - 之前的时间戳 大于 delay，则执行函数
    if (now - old > delay) {
      // 因为此时的this指向不清晰，所以需要使用apply
      fn.apply(that, args);
      console.log(this);
      old = now;
    }
  };
}

// 节流函数 ---- 第一次不会触发，最后一次会触发---使用定时器
export function throttle1(fn, delay) {
  // 保存当前上下文
  let that, args;
  let timer = null;
  return function () {
    that = this;
    // 获取传递的参数
    args = arguments;
    // 第一次不触发
    if (!timer) {
      // 如果timer为null，设置定时器，执行函数---
      // clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(that, args);
        timer = null;
      }, delay);
    }
  };
}

//节流函数，综合使用
export function throttle2(fn, delay, options) {
  // 保存当前上下文
  let that,
    args,
    old = 0;
  let timer = null;
  // 获取配置项
  // let options = options || {};
  // 回调函数
  const later = () => {
    // 最后一次触发表示不适用时间戳，而是使用定时器，并更新时间戳
    old = new Date().valueOf();
    fn.apply(that, args);
    timer = null;
  };
  return function () {
    that = this;
    // 获取传递的参数
    args = arguments;
    // 获取当前时间戳
    const now = new Date().valueOf();
    // options.leading === false 表示第一次不触发
    if (options.leading === false && !old) {
      old = now;
    }
    // 如果当前时间戳 - 之前的时间戳 大于 delay，则执行函数
    if (now - old > delay) {
      // 如果now - old > delay，则立即执行，同时清楚定时器
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      // 因为此时的this指向不清晰，所以需要使用apply
      fn.apply(that, args);
      old = now;
    }
    // 如果options.trailing === false，表示最后一次不触发
    if (!timer && options.trailing !== false) {
      // 如果timer为null，设置定时器，执行函数---
      timer = setTimeout(later, delay);
    }
  };
}
