import myNavBar from '@/components/myNavBar.vue'
import moment from 'moment'

export default {
  install: function (Vue) {
    Vue.prototype.$coment = moment
    // 全局过滤器
    Vue.filter('getTime', function (times) {
      const _diff1 = moment()
      const _diff2 = moment(times)
      const times1 = _diff1.diff(_diff2, 'h')
      const days = _diff1.diff(_diff2, 'days')
      if (times1 < 1) {
        return '刚刚'
      } else if (times1 < 24) {
        return '一天内'
      } else {
        return days + '天前'
      }
    })
    Vue.component('myNavBar', myNavBar)
  }
}
