import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'

const Index = () => import('./page/discovery/index.vue')
const Category = () => import('./views/category/Category.vue')
const Cart = () => import('./views/cart/Cart.vue')

Vue.use(Router)

const routes = [{
    path: '',
    redirect: '/discovery'
  },
  {
    path: '/discovery',
    component: Index
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router