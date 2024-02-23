import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';

import 'animate.css';
import 'normalize.css';
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Lib from '../packages/lew.js';

Vue.use (Lib)
Vue.use(element)

new Vue ({
  router,
  render: h => h (App),
}).$mount ('#app');
