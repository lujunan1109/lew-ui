import 'animate.css'
import './assets/style/common/reset.scss'

import BaseButton from 'UI/base-button'
import BaseSelect from 'UI/base-select'
import BaseDialog from 'UI/base-dialog'
import BaseInput from 'UI/base-input'
import BaseDate from 'UI/base-date'
import BaseVirtualRoll from './components/base-virtual-roll'
// import BaseTable from 'UI/base-table'
import DynamicForm from 'UI/dynamic-form'
import MulSelectTree from 'UI/mul-select-tree'



// 定义组件列表
const componentsList = [
  BaseButton,
  BaseSelect,
  BaseDialog,
  BaseInput,
  BaseDate,
  BaseVirtualRoll,
  DynamicForm,
  MulSelectTree
]

const install = function(Vue) {
  // 判断是否安装过
  if (install.installed) return

  // 注册所有组件
  componentsList.map((component) => {
    Vue.use(component)
  })
}

export default {
  install,
  BaseButton,
  BaseSelect,
  BaseDialog,
  BaseInput,
  BaseDate,
  // BaseTable,
  BaseVirtualRoll,
  DynamicForm,
  MulSelectTree
}
