import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import { getToken } from '@/utils/token.js'
import { auInfo } from '@/api/my.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/home/home.vue'),
    redirect: '/home/my',
    children: [
      {
        path: '/home/company',
        component: () => import('@/views/home/company/index.vue')
      },
      {
        path: '/home/question',
        component: () => import('@/views/home/question/index.vue'),
        meta: { needLogin: true }
      },
      {
        path: '/home/find',
        component: () => import('@/views/home/find/index.vue')
      },
      {
        path: '/home/my',
        component: () => import('@/views/home/my/index.vue'),
        meta: { needLogin: true }
      }
    ]
  },
  // 编辑用户信息
  {
    path: '/editUser',
    component: () => import('../views/home/my/editUser.vue'),
    meta: { needLogin: true }
  },
  // 面经分享
  {
    path: '/shareList',
    component: () => import('@/views/home/find/shareList.vue')
  },
  // 面经详情
  {
    path: '/shareInfo',
    component: () => import('@/views/home/find/shareInfo.vue')
  },
  // 面试技巧
  {
    path: '/technicList',
    component: () => import('@/views/home/find/technicList.vue')
  },
  // 市场数据
  {
    path: '/chart',
    component: () => import('@/views/home/find/chart.vue')
  },
  // 面试技巧详情
  {
    path: '/technicDetail',
    component: () => import('@/views/home/find/technicDetail.vue')
  },
  // 公司详情页面
  {
    path: '/companyInfo',
    component: () => import('@/views/home/company/companyInfo.vue')
  },
  // 刷题
  {
    path: '/brushTopic',
    component: () => import('@/views/home/question//brushTopic.vue')
  }
]

const router = new VueRouter({
  routes
})

// 前置导航守卫
router.beforeEach(async (to, from, next) => {
  window.cancelEvent('', true)
  const _top =
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    window.pageYOffset
  from.meta.scrollTop = _top
  if (to.meta.needLogin) {
    if (Store.state.isLogin) {
      next()
    } else {
      if (getToken()) {
        try {
          const res = await auInfo()
          Store.commit('setUserInfo', res.data)
          Store.commit('setLogin', true)
          next()
        } catch (err) {
          console.log(err)
        }
      } else {
        next('/login?redirect=' + to.fullPath)
      }
    }
  } else {
    if (getToken() && !Store.state.isLogin) {
      try {
        next()
        const res = await auInfo(true)
        Store.commit('setUserInfo', res.data)
        Store.commit('setLogin', true)
      } catch (err) {
        console.log(err)
      }
    } else {
      next()
    }
  }
  // next()
})

// 后置路由守卫
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})
// router.beforeEach(async (to, from, next) => {
//   if (to.meta.needLogin) {
//     if (Store.state.isLogin) {
//       next()
//     } else {
//       console.log(getToken())
//       if (getToken()) {
//         try {
//           const res = await auInfo()
//           Store.commit('setUserInfo', res.data)
//           Store.commit('setLogin', true)
//           next()
//         } catch (err) {
//           console.log(err)
//         }
//       } else {
//         next('/login?redirect=' + to.fullPath)
//       }
//     }
//   } else {
//     next()
//   }
// })

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
