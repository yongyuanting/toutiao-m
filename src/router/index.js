import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 自己配置的路由表
const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login')
}, {
  path: '/',
  name: 'layout',
  component: () => import('@/views/layout'),
  children: [{
    path: '', // 默认子路由
    name: 'home',
    component: () => import('@/views/home')
  }, {
    path: '/qa',
    name: 'qa',
    component: () => import('@/views/qa/index')
  }, {
    path: '/video',
    name: 'video',
    component: () => import('@/views/video/index')
  }, {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/mine/index')
  }]
}, {
  path: '/search',
  name: 'search',
  component: () => import('@/views/search/index')
}]

const router = new VueRouter({
  routes
})

export default router
