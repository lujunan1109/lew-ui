<template>
  <el-input v-model.trim="upValue"
            v-bind="$attrs"
            class="base-button"
            v-on="$listeners">
    <slot v-for="slotItem in $slots"
          :slot="slotFormat(slotItem).name"
          :name="slotFormat(slotItem).alias">
      {{ slotFormat(slotItem).text }}
    </slot>
  </el-input>
</template>

<script>
import { toType, getSet } from '../../assets/js'

export default {
  name: 'base-input',
  props: {
    value: {
      type: [Number, String],
      default: null
    }
  },
  computed: {
    upValue: getSet('value')
  },
  methods: {
    // 格式化slot
    slotFormat(value) {
      // 默认格式为 { name: 'slot名称', text: '内容' }
      if (toType(value) === 'Object') {
        return { name: value.name || '', text: value.text || '', alias: value.alias || '' }
      }
      return { name: '', text: '', alias: '' }
    },
    getNativeEvents(item) {
      let inputNativeOn = item.inputNativeOn || []
      if (!Array.isArray(inputNativeOn)) {
        inputNativeOn = [inputNativeOn]
      }

      const evt = inputNativeOn.map(e => ({
        type: e.type,
        handler: this.emitEvents(`${e.emit ? e.emit : item.prop + 'Native' + this.initialCapitalization(e)}`)
      }))
      return evt
    },
    // 判断属于Input类型的
    isInput(type) {
      return '/text|hidden|textarea|file|password/g'.test(type)
      // return new RegExp('text|hidden|textarea|file|password', 'g').test(type)
    }
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
