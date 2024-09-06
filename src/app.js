import {GameLoop, init, load, setImagePath, Sprite} from 'kontra'
import {
	createStaticBackground,
	elevator, stairCaseDoor, wallText,
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
		y: canvasSize.height / 2 - 20,
	}

	const secondElevatorCoordinates = {
		x: canvasSize.width / 8 * 3.5,
		y: canvasSize.height / 2 - 20,
	}

	const thirdElevatorCoordinates = {
		x: canvasSize.width / 8 * 5,
		y: canvasSize.height / 2 - 20,
	}

	const leftStairCaseDoor = stairCaseDoor(canvasSize.width / 15 , canvasSize.height / 2 - 20)
	const rightStairCaseDoor = stairCaseDoor(canvasSize.width / 8 * 6.5, canvasSize.height / 2 - 20)

	const leftElevatorWithDoors = elevator(firstElevatorCoordinates.x, firstElevatorCoordinates.y)
	const middleElevatorWithDoors = elevator(secondElevatorCoordinates.x, secondElevatorCoordinates.y)
	const rightElevatorWithDoors = elevator(thirdElevatorCoordinates.x, thirdElevatorCoordinates.y)
	const floorNumber = wallText(canvasSize.width / 2, canvasSize.height / 4, 'FLOOR 1')

	let loop = GameLoop({
		update() {
			leftElevatorWithDoors.update()
			middleElevatorWithDoors.update()
			rightElevatorWithDoors.update()
			leftStairCaseDoor.update()
			rightStairCaseDoor.update()
		},
		render() {
			background.render()
			floorNumber.render()
			leftElevatorWithDoors.render()
			middleElevatorWithDoors.render()
			rightElevatorWithDoors.render()
			leftStairCaseDoor.render()
			rightStairCaseDoor.render()
		}
	});

	loop.start();
}

launchRound()