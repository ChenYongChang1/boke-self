import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import vueParticles from "vue-particles";
Vue.use(vueParticles);

import { Button, Calendar, Dropdown, Input, Icon,Menu,  } from "ant-design-vue";
import "ant-design-vue/dist/antd.min.css";
// import 'ant-design-vue/lib/button/style';
// import 'ant-design-vue/lib/calendar/style';
// import 'ant-design-vue/lib/dropdown/style';
// import 'ant-design-vue/lib/input/style';
// import 'ant-design-vue/lib/icon/style';
// import 'ant-design-vue/lib/menu/style';


Vue.use(Calendar);
Vue.use(Dropdown);
Vue.use(Menu);
Vue.use(Button);
Vue.use(Input);
Vue.use(Icon);

import $message from 'ant-design-vue'
import $confirm from 'ant-design-vue'
Vue.use($message);
Vue.use($confirm)

// console.log($message,'message');
// import { mavonEditor } from "mavon-editor";
// import "mavon-editor/dist/css/index.css";
// Vue.component('mavonEditor',mavonEditor)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
