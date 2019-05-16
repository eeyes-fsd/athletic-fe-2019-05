const games = [
  {
    'id': 1,
    'name': 'game1',
    'begin_at': '2019-05-19 10:00:00',
    'participants': 20,
    'groups': 5
  },
  {
    'id': 2,
    'name': 'game2',
    'begin_at': '2019-05-19 13:00:00',
    'participants': 20,
    'groups': 5
  }
]

const details = [
  {
    'group': 2,
    'no': 1940,
    'group_rank': 1,
    'name': 'AAA',
    'team': '西安交通大学',
    'performance': 3.03,
    'remarks': null
  },
  {
    'group': 2,
    'no': 1940,
    'group_rank': 1,
    'name': 'DDD',
    'team': '西安交通大学',
    'performance': 3.04,
    'remarks': null
  },
  {
    'group': 2,
    'no': 1941,
    'group_rank': 2,
    'name': 'BBB',
    'team': '西安交通大学',
    'performance': 3.05,
    'remarks': null
  },
  {
    'group': 2,
    'no': 1941,
    'group_rank': 2,
    'name': 'EEE',
    'team': '西安交通大学',
    'performance': 3.06,
    'remarks': null
  },
  {
    'group': 2,
    'no': 1939,
    'group_rank': 3,
    'name': 'CCC',
    'team': '西安交通大学',
    'performance': 3.07,
    'remarks': null
  },
  {
    'group': 2,
    'no': 1939,
    'group_rank': 3,
    'name': 'FFF',
    'team': '西安交通大学',
    'performance': 3.08,
    'remarks': null
  }
]

/**
 * 获取赛事列表
 * @param {Number} unit 单元序号，null表示未定义
 */
export async function getGameIndex(unit = null) {
  if (unit === null) {
    return games
  } else {
    return games.filter(game => game.id === unit)
  }
}

/**
 * 获取某个赛事详情
 * @param {Number} id 赛事ID
 * @param {Number} group 组别号
 */
export async function getGameDetails(id, group = null) {
  if (group === null) {
    return details
  } else {
    return details.filter(d => d.group === group)
  }
}
