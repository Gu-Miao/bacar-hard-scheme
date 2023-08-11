import data, { Data, Buff } from './data'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
const route = document.getElementById('route') as HTMLDivElement
const refresh = document.querySelector('button') as HTMLButtonElement

const maxCellSize = 52
let cellSize = maxCellSize
const horizontalCells = 11
const verticalCells = 8

let padding: number
let pointSize: number
let bossSize: number

const buffMap: Record<string, Buff> = {}

handleResize()

window.addEventListener('resize', handleResize)
refresh.addEventListener('click', handleResize)

function handleResize() {
  cellSize = Math.min(maxCellSize, Math.floor(document.documentElement.clientWidth / 14.2))

  getComputed()

  route.style.width = `${cellSize * 11 + padding * 2}px`

  render()
}

function getComputed() {
  padding = cellSize * 0.8
  pointSize = cellSize * 0.1
  bossSize = pointSize * 3
}

/** Clean canvas */
function clean() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = horizontalCells * cellSize + padding * 2
  canvas.height = verticalCells * cellSize + padding * 2
}

/**
 * Draw point
 *
 * @param i Index
 * @param point Point data
 */
function drawPoint(i: number, point: Data) {
  if (point.ableBuffs) {
    buffMap[i] = getBuff(point.ableBuffs)
    return
  }

  renderPoint(point)
}

/**
 * Render point on canvas
 *
 * @param point Point data
 */
function renderPoint(point: Data) {
  const [x, y] = getPosition(point)
  const radius = point.ableBuffs || point.monster ? bossSize : pointSize
  ctx.moveTo(x, y)
  ctx.arc(x, y, radius, 0, Math.PI * 2)
}

/**
 * Render line on canvas
 *
 * @param p1 Point 1 data
 * @param p2 Point 2 data
 */
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

  // 上下 buff 相同
  // 上下路 buff -- 3，每个门将各自的 buff -- 2*2*2，共 24 种情况
  // 绿队先打精英，黄 3buff
  if (buffMap[22] === buffMap[38]) {
    const redRoute = buffMap[38] === '狂' ? '下' : '上'
    const yellowRoute = redRoute === '上' ? '下' : '上'
    const redDragon = watcherBuffMap[buffMap[22]]
    const yellowDragon = watcherBuffMap[redDragon]
    const eliteName = getEliteName(getRestBuff(redDragon, yellowDragon))

    route.innerHTML = `=== 上下 buff 相同 ===<br/>
【思路】绿先打精英，红黄上下待机，全场只有 2 种 buff，绿队去打剩下 buff 区域的<br/>精英，有 3 种，绿队去长脚怪 buff 区域的精英<br/>
绿队${eliteName}，中路开门，BOSS<br/>
红队${redRoute}路，开${yellowDragon}门，打${redDragon}龙<br/>
黄队${yellowRoute}路，贤龙，开${redDragon}门，打${yellowDragon}龙<br/>
红黄等绿队打完精英再进门将`
  }
  // 天选开局
  // 邪狂/邪冰/狂冰 3 种情况，上下路 buff 位置 2 种，另一个门将的 buff 2种，共 12 种
  // 红黄互开，绿队中路然后 3buff 精英
  else if (
    watcherBuffMap[buffMap[22]] === buffMap[38] &&
    watcherBuffMap[buffMap[38]] === buffMap[22]
  ) {
    const eliteName = getEliteName(getRestBuff(buffMap[22], buffMap[38]))

    route.innerHTML = `=== 天选开局 ===<br/>
【思路】红黄互开，绿队先开中路再 3buff<br/>
绿队中路开门，贤龙，${eliteName}，巴卡尔<br/>
红黄${buffMap[22]}${buffMap[38]}互开`
  }
  // 三个门将 BUFF 都不相同
  // 三个门将 buff 组合（狂冰邪/冰邪狂）2 种，上下路 buff 不同 2*3 有 6 种，共 12 种
  // 红绿上下随意，绿开门，然后打门将对应 buff 区域的精英，黄中路然后 3buff
  else if (
    buffMap[2] !== buffMap[21] &&
    buffMap[21] !== buffMap[45] &&
    buffMap[2] !== buffMap[45]
  ) {
    const redWatcher = buffMap[22]
    const redDragon = watcherBuffMap[redWatcher]
    const greenWathcer = buffMap[38]
    const eliteName = getEliteName(watcherBuffMap[greenWathcer])
    const yellowWatcher = getRestBuff(redWatcher, greenWathcer)
    const yellowDragon = watcherBuffMap[yellowWatcher]

    route.innerHTML = `=== 三门将 BUFF 均不同 ===<br/>
【思路】红绿随意上下，黄队开门 3buff<br/>
红队上路，开${redWatcher}门，打${redDragon}龙<br/>
绿队下路，开${greenWathcer}门，${eliteName}，巴卡尔<br/>
黄队中路开门，贤龙，开${yellowWatcher}门，打${yellowDragon}龙`
  }
  // 311
  // 相同 buff 的门将的位置组合（位置确定，门将 buff 确定）3 种，另一个有相同 buff 的长脚
  // 的位置 -- 2 种，剩余一个长脚和门将的 buff 组合（从剩下的 buff 选）2 种，共 12 种
  // 红走 3，绿穿 2
  else if (is311()) {
    const redWatcher = get3From311()
    const redRoute = getRoute(redWatcher)
    const redDragon = watcherBuffMap[redWatcher]
    const greenWathcer = getRestBuff(redWatcher, redDragon)
    const greenRoute = getRoute(greenWathcer)
    const eliteName = getEliteName(greenWathcer)
    const yellowWatcher = redDragon
    const yellowDragon = getRestBuff(redDragon, greenWathcer)

    route.innerHTML = `=== 311 ===<br/>
【思路】红走 3，绿穿 2，黄中路 3buff<br/>
红队${redRoute}路，开${redWatcher}门，打${redDragon}龙<br/>
绿队${greenRoute}路，开${greenWathcer}门，${eliteName}，巴卡尔<br/>
黄队中路开门，贤龙，开${yellowWatcher}门，打${yellowDragon}龙`
  }
  // 221
  // 第一种相同 buff 的门将位置（确定位置，确定 buff）3 种，剩余一个门将和长脚的位置（门将位
  // 置确定，只看长脚上下）2种，后面 21 的 buff 组合 -- 2 种，共 12 种
  // 红走 2，绿穿 2
  else {
    const redWatcher = get2From221()
    const redRoute = getRoute(redWatcher)
    const redDragon = watcherBuffMap[redWatcher]
    const greenWathcer = getRestBuff(redWatcher, redDragon)
    const greenRoute = getRoute(greenWathcer)
    const eliteName = getEliteName(greenWathcer)
    const yellowWatcher = redDragon
    const yellowDragon = getRestBuff(redDragon, greenWathcer)

    route.innerHTML = `=== 221 ===<br/>
【思路】红走 2，绿穿 2，黄中路 3buff<br/>
红队${redRoute}路，开${redWatcher}门，打${redDragon}龙<br/>
绿队${greenRoute}路，开${greenWathcer}门，${eliteName}，巴卡尔<br/>
黄队中路开门，贤龙，开${yellowWatcher}门，打${yellowDragon}龙`
  }
}

