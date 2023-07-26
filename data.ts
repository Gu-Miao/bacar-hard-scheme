export type Data = {
  x: number
  y: number
  monster?: 'boss' | 'watcher'
}

const data: Data[] = [
  // 邪龙区域
  {
    x: 0,
    y: 0,
  },
  {
    x: 1,
    y: 0,
  },
  // 九尾
  {
    x: 2,
    y: 0,
    monster: 'watcher',
  },
  {
    x: 0,
    y: 1,
  },
  {
    x: 1,
    y: 1,
  },
  {
    x: 0,
    y: 2,
  },
  // 邪龙
  {
    x: 2,
    y: 2,
    monster: 'boss',
  },
  {
    x: 0,
    y: 3,
  },

  // 中路
  {
    x: 0,
    y: 4,
  },
  {
    x: 1,
    y: 4,
  },
  {
    x: 2,
    y: 4,
  },
  {
    x: 3,
    y: 4,
  },
  // 魔龙
  {
    x: 4,
    y: 4,
    monster: 'watcher',
  },
  // 巴卡尔
  {
    x: 6,
    y: 4,
    monster: 'boss',
  },

  // 狂龙区域
  {
    x: 0,
    y: 5,
  },
  {
    x: 0,
    y: 6,
  },
  // 狂龙
  {
    x: 2,
    y: 6,
    monster: 'boss',
  },
  {
    x: 0,
    y: 7,
  },
  {
    x: 1,
    y: 7,
  },
  {
    x: 0,
    y: 8,
  },
  {
    x: 1,
    y: 8,
  },
  // 花女
  {
    x: 2,
    y: 8,
    monster: 'watcher',
  },

  // 上路
  {
    x: 4,
    y: 0,
  },
  {
    x: 5,
    y: 0,
  },
  {
    x: 6,
    y: 0,
  },
  {
    x: 7,
    y: 0,
  },

  // 上回廊
  {
    x: 7,
    y: 1,
  },
  {
    x: 4,
    y: 2,
  },
  {
    x: 5,
    y: 2,
  },
  {
    x: 6,
    y: 2,
  },
  {
    x: 7,
    y: 2,
  },
  {
    x: 8,
    y: 2,
  },

  // 下回廊
  {
    x: 4,
    y: 6,
  },
  {
    x: 5,
    y: 6,
  },
  {
    x: 6,
    y: 6,
  },
  {
    x: 7,
    y: 6,
  },
  {
    x: 8,
    y: 6,
  },
  {
    x: 7,
    y: 7,
  },

  // 下路
  {
    x: 4,
    y: 8,
  },
  {
    x: 5,
    y: 8,
  },
  {
    x: 6,
    y: 8,
  },
  {
    x: 7,
    y: 8,
  },

  // 冰龙区域
  {
    x: 9,
    y: 2,
  },
  {
    x: 10,
    y: 2,
  },
  {
    x: 11,
    y: 2,
  },
  // 冰女
  {
    x: 8,
    y: 4,
    monster: 'watcher',
  },
  // 冰龙
  {
    x: 9.5,
    y: 4,
    monster: 'boss',
  },
  {
    x: 11,
    y: 4,
  },
  {
    x: 9,
    y: 6,
  },
  {
    x: 10,
    y: 6,
  },
  {
    x: 11,
    y: 6,
  },
]

export default data
