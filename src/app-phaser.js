import Phaser from 'phaser'

import {imageSizes, images} from './assets/images'

let elevatorClosed

function preload() {
	this.textures.addBase64('elevator-blink', images.doorBlink)
	this.textures.addBase64('elevator-door-jam', images.doorJam)
	this.textures.addBase64('elevator-floor-shadow', images.floorShadow)
	this.textures.addBase64('elevator-indicator', images.indicator)
}

function create() {
	const startingPoint = {
		x: 400,
		y: 500,
		shift: 8,
	}
	elevatorClosed = this.physics.add.staticGroup()

	elevatorClosed.create(startingPoint.x, startingPoint.y, 'elevator-background')
	elevatorClosed.create(startingPoint.x-imageSizes.door.width / 2, startingPoint.y + startingPoint.shift - 3, 'elevator-door')
	elevatorClosed.create(startingPoint.x-imageSizes.door.width / 2, startingPoint.y - startingPoint.shift - 3, 'elevator-blink')
	elevatorClosed.create(startingPoint.x-imageSizes.door.width / 2 + imageSizes.doorBlink.width / 2, startingPoint.y + startingPoint.shift + imageSizes.doorBlink.height / 4, 'elevator-blink')
	elevatorClosed.create(startingPoint.x + 1 +imageSizes.door.width / 2, startingPoint.y + startingPoint.shift - 3, 'elevator-door')
	elevatorClosed.create(startingPoint.x + 1 +imageSizes.door.width / 2, startingPoint.y - startingPoint.shift - 3, 'elevator-blink')
	elevatorClosed.create(startingPoint.x + 1 +imageSizes.door.width / 2 + imageSizes.doorBlink.width / 2, startingPoint.y + startingPoint.shift + imageSizes.doorBlink.height / 4, 'elevator-blink')
	elevatorClosed.create(startingPoint.x, startingPoint.y - imageSizes.background.height / 2 + imageSizes.doorJam.height + startingPoint.shift, 'elevator-door-jam')

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
