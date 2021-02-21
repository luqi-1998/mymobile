import axios from 'axios'
import { Toast } from 'vant'
import { removeToken, getToken } from '@/utils/token.js'
import Store from '@/store'
import Router from '@/router'
// import { getToken } from '@/utils/token.js'
const _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL
})
var cancelArr = []
// 请求拦截器
window.cancelEvent = function (url, cancelAll) {
  cancelArr = cancelArr.filter((item, index) => {
    if (cancelAll) {
      item.fn()
      return false
    } else {
      if (item.url === url) {
        item.fn()
        return false
      } else {
        return true
      }
    }
  })
}
_fetch.interceptors.request.use(
  config => {
    window.cancelEvent(config.url, false)
    if (config.needToken) {
      config.headers.authorization = `Bearer ${getToken()}`
    }
    config.cancelToken = new axios.CancelToken(function (cancel) {
      cancelArr.push({
        fn: cancel,
        url: config.url
      })
    })
    // window.console.log(cancelArr)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
_fetch.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      // console.log(res)
      return res.data
    } else {
      // 如果token过期返回状态码为401或403
      if (res.data.code === 401 || res.data.code === 403) {
        // 提示用户token过期
        if (res.config.isError) {
          removeToken()
          return Promise.reject(new Error(res.data.message))
        }
        Toast.fail(res.data.message)
        // 清除token
        removeToken()
        // 修改vuex中的状态
        Store.commit('setLogin', false)
        // 跳转登录页面
        Router.push('/login?redirect=' + window.location.href.split('#')[1])
        // 终止then的调用
        return Promise.reject(new Error(res.data.message))
      } else {
        Toast.fail(res.data.message)
        return Promise.reject(new Error(res.data.message))
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)
export default _fetch
