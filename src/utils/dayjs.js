import Vue from 'vue'
import dayjs from 'dayjs'
// dayjs 默认语言是英文，现在配置为中文
import relativeTime from 'dayjs/plugin/relativeTime'
// 加载中文语言包
require('dayjs/locale/zh-cn')

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

// dayjs()获取当前最新的时间
// console.log(dayjs().format('YYYY-MM-DD'))
// console.log(dayjs().from(dayjs('2020')))

// 定义全局过滤器,相当于一个全局可用方法(仅供模板使用),参数1：过滤器名称，参数2：顾虑器函数 {{ 表达式 | 过滤器 }}
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
