import {GameLoop, init, load, setImagePath, Sprite} from 'kontra'
import {backgroundElevatorSprite, elevator, images, imageSizes} from './assets/images'

let { canvas, context } = init()

const canvasSize =  {
	width: 800,
	height: 600,
}


const elevatorBackground = (x,y) => {

	const sprite  = Sprite({
		x,
		y,
		image: new Image(),
	})

	sprite.image.src = images.backgroundElevator;

	return sprite
}

const elevatorDoor = (x,y) => {
	return Sprite({
		x,
		y,
		image: new Image(),
	}).image.src = images.elevatorDoor;
}


const elevatorImage = (x, y) => [
	elevatorBackground(x, y),
	elevatorDoor(x / 2 - imageSizes.door.width / 2 + 1, y),
	elevatorDoor(x /2 + imageSizes.door.width / 2, y),
]




	const elevatorWithDoors = elevator(canvasSize.width / 2, canvasSize.height / 2)

	let loop = GameLoop({
		update() {
			elevatorWithDoors.map(sprite => {
				sprite.update()
				if (sprite.y > 0) {
					// sprite.y = sprite.y - 1
				}
			})
		},
		render() {
			elevatorWithDoors.map(sprite => sprite.render())
		}
	});

	loop.start();

