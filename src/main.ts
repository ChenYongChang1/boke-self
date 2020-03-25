import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import vueParticles from 'vue-particles'
Vue.use(vueParticles)


import 'ant-design-vue/dist/antd.css';
import { Calendar, Dropdown, Menu, Button  } from 'ant-design-vue'

Vue.use(Calendar);
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Button)


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
