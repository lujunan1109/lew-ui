<template>
  <el-dialog
             :visible.sync="upShow"
             :close-on-click-modal="agreenCloseModal"
             :modal-append-to-body="modalAppendToBody"
             append-to-body
             :width="width"
             :custom-class="mergeCustomClass"
             v-bind="$attrs"
             v-on="$listeners">
    <div slot="title"
         class="baseDialog__title">
      <i class="before" />
      <span :title="$attrs.title"
            class="title">{{ $attrs.title }}</span>
      <div v-if="subtitle.length > 0"
           ref="subtitle"
           class="subtitle">
        <span v-for="(item, index) in subtitle"
              ref="subtitleChild"
              :key="index"
              :class="{ 'active': index === subtitleActive }"
              @click="changeComponent(index)">
          <em>{{ formatSub(item) }}</em>
        </span>
      </div>
      <span v-if="$slots.titleRight"
            class="mr15">
        <slot name="titleRight"/>
      </span>
    </div>
    <slot />
    <slot slot="title"
          name="title" />
    <slot slot="footer"
          name="footer" />
  </el-dialog>
</template>

<script>
import { getSet } from '../../assets/js'
// import animate from 'animateplus'

export default {
  name: 'base-dialog',
  inheritAttrs: false, // 不符合props的attrs将不会添加在根元素上 https://cn.vuejs.org/v2/api/#inheritAttrs
  props: {
    show: {
      type: Boolean,
      default: false
    },
    modalAppendToBody: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '60%'
    },
    subtitle: { // 副标题切换列表
      type: Array,
      default: () => []
    },
    subtitleActive: { // 副标题命中的下标
      type: Number,
      default: 0
    },
    customClass: {
      type: String,
      default: ''
    },
    agreenCloseModal: { // 是否支持点击弹窗外关闭
      type: Boolean,
      default: false
    }
  },
  computed: {
    upShow: getSet('show'),
    upSubtitleActive: getSet('subtitleActive'),
    upSubtitle: getSet('subtitle'),
    mergeCustomClass() {
      return `baseDialog ${this.customClass}`
    }
  },
  methods: {
    formatSub(data) {
      if (typeof data === 'object') {
        return data.menuName
      }
      return data
    },
    formatOther(data) {
      if (!data) return {}
      return data.split(';').reduce((prev, cur) => ({ [cur.split('=')[0]]: cur.split('=')[1] }), {})
    },
    // 改变component Index
    changeComponent(index) {
      this.upSubtitleActive = index
      this.$emit('changeComponent', index)
      this.$nextTick(() => {
        this.handlerAnimationScroll(this.$refs.subtitle, this.$refs.subtitleChild, index)
      })
    },
    handlerAnimationScroll($container, $child, index) {
      const childWidth = $child[index].offsetWidth
      const childScrollLeft = $child[index].offsetLeft
      const containerWidth = $container.offsetWidth
      const containerScrollLeft = $container.scrollLeft
      const stepTotal = childScrollLeft - containerWidth / 2 + childWidth / 2
      let step = 0
      if (containerScrollLeft < stepTotal) {
        step = stepTotal - containerScrollLeft
      } else {
        step = containerScrollLeft - stepTotal
      }

      // animate({
      //   easing: 'out-quintic',
      //   duration: 800,
      //   change: progress => {
      //     return containerScrollLeft < stepTotal
      //       ? ($container.scrollLeft = containerScrollLeft + progress * step)
      //       : ($container.scrollLeft = containerScrollLeft - progress * step)
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
