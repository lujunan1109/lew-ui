/**
 * 对于父子组绑定的sync使用
 * 在子组件中的computed调用
 * @export get/set
 * @param {*} value
 */
export function getSet(value, setFn) {
  return {
    get() {
      return this[value]
    },
    set(nd) {
      if (setFn) {
        setFn(nd)
      } else {
        this.$emit(`update:${value}`, nd)
      }
    },
  }
}

/**
 * 返回检测类型
 * @param {*} value - 要被检测类型的数据
 * @returns {String}
 */
export function toType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}