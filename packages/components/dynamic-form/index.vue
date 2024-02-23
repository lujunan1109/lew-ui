<!--
 * @Author: lujunan
 * @Description: 动态表单组件
 * @LastEditTime: 2023-07-17 10:11:48
-->
<template>
  <div class="pub-form-diacom">
    <base-dialog v-bind="addTreeDialogProps"
                 :show.sync="addTreeDialogProps.upShow"
                 center
                 :top="mTop"
                 :title="title"
                  v-on="$listeners">
      <el-form ref="formData"
               :model="formData"
               :rules="formData.rules"
               :label-width="formData.labelWidth || defaultProps.labelWidth">
        <el-form-item v-for="(items, keys) in formData.renderAry"
                      v-show="items.type"
                      :key="keys"
                      :prop="items.prop"
                      :label="items.label"
                      :required="items.required">
          <div v-if="items.type === 'input'"
               class="f-pt-30">
            <el-input :disabled="items.disabled"
                        v-bind="items.otherAttrs"
                        :min="formData[items.min]"
                        :max="formData[items.max]"
                        :value.sync="formData[items.prop]"
                        :placeholder="items.placeholder"></el-input>
          </div>
          <div v-if="items.type === 'textarea'"
               class="f-pt-30">
            <el-input v-model="formData[items.prop]"
                      :placeholder="items.placeholder"
                      :disabled="!!items.disabled"
                      :type="items.type"
                      :rows="items.rows"></el-input>
          </div>
          <div v-else-if="items.type === 'select'"
               class="f-pt-30">
            <el-select :value.sync="formData[items.prop]"
                         :options="items.areaOptions"
                         :props="items.customProps"
                         :placeholder="items.slPlaceholder"></el-select>
          </div>
          <div v-else-if="items.type === 'info'"
               class="f-pt-30">
            <div v-if="items.InfoAry.length"
                 class="camera-canvas">
              <div v-for="(info, k) in items.InfoAry"
                   :key="k">
                <div class="camera-info">
                  <div class="camera-info-label">{{info.label}}:</div>
                  <div class="camera-info-value">{{info.value}}</div>
                </div>
              </div>
            </div>
            <div v-else
                 class="no-data">暂无数据</div>
          </div>
          <!-- 多级tree下拉框 -->
          <div v-else-if="items.type === 'mul'"
               class="f-pt-30">
            <mul-select-tree :select-val.sync="formData[items.prop]"
                            :categories-select="formData[items.treeData]"
                            :default-props="items.customProps"
                            :show-checkbox="items.showCheckbox"
                            :default-keys="items.defaultKeys"
                            v-on="$listeners" />
          </div>
          <div v-else-if="items.type === 'date'"
               class="f-pt-30">
            <el-date v-bind="items.dateProps"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期"
                       :value.sync="formData[items.prop]"
                       :default-time="items.defaultTime"></el-date>
          </div>
          <div v-else-if="items.type === 'other'"
               class="f-pt-30">
            <slot :name="items.prop"></slot>
          </div>
        </el-form-item>

        <div class="flex-layout f-center">
          <base-button @click="()=>$emit('addSubmit', $refs.formData)">确定</base-button>
           <base-button v-if="customFooteBtn"
                       @click="cancelDialog">取消</base-button>
          <slot name="special"></slot>
        </div>
      </el-form>
    </base-dialog>
  </div>
</template>

<script>
// 复合的新增编辑表单组件
import MulSelectTree from '../mul-select-tree'
export default {
  name: 'dynamic-form',
  components: {
    MulSelectTree
  },
  props: {
    title: {
      type: String,
      default: '标题',
      required: true
    },
    formData: {
      type: Object,
      default: () => { },
      required: true
    },
    addTreeDialogProps: {
      type: Object,
      default: () => { },
      required: true
    },
    customFooteBtn: {
      type: Boolean,
      default: true
    },
    // clear form
    resetFormState: {
      type: Boolean,
      default: true
    },
    mTop: {
      type: String,
      default: '80px'
    }
  },
  data() {
    return {
      defaultProps: {
        labelWidth: '100px'
      },
    }
  },
  watch: {
    'addTreeDialogProps.upShow': {
      handler(nd) {
        // 用户用户选择是否重置表单的内容
        if (!nd && this.resetFormState) {
          this.resetFields()
        }

        // 关闭回调
        if (!nd) {
          this.$emit('closePubDialog', false)
        }
      }
    }
  },
  methods: {
    resetFields() {
      this.$refs.formData.resetFields()
    },

    cancelDialog() {
      this.resetFields()
      this.addTreeDialogProps.upShow = false
      this.$nextTick(() => {
        this.$refs.formData.clearValidate()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./style.scss"
</style>
