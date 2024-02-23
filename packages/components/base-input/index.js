import BaseInput from './index.vue';

BaseInput.install = function (Vue) {
  Vue.component (BaseInput.name, BaseInput);
};

export default BaseInput;
