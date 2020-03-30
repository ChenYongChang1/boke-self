import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import vueParticles from "vue-particles";
Vue.use(vueParticles);

import { Button, Calendar, Dropdown, Input, Icon,Menu,  } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.use(Calendar);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Button);
Vue.use(Input);
Vue.use(Icon);

import $message from 'ant-design-vue'
Vue.use($message);

// console.log($message,'message');
// import { mavonEditor } from "mavon-editor";
// import "mavon-editor/dist/css/index.css";
// Vue.component('mavonEditor',mavonEditor)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
