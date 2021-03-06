// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import Vuelidate from 'vuelidate'
import VueAnalytics from 'vue-analytics'


Vue.config.productionTip = false

Vue.use(Vuelidate)

Vue.use(VueAnalytics, {
  id: 'UA-180925094-1'
})

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
