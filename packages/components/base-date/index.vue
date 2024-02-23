<template>
  <el-date-picker v-model="upValue"
                  :type="type"
                  :popper-class="popperClass"
                  :editable="editable"
                  :prefix-icon="prefixIcon"
                  :value-format="valueFormat"
                  v-bind="$attrs"
                  :class="{ 'isSelect': isSelect }"
                  class="baseDate"
                  v-on="$listeners"
                  @blur="isSelect = false"
                  @focus="isSelect = true" />
</template>

<script>
import { getSet } from '../../assets/js'

export default {
  name: 'base-date',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Array, Date, Object],
      default: null
    },
    type: {
      type: String,
      default: 'datetime'
    },
    popperClass: {
      type: String,
      default: 'baseDate-popper'
    },
    editable: {
      type: Boolean,
      default: false
    },
    prefixIcon: {
      type: String,
      default: 'arrow'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    }
  },
  data() {
    return {
      isSelect: false
    }
  },
  computed: {
    upValue: getSet('value')
  },
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
