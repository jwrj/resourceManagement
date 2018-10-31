import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './less/main.less'
import './less/basics.less'
import '../public/js/global.js'
import iviewArea from 'iview-area';


Vue.use(iviewArea);
Vue.use(iView);
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
