import Vue from 'vue'
import App from './App.vue'
// import Vuetify
import Vuetify from 'vuetify'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import Vuetify css
import 'vuetify/dist/vuetify.min.css'
// import css
import '@/assets/style.css'
// import icon components
import { icons } from '@/plugins/vuetify'
// import filters
import dateFilter from '@/helpers/date'
import currencyFilter from '@/helpers/currency'

Vue.config.productionTip = false
//
Vue.use(Vuetify, {
  icons
})
// use filter
Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyFilter', currencyFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

store.dispatch('loadData')
