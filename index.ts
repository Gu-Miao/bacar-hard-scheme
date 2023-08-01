import data, { Data, Buff } from './data'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

let cellSize = 55
const horizontalCells = 11
const verticalCells = 8
const padding = cellSize * 0.4

const pointSize = cellSize * 0.1
const bossSize = pointSize * 3

const buffMap: Record<string, Buff> = {}

function getPosition(point: Data): [number, number] {
  return [point.x * cellSize + padding, point.y * cellSize + padding]
}

function getBuff(ableBuffs: Buff[]) {
  const i = Math.round(Math.random() * (ableBuffs.length - 1))
  return ableBuffs[i]
}

function drawBuff(point: Data, buff: Buff) {
  ctx.beginPath()
  renderPoint(point)
  ctx.fillStyle = buff === '邪' ? '#27ae60' : buff === '冰' ? '#3498db' : '#e67e22'
  ctx.fill()
  ctx.closePath()

  ctx.font = `${bossSize * 1.2}px Helvetica`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'white'
  ctx.fillText(buff, ...getPosition(point))
}

render()

/** Clean canvas */
function clean() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = horizontalCells * cellSize + padding * 2
  canvas.height = verticalCells * cellSize + padding * 2
}

function drawPoint(i: number, point: Data) {
  if (point.ableBuffs) {
    buffMap[i] = getBuff(point.ableBuffs)
    return
  }

  renderPoint(point)
}

function renderPoint(point: Data) {
  const [x, y] = getPosition(point)
  const radius = point.ableBuffs || point.monster ? bossSize : pointSize
  ctx.moveTo(x, y)
  ctx.arc(x, y, radius, 0, Math.PI * 2)
}

function renderLine(p1: Data, p2: Data) {
  ctx.moveTo(...getPosition(p1))
  ctx.lineTo(...getPosition(p2))
}

/** Render function */
function render() {
  clean()

  ctx.beginPath()
  for (let i = 0; i < data.length; i++) {
    const point = data[i]
    drawPoint(i, point)

    for (let j = 0; j < point.siblings.length; j++) {
      const index = point.siblings[j]
      if (index > i) {
        renderLine(point, data[index])
      }
    }
  }

  ctx.fillStyle = 'black'
  ctx.fill()
  ctx.stroke()
  ctx.closePath()

  const buffs = Object.keys(buffMap)
  for (let i = 0; i < buffs.length; i++) {
    const key = buffs[i]
    const point = data[key]
    drawBuff(point, buffMap[key])
  }

  // Best routes
  const watcherBuffMap: Record<Buff, Buff> = {
    邪: buffMap[2],
    狂: buffMap[21],
    冰: buffMap[45],
  }

  // 上下 buff 相同 2*2*2*3 共 24 种情况
  // 绿队先打精英，黄 3buff
  if (buffMap[22] === buffMap[38]) {
    render()
    return

    const redDragon = watcherBuffMap[buffMap[22]]
    const yellowDragon = buffMap[22]
    const eliteName = getEliteName(getRestBuff(redDragon, yellowDragon))

    console.log('===上下 buff 相同===')
    console.log(`绿队${eliteName}，中路开门，BOSS`)
    console.log(`红队开${yellowDragon}门，打${redDragon}龙`)
    console.log(`黄队贤龙，开${redDragon}门，打${yellowDragon}龙`)
    console.log('红黄等绿队打完精英再进门将')
    console.log('===上下 buff 相同===')
  }
  // 三个门将 BUFF 都不相同 2*3*2 共 12 种情况
  // 红绿上下随意，绿开门，然后打门将对应 buff 区域的精英，黄中路然后 3buff
  else if (
    buffMap[2] !== buffMap[21] &&
    buffMap[21] !== buffMap[45] &&
    buffMap[2] !== buffMap[45]
  ) {
    render()
    return
    const redWatcher = buffMap[22]
    const redDragon = watcherBuffMap[redWatcher]
    const greenWathcer = buffMap[38]
    const eliteName = getEliteName(watcherBuffMap[greenWathcer])
    const yellowWatcher = getRestBuff(redWatcher, greenWathcer)
    const yellowDragon = watcherBuffMap[yellowWatcher]

    console.log('===三门将 BUFF 均不同===')
    console.log(`红队上路，开${redWatcher}门，打${redDragon}龙`)
    console.log(`绿队下路，开${greenWathcer}门，${eliteName}，巴卡尔`)
    console.log(`黄队中路开门，贤龙，开${yellowWatcher}门，打${yellowDragon}龙`)
    console.log('===三门将 BUFF 均不同===')
  }
  // 天选开局 3*2*2 共 12 种情况
  // 红黄互开，绿队中路然后 3buff 精英
  else if (
    watcherBuffMap[buffMap[22]] === buffMap[38] &&
    watcherBuffMap[buffMap[38]] === buffMap[22]
  ) {
    render()
    return
    const eliteName = getEliteName(getRestBuff(buffMap[22], buffMap[38]))

    console.log('===天选开局===')
    console.log(`绿队中路开门，贤龙，${eliteName}，巴卡尔`)
    console.log(`红黄${buffMap[22]}${buffMap[38]}互开`)
    console.log('===天选开局===')
  }
  // 311 3*2 共 6 种情况
  // 红走 3，绿穿 2
  else if (is311()) {
  } else {
    render()
    return
  }
}

function is311() {
  const buffs = Object.values(buffMap)
  const map = {
    邪: 0,
    狂: 0,
    冰: 0,
  }

  for (let i = 0; i < buffs.length; i++) {
    const buff = buffs[i]
    map[buff]++
    if (map[buff] === 3) {
      return true
    }
  }

  return false
}

function getRestBuff(...buffs: Buff[]) {
  const arr: Buff[] = ['邪', '狂', '冰']
  for (let i = 0; i < buffs.length; i++) {
    const index = arr.findIndex(buff => buff === buffs[i])
    arr.splice(index, 1)
  }

  return arr[0]
}

function getEliteName(buff: Buff) {
  return buff === '邪' ? '斯万' : buff === '狂' ? '埃克莱尔' : '司特茨'
}
