import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const login = () => import('@/views/login/login');
const system = () => import('@/components/system');
const homePage = () => import('@/views/homePage/homePage');
const userManage = () => import('@/views/userManage/userManage');
let tableROUTER = [].concat(
  {
    path: '/system/homePage',
    name: 'homePage',
    component: homePage
  },
  {
    path: '/system/users',
    name: 'userManage',
    component: userManage,
    meta: {
      parent:'用户管理',
      title:'用户列表',
    }
  },
)

const routes = [
  {
    path: '/',
    redirect: {path: '/admin/login'}
  },
  {
    path: '/system',
    name: 'system',
    component: system,
    redirect:'/system/homePage',
    children: tableROUTER
  },
  {
    path: '/admin/login',
    name: 'login',
    component: login
  },
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
/**
 * to 将要访问的路径
 * from 从哪个路径跳转而来
 * next 放行 next('/login')强制跳转
 */
router.beforeEach((to,from,next) => {
  if (to.path === '/admin/login') return next();
  const execute_jurisdiction = window.sessionStorage.getItem('vueAxios');
  if (!execute_jurisdiction)  return next('/admin/login');
  next();
})
export default router
