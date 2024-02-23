<template>
  <el-select v-model="upValue"
             :popper-class="popperClass"
             :popper-append-to-body="false"
             v-bind="$attrs"
             v-on="$listeners">
    <el-option v-for="item in options"
               :key="item[props.value]"
               :label="item[props.label]"
               :value="item[props.value]" />
  </el-select>
</template>

<script>
import { getSet } from '../../assets/js'
export default {
  name: 'base-select',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Array],
      default: null
    },
    options: {
      type: Array,
      default: () => ([])
    },
    popperClass: {
      type: String,
      default: 'baseSelect-popper'
    },
    props: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value'
      })
    }
  },
  computed: {
    upValue: getSet('value')
  }
}
</script>

<style lang="scss">
@import "../../assets/style/common/common.scss";
@import "./style.scss";
</style>
