import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)


// 公共路由
const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/index')
  }
]

export default new Router({
  routes: constantRoutes
})


