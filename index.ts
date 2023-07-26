import data, { Data } from './data'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

let cellSize = 50
const horizontalCells = 11
const verticalCells = 8
const padding = cellSize * 0.25

const pointSize = cellSize * 0.1
const watcherSize = pointSize * 1.5
const bossSize = pointSize * 3

render()

/** Clean canvas */
function clean() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = horizontalCells * cellSize + padding * 2
  canvas.height = verticalCells * cellSize + padding * 2
}

function drawPoint(point: Data) {
  const x = point.x * cellSize + padding
  const y = point.y * cellSize + padding
  const radius = point.monster ? (point.monster === 'boss' ? bossSize : watcherSize) : pointSize

  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()
}

/** Render function */
function render() {
  clean()

  for (let i = 0; i < data.length; i++) {
    const point = data[i]
    drawPoint(point)
  }
}
