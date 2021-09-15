import request from '@/utils/request'

/**
 * 搜索相关请求模块
 */
export const getSearchSuggestion = (q) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: { q }
  })
}
