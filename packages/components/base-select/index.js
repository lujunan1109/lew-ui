import BaseSelect from './index.vue';

BaseSelect.install = function (Vue) {
  Vue.component (BaseSelect.name, BaseSelect);
};

export default BaseSelect;
