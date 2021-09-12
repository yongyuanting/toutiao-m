/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store/index'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 接口的基准路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config 配置对象：本次请求的请求配置对象
  // console.log(config)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 这里一定要返回config对象，不然请求就停住了，不出去
  return config
}, function (error) {
  // 对请求错误做些什么（请求还没有发出去）
  return Promise.reject(error)
})
// 响应拦截器

export default request
