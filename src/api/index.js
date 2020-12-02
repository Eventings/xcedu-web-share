import axios from '@/utils/axios'

// 测试环境需要在请求url前加前缀
const prefix = '/api-personalized'
// const prefix = ''

// 获取阿里云密钥
export function getOSSKey (params) {
  return axios.get('/api-base/attachments/settings', { params })
}
// 附件信息
export function loadDetailBatchByIds (params) {
  return axios.get('/api-base/attachments/infoList', { params })
}
