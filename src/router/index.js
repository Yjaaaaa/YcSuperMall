import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('../views/home/Home.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Shopping = () => import('../views/shopping/Shopping.vue')
const Sort = () => import('../views/sort/Sort.vue')
const Detail = () => import('../views/detail/Detail.vue')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/Profile',
    component: Profile
  },
  {
    path: '/shopping',
    component: Shopping
  },
  {
    path: '/sort',
    component: Sort
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
