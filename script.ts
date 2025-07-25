const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d")!

class Vector2 {
	x: number
	y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}
}

let camPos = new Vector2(0, 0)
let angle = -Math.PI / 4
setInterval(() => {
	// Points
	let pivot = new Vector2(camPos.x + 384, camPos.y + 256)
	let target = new Vector2(pivot.x + Math.sin(angle) * 160, pivot.y + Math.cos(angle) * 160)
	let left = new Vector2(Math.sin(angle - Math.PI / 2), Math.cos(angle - Math.PI / 2))

	// Background
	ctx.lineWidth = 0
	ctx.fillStyle = "black"
	ctx.strokeStyle = "white"
	ctx.fillRect(0, 0, 512, 512)

	// Pivot to hinge
	ctx.fillStyle = "white"
	ctx.beginPath()
	ctx.moveTo(pivot.x + left.x * 48, pivot.y + left.y * 48)
	ctx.lineTo(pivot.x - left.x * 48, pivot.y - left.y * 48)
	ctx.lineTo(target.x - left.x * 40, target.y - left.y * 40)
	ctx.lineTo(target.x + left.x * 40, target.y + left.y * 40)
	ctx.lineTo(pivot.x + left.x * 48, pivot.y + left.y * 48)
	ctx.fill()

	// Pivot
	ctx.beginPath()
	ctx.arc(pivot.x, pivot.y, 64, 0, 2 * Math.PI)
	ctx.fill()

	ctx.fillStyle = "black"
	ctx.beginPath()
	ctx.arc(pivot.x, pivot.y, 48, 0, 2 * Math.PI)
	ctx.fill()

	ctx.fillStyle = "white"
	ctx.beginPath()
	ctx.arc(pivot.x, pivot.y, 40, 0, 2 * Math.PI)
	ctx.fill()

	// Chroma key
	const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
	const data = frame.data
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i]
		const g = data[i + 1]
		const b = data[i + 2]

		if (r < 100 && g < 100 && b < 100) {
			data[i + 3] = 0
		}
	}
	ctx.putImageData(frame, 0, 0)

	angle += Math.PI / 30
}, 1 / 60)
