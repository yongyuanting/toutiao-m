import request from '@/utils/request'

// 获取文章列表数据
export const getArticlesList = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: params
  })
}
