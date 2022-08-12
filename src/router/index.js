import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
console.log('router');
const routes = [
  {
    path:'/',
    redirect:'/blogHome',
    meta:{
      path:'/bloghome'
    }
  },
  {
    path:'/blogHome',
    component:()=>import(/*webpackChunkName:"home"*/'../views/BlogHome/index.vue'),
    meta:{
      path:'/bloghome'
    }
  },
  {
    path:'/share',
    component:()=>import(/*webpackChunkName:"share"*/'../views/Share/index.vue'),
    meta:{
      path:'/share'
    }
  },
  {
    path:'/life',
    component:()=>import(/*webpackChunkName:"life"*/'../views/Life/index.vue'),
    meta:{
      path:'/life'
    }
  },
  {
    path:'/recommend',
    component:()=>import(/*webpackChunkName:"recommend"*/'../views/Recommend/index.vue'),
    meta:{
      path:'/recommend'
    }
  },
  {
    path:'/aboutme',
    component:()=>import(/*webpackChunkName:"aboutme"*/'../views/AboutMe/index.vue'),
    meta:{
      path:'/aboutme'
    }
  },
  {
    path:'/message',
    component:()=>import(/*webpackChunkName:"message"*/'../views/Message/index.vue'),
    meta:{
      path:'/message'
    }
  },
  {
    path:'/content/:id',
    component:()=>import(/*webpackChunkName:"content"*/'../views/Content/index.vue'),
    meta:{
      path:'/content'
    }
  },
  {
    path:'/search/:query',
    component:()=>import(/*webpackChunkName:"search"*/'../views/Search/index.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
