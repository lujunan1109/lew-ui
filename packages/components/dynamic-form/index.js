import DynamicForm from './index.vue';

DynamicForm.install = function (Vue) {
  Vue.component (DynamicForm.name, DynamicForm);
};

export default DynamicForm;
