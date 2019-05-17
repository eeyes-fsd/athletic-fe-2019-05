import request from '@/util/request'

/**
 * 获取赛事列表
 * @param {Number} unit 单元序号，null表示未定义
 */
export function getGameIndex(unit = null) {
  return request({
    url: `/games`,
    method: 'get',
    params: {
      unit
    }
  })
}

/**
 * 获取某个赛事详情
 * @param {Number} id 赛事ID
 * @param {Number} group 组别号
 */
export function getGameDetails(id, group = null) {
  return request({
    url: `/games/${id}/`,
    method: 'get',
    params: {
      group
    }
  })
}

/**
 * 上传Excel表格
 * @param {Array<GameResource>} data Excel数组（处理后）
 */
export function uploadGameDetails(data) {
  return request({
    url: `/games`,
    method: 'post'
  })
}

/**
 * 登录
 * @param {String} password 密码
 */
export function login(password) {
  return request({
    url: `/verify`,
    method: 'get',
    headers: {
      password
    }
  })
}
