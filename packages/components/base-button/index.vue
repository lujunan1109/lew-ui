<template>
  <div :class="`${customClass} ${loading ? 'loading' : ''} ${disabled && 'disabled'}`"
       class="base-button"
       v-on="!disabled && !loading && $listeners">
    <icon v-if="icon"
          :icon-class="icon" />
    <slot />
    <i v-if="loading"
       class="el-icon-loading loading" />
  </div>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    icon: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    customClass() {
      let customClass = ''
      switch (this.type) {
        case 'table':
          customClass = 'base-button-table'
          break
        case 'form':
          customClass = 'base-button-form'
          break
      }
      customClass += ` color-${this.color}`
      return customClass
    }
  }
}
</script>

<style lang="scss">
@import "./style.scss"
</style>
