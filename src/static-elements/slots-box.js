import {Sprite, track} from 'kontra'

export const createSlotsBox = (context) => (x, y) => {

	const slotBoxItem = Sprite({
		x,
		y,
		width: 200,
		height: 95,
	})

	slotBoxItem.render = function() {
		context.fillStyle = 'rgba(237,161,5,0.13)'
		context.fillRect(this.x, this.y, this.width, this.height)

		context.strokeStyle = 'rgb(182,116,8)'
		context.lineWidth = 2
		context.strokeRect(this.x, this.y, this.width, this.height)

		context.beginPath()
		context.moveTo(this.x, this.y + this.height / 2)
		context.lineTo(this.x + this.width, this.y + this.height / 2)

		context.moveTo(this.x + 50, this.y)
		context.lineTo(this.x + 50, this.y + this.height)

		context.moveTo(this.x + 100, this.y)
		context.lineTo(this.x + 100, this.y + this.height)

		context.moveTo(this.x + 150, this.y)
		context.lineTo(this.x + 150, this.y + this.height)

		context.stroke()
	}


	track(slotBoxItem)

	return slotBoxItem
}