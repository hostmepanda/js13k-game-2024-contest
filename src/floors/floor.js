import {track} from 'kontra'
import {closedDoorStairCase, createStaticBackground, stairCaseDoor, wallText} from '../assets/images'

export const initFloor = (canvasSize, floorAnkerPoints, color, textOnTheWall, floorNumber) =>
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

		const background = createStaticBackground(canvasSize, color, { x: floorStartX, y:  floorStartY })
		const wallFloorNumber = wallText(canvasSize.width / 2, floorStartY + canvasSize.height / 4, textOnTheWall)

		if (floorNumber === 1) {
			leftStairCaseDoor = closedDoorStairCase(track, leftStairCaseDoorHandler)(canvasSize.width / 15, floorStartY + canvasSize.height / 2 - 20)
		} else {
			leftStairCaseDoor = stairCaseDoor(track, leftStairCaseDoorHandler)(canvasSize.width / 15, floorStartY + canvasSize.height / 2 - 20)
		}

		if (floorNumber < 13) {
			rightStairCaseDoor = stairCaseDoor(track, rightStairCaseDoorHandler)(canvasSize.width / 8 * 6.5, floorStartY + canvasSize.height / 2 - 20)
		}

		// const leftElevatorWithDoors = elevator(firstElevatorCoordinates.x, floorShiftAxisY + firstElevatorCoordinates.y)
		// const middleElevatorWithDoors = elevator(secondElevatorCoordinates.x, floorShiftAxisY + secondElevatorCoordinates.y)
		// const rightElevatorWithDoors = elevator(thirdElevatorCoordinates.x, floorShiftAxisY + thirdElevatorCoordinates.y)

		return {
			update() {
				// leftElevatorWithDoors.update()
				// middleElevatorWithDoors.update()
				// rightElevatorWithDoors.update()
				leftStairCaseDoor.update()
				if (floorNumber < 13) {
					rightStairCaseDoor.update()
				}
			},
			render() {
				background.render()
				wallFloorNumber.render()
				// leftElevatorWithDoors.render()
				// middleElevatorWithDoors.render()
				// rightElevatorWithDoors.render()
				leftStairCaseDoor.render()
				if (floorNumber < 13) {
					rightStairCaseDoor.render()
				}
			},
		}
	}