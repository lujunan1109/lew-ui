import BaseVirtualRoll from './index.vue';

BaseVirtualRoll.install = function (Vue) {
  Vue.component (BaseVirtualRoll.name, BaseVirtualRoll);
};

export default BaseVirtualRoll;
