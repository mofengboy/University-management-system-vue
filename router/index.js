import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/Index'
import Panel from '@/Panel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'panel',
      component: Panel,
    },
    {
      path: '/login',
      name: 'Index',
      component: Index
    }
  ]
})
