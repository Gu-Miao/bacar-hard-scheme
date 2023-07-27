import data, { Data, Buff } from './data'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

let cellSize = 55
const horizontalCells = 11
const verticalCells = 8
const padding = cellSize * 0.25

const pointSize = cellSize * 0.1
const watcherSize = pointSize * 1.5
const bossSize = pointSize * 3

const buffs: Record<string, Buff> = {}

function getPosition(point: Data): [number, number] {
  return [point.x * cellSize + padding, point.y * cellSize + padding]
}

function getBuff(ableBuffs: Buff[]) {
  const i = Math.round(Math.random() * (ableBuffs.length - 1))
  return ableBuffs[i]
}

function drawBuff(point: Data, buff: Buff) {
  ctx.fillStyle = buff === '邪' ? '#27ae60' : buff === '冰' ? '#3498db' : '#e67e22'
  ctx.font = '24px Helvetica'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(buff, ...getPosition(point))
}

render()

/** Clean canvas */
function clean() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = horizontalCells * cellSize + padding * 2
  canvas.height = verticalCells * cellSize + padding * 2
}

function drawPoint(index: number, point: Data) {
  if (point.ableBuffs) {
    buffs[index] = getBuff(point.ableBuffs)
    drawBuff(point, buffs[index])
  } else {
    const [x, y] = getPosition(point)
    const radius = point.monster ? (point.monster === 'boss' ? bossSize : watcherSize) : pointSize
    ctx.moveTo(x, y)
    ctx.arc(x, y, radius, 0, Math.PI * 2)
  }
}

function drawLine(p1: Data, p2: Data) {
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
        drawLine(point, data[index])
      }
    }
  }

  ctx.fillStyle = 'black'
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}
