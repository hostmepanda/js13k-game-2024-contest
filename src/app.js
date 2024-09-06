import {GameLoop, init, load, setImagePath, Sprite} from 'kontra'
import {
	createStaticBackground,
	elevator,
} from './assets/images'

let { canvas, context } = init()

const canvasSize =  {
	width: 800,
	height: 600,
}

function launchRound() {
	const background = createStaticBackground(canvasSize)
	const firstElevatorCoordinates = {
		x: canvasSize.width / 8 * 2,
		y: canvasSize.height / 2,
	}

	const secondElevatorCoordinates = {
		x: canvasSize.width / 8 * 3.5,
		y: canvasSize.height / 2,
	}

	const thirdElevatorCoordinates = {
		x: canvasSize.width / 8 * 5,
		y: canvasSize.height / 2,
	}

	const leftElevatorWithDoors = elevator(firstElevatorCoordinates.x, firstElevatorCoordinates.y)
	const middleElevatorWithDoors = elevator(secondElevatorCoordinates.x, secondElevatorCoordinates.y)
	const rightElevatorWithDoors = elevator(thirdElevatorCoordinates.x, thirdElevatorCoordinates.y)

	let loop = GameLoop({
		update() {
			leftElevatorWithDoors.update()
			middleElevatorWithDoors.update()
			rightElevatorWithDoors.update()

		},
		render() {
			background.render()
			leftElevatorWithDoors.render()
			middleElevatorWithDoors.render()
			rightElevatorWithDoors.render()
		}
	});

	loop.start();
}

launchRound()