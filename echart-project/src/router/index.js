import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import echart from '@/views/echart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'echart',
      component: echart
    }
  ]
})
