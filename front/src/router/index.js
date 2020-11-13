import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../components/Form.vue'
import Table from '../components/Table.vue'
import Home from '../components/Home.vue'
import About from '../components/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'FormRegister',
    component: Form
  },
  {
    path: '/edit/:id',
    name: 'FormEdit',
    component: Form
  },
  {
    path: '/view',
    name: 'Table',
    component: Table
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
