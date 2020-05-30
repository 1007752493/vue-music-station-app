import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import('./page/discovery/index.vue')
const PlaylistDetail = () => import('./page/playlist-detail')
const Songs = () => import('./page/songs')

const Mvs = () => import('./page/mvs')
const Mv = () => import('./page/mv')
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
    path: '/mvs',
    name: 'mvs',
    component: Mvs,
    meta: {
      title: '最新MV',
      icon: 'mv',
    },
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
    {
      path: '/mv/:id',
      name: 'mv',
      component: Mv,
      props: (route) => ({
        id: +route.params.id
      }),
    },

    ...menuRoutes,
  ],
})