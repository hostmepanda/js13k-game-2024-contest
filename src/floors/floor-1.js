import {track} from 'kontra'
import {createStaticBackground, elevator, stairCaseDoor, wallText} from '../assets/images'

export const initFloor1 = (canvasSize, floorCameraPoints) =>
	({
		 handlers: {
			 leftStairCaseDoorHandler,
			 rightStairCaseDoorHandler,
		 },
	 }) => {
		const floorShiftAxisY = floorCameraPoints.floor1.y
		const background = createStaticBackground(canvasSize, 'rgb(34,89,131)', { x: 0, y:  floorShiftAxisY })


		const firstElevatorCoordinates = {
			x: canvasSize.width / 8 * 2,
			y: floorShiftAxisY + canvasSize.height / 2 - 20,
		}

		const secondElevatorCoordinates = {
			x: canvasSize.width / 8 * 3.5,
			y: floorShiftAxisY + canvasSize.height / 2 - 20,
		}

		const thirdElevatorCoordinates = {
			x: canvasSize.width / 8 * 5,
			y: floorShiftAxisY + canvasSize.height / 2 - 20,
		}

		const wallFloorNumber = wallText(canvasSize.width / 2, floorShiftAxisY + canvasSize.height / 4, '1 FLOOR')

		const leftStairCaseDoor = stairCaseDoor(track, leftStairCaseDoorHandler)(canvasSize.width / 15, floorShiftAxisY + canvasSize.height / 2 - 20)
		const rightStairCaseDoor = stairCaseDoor(track, rightStairCaseDoorHandler)(canvasSize.width / 8 * 6.5, floorShiftAxisY + canvasSize.height / 2 - 20)

		const leftElevatorWithDoors = elevator(firstElevatorCoordinates.x, floorShiftAxisY + firstElevatorCoordinates.y)
		const middleElevatorWithDoors = elevator(secondElevatorCoordinates.x, floorShiftAxisY + secondElevatorCoordinates.y)
		const rightElevatorWithDoors = elevator(thirdElevatorCoordinates.x, floorShiftAxisY + thirdElevatorCoordinates.y)

		return {
			update() {
				leftElevatorWithDoors.update()
				middleElevatorWithDoors.update()
				rightElevatorWithDoors.update()
				leftStairCaseDoor.update()
				rightStairCaseDoor.update()
			},
			render() {
				background.render()
				wallFloorNumber.render()
				leftElevatorWithDoors.render()
				middleElevatorWithDoors.render()
				rightElevatorWithDoors.render()
				leftStairCaseDoor.render()
				rightStairCaseDoor.render()
			},
		}
	}