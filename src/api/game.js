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
 * 删除某场赛事下所有信息
 * @param {Number} gameId 所属的赛事赛事ID
 */
export function clearGameDetails(gameId) {
  return request({
    url: `/games/${gameId}`,
    method: 'delete'
  })
}

/**
 * 上传Excel表格
 * @param {Number} gameId 所属的赛事赛事ID
 * @param {Array<GameResource>} data Excel数组（处理后）
 */
export function uploadGameDetails(gameId, data) {
  return request({
    url: `/games/${gameId}`,
    method: 'put',
    data
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
