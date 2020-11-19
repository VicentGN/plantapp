import Vue from 'vue'
import App from './App.vue'

// Importanto Vue Material
import { MdButton, MdCard, MdField, MdProgress, MdSnackbar, MdTable, MdContent, MdIcon, MdDialog, MdTabs, MdDialogConfirm } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdProgress)
Vue.use(MdSnackbar)
Vue.use(MdTable)
Vue.use(MdContent)
Vue.use(MdIcon)
Vue.use(MdDialog)
Vue.use(MdTabs)
Vue.use(MdDialogConfirm)

import router from './router'

Vue.config.productionTip = false

const options = {
  router,
  render: function(createElement) {
    return createElement(App);
  }
}

const app = new Vue(options)
app.$mount('#app');


