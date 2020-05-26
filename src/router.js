import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('./page/discovery/index.vue')
const Cart = () => import('./views/cart/Cart.vue')
const PlaylistDetail = () => import('./page/playlist-detail')
const Songs = () => import('./page/songs')

Vue.use(Router)

const menuRoutes = [{
    path: '',
    redirect: '/discovery'
  },
  {
    path: '/discovery',
    component: Index,
    meta: {
      title: '发现音乐',
      icon: 'music',
    },
  },
  {
    path: '/songs',
    name: 'songs',
    component: Songs,
    meta: {
      title: '最新音乐',
      icon: 'yinyue',
    },
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
    {
      path: '/playlist/:id',
      name: 'playlist',
      component: PlaylistDetail,
    },

    ...menuRoutes,
  ],
})