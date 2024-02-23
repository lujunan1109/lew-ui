import BaseDate from './index.vue';

BaseDate.install = function (Vue) {
  Vue.component (BaseDate.name, BaseDate);
};

export default BaseDate;
