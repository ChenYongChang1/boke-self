import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import vueParticles from "vue-particles";
Vue.use(vueParticles);

import { message,Modal,Menu } from "ant-design-vue";
// import "ant-design-vue/dist/antd.min.css";
import "ant-design-vue/lib/button/style/css";
import "ant-design-vue/lib/calendar/style/css";
import "ant-design-vue/lib/dropdown/style/css";
import "ant-design-vue/lib/input/style/css";
import "ant-design-vue/lib/icon/style/css";
import "ant-design-vue/lib/menu/style/css";
import "ant-design-vue/lib/modal/style/css";
import "ant-design-vue/lib/message/style/css";
// import 'ant-design-vue/lib/button/style';
// import 'ant-design-vue/lib/calendar/style';
// import 'ant-design-vue/lib/dropdown/style';
// import 'ant-design-vue/lib/input/style';
// import 'ant-design-vue/lib/icon/style';
// import 'ant-design-vue/lib/menu/style';


// Vue.use(Calendar);
// Vue.use(Dropdown);
Vue.use(Menu);
// Vue.use(Button);
// Vue.use(Input);
// Vue.use(Icon);
// Vue.use(Modal)

Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;

// import $message from 'ant-design-vue'
// import $confirm from 'ant-design-vue'
// Vue.use($message);
// Vue.use(message)
// Vue.use($confirm)

// console.log($message,'message');
// import { mavonEditor } from "mavon-editor";
// import "mavon-editor/dist/css/index.css";
// Vue.component('mavonEditor',mavonEditor)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