/**
 * Get pixel position of point
 *
 * @param point Point data
 * @returns A tuple of pixel position on canvas
 */
function getPosition(point: Data): [number, number] {
  return [point.x * cellSize + padding, point.y * cellSize + padding]
}

/**
 * Get a random buff
 *
 * @param ableBuffs Possible Buffs
 * @returns A random buff
 */
function getBuff(ableBuffs: Buff[]): Buff {
  const i = Math.round(Math.random() * (ableBuffs.length - 1))
  return ableBuffs[i]
}

/**
 * Draw buff point
 *
 * @param point Point data
 * @param buff Buff of the point
 */
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

/**
 * Get buff of '2' for the special situation 211
 *
 * @returns buff of '2'
 */
function get2From221(): Buff {
  const buffs = Object.values(buffMap)
  let count = 0

  for (let i = 0; i < buffs.length; i++) {
    const buff = buffs[i]
    if (buff === buffMap[22]) {
      count++
      if (count === 2) {
        return buffMap[22]
      }
    }
  }

  return buffMap[38]
}

/**
 * Get route
 *
 * @param buff Buff
 * @returns Route
 */
function getRoute(buff: Buff) {
  return buff === buffMap[22] ? '上' : '下'
}

/**
 * Confirm if it is a special situation 311
 *
 * @returns Ture or false
 */
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

/**
 * Get buff of '3' for special situation 311
 *
 * @returns Buff
 */
//@ts-ignore
function get3From311(): Buff {
  const buffs = Object.values(buffMap)
  const map = {
    邪: 0,
    狂: 0,
    冰: 0,
  }

  for (let i = 0; i < 4; i++) {
    const buff = buffs[i]
    map[buff]++
    if (map[buff] === 2) {
      return buff
    }
  }
}

/**
 * Get the rest buff
 *
 * @param buffs Array of buffs
 * @returns The rest buff
 */
function getRestBuff(...buffs: Buff[]): Buff {
  const arr: Buff[] = ['邪', '狂', '冰']
  for (let i = 0; i < buffs.length; i++) {
    const index = arr.findIndex(buff => buff === buffs[i])
    arr.splice(index, 1)
  }

  return arr[0]
}

/**
 * Get name of elite according to buff
 *
 * @param buff Buff
 * @returns Elite name
 */
function getEliteName(buff: Buff) {
  return buff === '邪' ? '斯万' : buff === '狂' ? '埃克莱尔' : '司特茨'
}
