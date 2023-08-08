export type Buff = '邪' | '冰' | '狂'

export type Data = {
  x: number
  y: number
  monster?: 'boss' | 'watcher'
  siblings: number[]
  ableBuffs?: Buff[]
}

const data: Data[] = [
  // 邪龙区域
  {
    x: 0,
    y: 0,
    siblings: [1, 3],
  },
  {
    x: 1,
    y: 0,
    siblings: [0, 2, 4],
  },
  // 九尾
  {
    x: 2,
    y: 0,
    monster: 'watcher',
    siblings: [1, 6, 22, 27],
    ableBuffs: ['冰', '狂'],
  },
  {
    x: 0,
    y: 1,
    siblings: [0, 4, 5],
  },
  {
    x: 1,
    y: 1,
    siblings: [1, 3],
  },
  {
    x: 0,
    y: 2,
    siblings: [3, 7],
  },
  // 邪龙
  {
    x: 2,
    y: 2,
    monster: 'boss',
    siblings: [2, 7, 27],
  },
  {
    x: 0,
    y: 3,
    siblings: [5, 9],
  },

  // 中路
  {
    x: 0,
    y: 4,
    siblings: [9],
  },
  {
    x: 1,
    y: 4,
    siblings: [7, 8, 10, 14],
  },
  {
    x: 2,
    y: 4,
    siblings: [9, 11],
  },
  {
    x: 3,
    y: 4,
    siblings: [10, 12, 27, 32],
  },
  // 魔龙
  {
    x: 4,
    y: 4,
    monster: 'watcher',
    siblings: [11, 13, 28, 33],
  },
  // 巴卡尔
  {
    x: 6,
    y: 4,
    monster: 'boss',
    siblings: [12],
  },

  // 狂龙区域
  {
    x: 0,
    y: 5,
    siblings: [9, 15, 16],
  },
  {
    x: 0,
    y: 6,
    siblings: [14, 17],
  },
  // 狂龙
  {
    x: 2,
    y: 6,
    monster: 'boss',
    siblings: [14, 21, 32],
  },
  {
    x: 0,
    y: 7,
    siblings: [15, 18, 19],
  },
  {
    x: 1,
    y: 7,
    siblings: [17, 20],
  },
  {
    x: 0,
    y: 8,
    siblings: [17, 20],
  },
  {
    x: 1,
    y: 8,
    siblings: [18, 19, 21],
  },
  // 花女
  {
    x: 2,
    y: 8,
    monster: 'watcher',
    siblings: [16, 20, 32, 38],
    ableBuffs: ['邪', '冰'],
  },

  // 上路
  // 上路偷家
  {
    x: 4,
    y: 0,
    siblings: [2, 23],
    ableBuffs: ['邪', '冰', '狂'],
  },
  {
    x: 5,
    y: 0,
    siblings: [22, 24, 28],
  },
  {
    x: 6,
    y: 0,
    siblings: [23, 25],
  },
  {
    x: 7,
    y: 0,
    siblings: [24, 26],
  },

  // 上回廊
  {
    x: 7,
    y: 1,
    siblings: [25, 30],
  },
  {
    x: 4,
    y: 2,
    siblings: [2, 11, 28],
  },
  {
    x: 5,
    y: 2,
    siblings: [12, 23, 27, 29],
  },
  {
    x: 6,
    y: 2,
    siblings: [28, 30],
  },
  {
    x: 7,
    y: 2,
    siblings: [26, 29, 31],
  },
  {
    x: 8,
    y: 2,
    siblings: [30, 42, 45],
  },

  // 下回廊
  {
    x: 4,
    y: 6,
    siblings: [11, 16, 21, 33],
  },
  {
    x: 5,
    y: 6,
    siblings: [12, 32, 34, 39],
  },
  {
    x: 6,
    y: 6,
    siblings: [33, 35],
  },
  {
    x: 7,
    y: 6,
    siblings: [34, 36, 37],
  },
  {
    x: 8,
    y: 6,
    siblings: [35, 45, 48],
  },
  {
    x: 7,
    y: 7,
    siblings: [35, 41],
  },

  // 下路
  // 下路偷家
  {
    x: 4,
    y: 8,
    siblings: [21, 39],
    ableBuffs: ['邪', '冰', '狂'],
  },
  {
    x: 5,
    y: 8,
    siblings: [33, 38, 40],
  },
  {
    x: 6,
    y: 8,
    siblings: [39, 41],
  },
  {
    x: 7,
    y: 8,
    siblings: [37, 40],
  },

  // 冰龙区域
  {
    x: 9,
    y: 2,
    siblings: [31, 43],
  },
  {
    x: 10,
    y: 2,
    siblings: [42, 44],
  },
  {
    x: 11,
    y: 2,
    siblings: [43, 47],
  },
  // 冰女
  {
    x: 8,
    y: 4,
    monster: 'watcher',
    siblings: [31, 36, 46],
    ableBuffs: ['邪', '狂'],
  },
  // 冰龙
  {
    x: 9.5,
    y: 4,
    monster: 'boss',
    siblings: [45, 47],
  },
  {
    x: 11,
    y: 4,
    siblings: [44, 46, 50],
  },
  {
    x: 9,
    y: 6,
    siblings: [36, 49],
  },
  {
    x: 10,
    y: 6,
    siblings: [48, 50],
  },
  {
    x: 11,
    y: 6,
    siblings: [47, 49],
  },
]

export default data
