import Phaser from 'phaser'

let elevatorClosed

const sizes = {
	door: {
		width: 45,
		height: 122
	},
	background: {
		width: 95,
		height: 137,
	},
	doorBlink: {
		width: 45,
		height: 122,
	},
	doorJam: {
		width: 91,
		height: 5,
	},
	floorShadow: {
		width: 102,
		height: 46,
	},
	indicator: {
		width: 19,
		height: 6,
	}
}

function preload() {
	this.load.image('elevator-background', require('./assets/elevator-background.png'))
	this.load.image('elevator-blink', require('./assets/elevator-blink.png'))
	this.load.image('elevator-door', require('./assets/elevator-door.png'))
	this.load.image('elevator-door-jam', require('./assets/elevator-door-jam.png'))
	this.load.image('elevator-floor-shadow', require('./assets/elevator-floor-shadow.png'))
	this.load.image('elevator-indicator', require('./assets/elevator-indicator.png'))

}

function create() {
	const startingPoint = {
		x: 400,
		y: 500,
		shift: 8,
	}
	elevatorClosed = this.physics.add.staticGroup()

	elevatorClosed.create(startingPoint.x, startingPoint.y, 'elevator-background')
	elevatorClosed.create(startingPoint.x-sizes.door.width / 2, startingPoint.y + startingPoint.shift - 3, 'elevator-door')
	elevatorClosed.create(startingPoint.x-sizes.door.width / 2, startingPoint.y - startingPoint.shift - 3, 'elevator-blink')
	elevatorClosed.create(startingPoint.x-sizes.door.width / 2 + sizes.doorBlink.width / 2, startingPoint.y + startingPoint.shift + sizes.doorBlink.height / 4, 'elevator-blink')
	elevatorClosed.create(startingPoint.x + 1 +sizes.door.width / 2, startingPoint.y + startingPoint.shift - 3, 'elevator-door')
	elevatorClosed.create(startingPoint.x + 1 +sizes.door.width / 2, startingPoint.y - startingPoint.shift - 3, 'elevator-blink')
	elevatorClosed.create(startingPoint.x + 1 +sizes.door.width / 2 + sizes.doorBlink.width / 2, startingPoint.y + startingPoint.shift + sizes.doorBlink.height / 4, 'elevator-blink')
	elevatorClosed.create(startingPoint.x, startingPoint.y - sizes.background.height / 2 + sizes.doorJam.height + startingPoint.shift, 'elevator-door-jam')

	elevatorClosed.refresh()
}

function update() {

}

const config = {
	width: 800,
	height: 600,
	backgroundColor: 0xffffff,
	scene: {
		preload,
		create,
		update
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false
		}
	}
}

const game = new Phaser.Game(config)
