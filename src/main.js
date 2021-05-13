import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
//引入element-ui所提供样式
import ElementUI from 'element-ui';
// element-ui所提供的css样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
