<template>
  <div class="mul-container">
    <el-select ref="select"
               v-model="selectVal"
               :disabled="isDisabled"
                multiple
                collapse-tags
               placeholder="请选择"
               :popper-append-to-body="false"
               >
      <el-option
      :label="defaultProps.label"
      :value="defaultProps.id"
                 hidden></el-option>
      <!-- 树形控件 -->
      <el-tree ref="tree"
               :node-key="defaultProps.id"
               :data="categoriesSelect"
               :props="defaultProps"
               :expand-on-click-node="false"
               :check-on-click-node="true"
               :show-checkbox="showCheckbox"
               :default-checked-keys="defaultKeys"
               @check-change="handleCheckChange"
               @node-click="handleNodeClick">
        <span slot-scope="{data}"
              class="c-label"
              :title="data[defaultProps.label]">{{ data[defaultProps.label] }}</span>
      </el-tree>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'mul-select-tree',
  props: {
    categoriesSelect: {
      type: Array,
      default: () => []
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          id,
          label: 'key',
          children: 'children',
        }
      }
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    // 默认选中key
    defaultKeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectVal: [],
      getCheckedNodes: []
    }
  },
  watch: {
    selectVal(labels) {
      const syncKeys = this.getCheckedNodes.filter(e => labels.includes(e.key))
      const keys = syncKeys.map(e => e.id);
      this.$emit('updateKeys', keys)
    }
  },
  mounted() {
    this.$emit('setRef', this.$refs.tree)
    // 初始化
    this.$nextTick(() => {
      this.getCheckedNodes = this.$refs.tree.getCheckedNodes()
      this.selectVal = this.getCheckedNodes.map(e => e.key);
    })
  },
  methods: {
    // 树结构点击事件
    handleNodeClick(data) {
      this.$emit('handleNodeClick', data)
      this.$refs.select.blur()
    },

    // 选中回调
    handleCheckChange() {
      this.getCheckedNodes = this.$refs.tree.getCheckedNodes()
      this.selectVal = this.getCheckedNodes.map(e => e.key);
    },

    // 模糊查询
    // filterNode(value, data) {
    //   if (!value) return true
    //   const filterRes = data.name.indexOf(value) !== -1
    //   return filterRes
    // },

    getNode(data) {
      return this.$refs.tree.getNode(data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./style.scss"
</style>
