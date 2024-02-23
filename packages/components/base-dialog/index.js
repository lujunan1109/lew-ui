import BaseDialog from './index.vue';

BaseDialog.install = function (Vue) {
  Vue.component (BaseDialog.name, BaseDialog);
};

export default BaseDialog;
