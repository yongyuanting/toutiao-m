/**
 * 封装本地存储操作模块
 */

/**
 * 存储数据
 */
const setItem = (key, value) => {
  if (typeof value === 'object') {
    // 将数组或者对象类型数据转化为JSON格式字符串进行存储
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
/**
 * 获取数据
 */
const getItem = key => {
  // 很难判断一个字符串是JSON字符串
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
/**
 * 删除数据
 */
const removeItem = key => {
  window.localStorage.removeItem(key)
}
export { setItem, getItem, removeItem }
