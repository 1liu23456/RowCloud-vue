import Vue from 'vue'
import VueRouter from 'vue-router'
//引入Login组件
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import UserList from '@/components/admin/UserList'
import RightList from '@/components/admin/RightList'
import BaiduMap from '@/components/BaiduMap'

Vue.use(VueRouter)

const routes = [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path:"/login",
      component: Login
    },
    {
      path: "/home",
      component: Home,
      redirect: "/welcome",
      children: [
        {
          path: "/welcome",
          component: Welcome
        },
        /**
         * :router="true"  是否使用 vue-router 的模式，
          启用该模式会在激活导航时以 index 作为 path 进行路由跳转 
          可以根据此路径创建对应的 组件在admin里，点击二级按钮跳转哪，就写对应的组件
         */
        {
          path: "/user",
          component: UserList
        },
        {
          path: "/rights",
          component: RightList
        },
        {
          path: "/sport",
          component: BaiduMap
        }
      ]
    }
]


const router = new VueRouter({
  routes
})

/**
 * 出现问题的时候使用
 * 如果不加上，登陆时会报：
 * vue-router.esm.js?8c4f:2008 Uncaught (in promise) 
 * Error: Redirected when going from "/login" to "/home" via a navigation guard.
 * 意思是：错误:重定向时，从"/login"到"/home"通过导航保护。
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问
  //from 从哪儿访问
  //    next（）放行， next（'/URL'）强制跳转的路径
  if(to.path == '/login') return next();
  //获取user
  const userFlag = window.sessionStorage.getItem("user");//取出用户
  if(!userFlag) return next('/login'); //为空，返回登录页
  next();//符合要求放行
})

export default router
