import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('./page/discovery/index.vue')
const Category = () => import('./views/category/Category.vue')
const Cart = () => import('./views/cart/Cart.vue')

Vue.use(Router)

const menuRoutes = [{
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

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/discovery',
    },

    ...menuRoutes,
  ],
})