import {track} from 'kontra'
import {
	closedDoorStairCase,
	createStaticBackground,
	elevator,
	stairCaseDoor,
	wallText
} from '../assets/images'

export const initFloor = (canvasSize, floorAnkerPoints, color, textOnTheWall, floorNumber, renderContext) =>
	({
		 handlers: {
			 leftStairCaseDoorHandler,
			 rightStairCaseDoorHandler,
		 },
	 }) => {
		const floorStartX = 0;
		const floorStartY = floorAnkerPoints.y

		const elevatorCoordinates = {
			left: {
				x: canvasSize.width / 8 * 2,
				y: floorStartY + canvasSize.height / 2 - 20,
			},
			middle: {
				x: canvasSize.width / 8 * 3.5,
				y: floorStartY + canvasSize.height / 2 - 20,
			},
			right: {
				x: canvasSize.width / 8 * 5,
				y: floorStartY + canvasSize.height / 2 - 20,
			}
		}
		let rightStairCaseDoor;
		let leftStairCaseDoor;
		let floorText;
		let arrowUp;
		let arrowDown;

		const background = createStaticBackground(canvasSize, color, { x: floorStartX, y:  floorStartY })
		const wallFloorNumber = wallText(canvasSize.width / 2, floorStartY + canvasSize.height / 4, textOnTheWall)

		if (floorNumber === 1) {
			leftStairCaseDoor = closedDoorStairCase(track, leftStairCaseDoorHandler)(canvasSize.width / 15, floorStartY + canvasSize.height / 2 - 20)
			floorText = wallText(canvasSize.width / 2, floorStartY + 5 * canvasSize.height / 6, 'Key is on the floor 13')
		} else {
			leftStairCaseDoor = stairCaseDoor(track, leftStairCaseDoorHandler)(canvasSize.width / 15, floorStartY + canvasSize.height / 2 - 20)
			arrowDown = wallText(canvasSize.width / 15 + 45*2 / 2 + 5, floorStartY + canvasSize.height / 2 - 20 + 122 / 2, 'DOWN', 'rgb(255,0,0)', 20)
		}


		if (floorNumber < 13) {
			rightStairCaseDoor = stairCaseDoor(track, rightStairCaseDoorHandler)(canvasSize.width / 8 * 6.5, floorStartY + canvasSize.height / 2 - 20)
			arrowUp = wallText(canvasSize.width / 8 * 6.5 + 45*2 / 2 + 5, floorStartY + canvasSize.height / 2 + 122 / 2, 'UP', 'rgb(255,0,0)', 20)
		}

		const leftElevatorWithDoors = elevator(track, renderContext)(elevatorCoordinates.left.x, elevatorCoordinates.left.y)
		const middleElevatorWithDoors = elevator(track, renderContext)(elevatorCoordinates.middle.x, elevatorCoordinates.middle.y)
		const rightElevatorWithDoors = elevator(track, renderContext)(elevatorCoordinates.right.x, elevatorCoordinates.right.y)

		return {
			update() {
				leftElevatorWithDoors.update()
				middleElevatorWithDoors.update()
				rightElevatorWithDoors.update()
				leftStairCaseDoor.update()

				if (floorNumber < 13) {
					rightStairCaseDoor.update()
					arrowUp.update()
				}
				if (floorNumber === 1) {
					floorText.update()
				}
				if (floorNumber > 1) {
					arrowDown.update()
				}
			},
			render() {
				background.render()
				wallFloorNumber.render()
				leftElevatorWithDoors.render()
				middleElevatorWithDoors.render()
				rightElevatorWithDoors.render()
				leftStairCaseDoor.render()
				if (floorNumber < 13) {
					rightStairCaseDoor.render()
					arrowUp.render()
				}
				if (floorNumber === 1) {
					floorText.render()
				}
				if (floorNumber > 1) {
					arrowDown.render()
				}
			},
		}
	}