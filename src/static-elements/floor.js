import {track} from 'kontra'
import {
	closedDoorStairCase,
	createStaticBackground,
	elevator,
	stairCaseDoor,
	wallText
} from '../assets/images'

export const initFloor = (canvasSize, floorAnkerPoints, color, textOnTheWall, floorNumber, renderContext, elevatorsState, pointer, gameContext, gameElementsState, stairCaseDoorByFloor, cameraPosition, floorCameraPoints) =>
	() => {
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

		const rightStairCaseDoorHandler = () => {
			if (gameContext.activeFloor === 13) {
				return
			}
			if (stairCaseDoorByFloor['down'].includes(gameContext.activeFloor)) {
				gameContext.activeFloor = gameContext.activeFloor + 1
				cameraPosition.targetY = floorCameraPoints[`floor${gameContext.activeFloor}`].y
			}
		}

		const leftStairCaseDoorHandler = () => {
			if (gameContext.activeFloor === 1) {
				return
			}
			if (stairCaseDoorByFloor['up'].includes(gameContext.activeFloor)) {
				gameContext.activeFloor = gameContext.activeFloor - 1
				cameraPosition.targetY = floorCameraPoints[`floor${gameContext.activeFloor}`].y
			}
		}


		if (stairCaseDoorByFloor['up'].includes(floorNumber)) {
			leftStairCaseDoor = stairCaseDoor(track, leftStairCaseDoorHandler)(canvasSize.width / 15, floorStartY + canvasSize.height / 2 - 20)
			arrowDown = wallText(canvasSize.width / 15 + 45*2 / 2 + 5, floorStartY + canvasSize.height / 2 - 20 + 122 / 2, 'UP', 'rgb(255,0,0)', 20)
		} else {
			let closedDoorHandler = () => {}
			if (floorNumber === 1) {
				closedDoorHandler = () => {
					// you need key
				}
			}
			leftStairCaseDoor = closedDoorStairCase(track, leftStairCaseDoorHandler)(canvasSize.width / 15, floorStartY + canvasSize.height / 2 - 20)
		}

		if (stairCaseDoorByFloor['down'].includes(floorNumber)) {
			rightStairCaseDoor = stairCaseDoor(track, rightStairCaseDoorHandler)(canvasSize.width / 8 * 6.5, floorStartY + canvasSize.height / 2 - 20)
			arrowUp = wallText(canvasSize.width / 8 * 6.5 + 45*2 / 2 + 5, floorStartY + canvasSize.height / 2 + 122 / 2, 'DOWN', 'rgb(255,0,0)', 20)
		} else {
			rightStairCaseDoor = closedDoorStairCase(track, rightStairCaseDoorHandler)(canvasSize.width / 8 * 6.5, floorStartY + canvasSize.height / 2 - 20)
		}

		if (floorNumber === 1) {
			floorText = wallText(canvasSize.width / 2, floorStartY + 5 * canvasSize.height / 6, 'Key is on the floor 13')
		}

		const leftElevatorWithDoors = elevator(track, renderContext, {}, elevatorsState.left, pointer, floorStartY, gameContext, floorNumber, gameElementsState)(elevatorCoordinates.left.x, elevatorCoordinates.left.y)
		const middleElevatorWithDoors = elevator(track, renderContext, {}, elevatorsState.middle, pointer, floorStartY, gameContext, floorNumber, gameElementsState)(elevatorCoordinates.middle.x, elevatorCoordinates.middle.y)
		const rightElevatorWithDoors = elevator(track, renderContext, {}, elevatorsState.right, pointer, floorStartY, gameContext, floorNumber, gameElementsState)(elevatorCoordinates.right.x, elevatorCoordinates.right.y)

		return {
			update(dt) {
				leftElevatorWithDoors.update(dt)
				middleElevatorWithDoors.update(dt)
				rightElevatorWithDoors.update(dt)

				leftStairCaseDoor?.update()

				rightStairCaseDoor?.update()
				arrowUp?.update()
				floorText?.update()
				arrowDown?.update()

			},
			render() {
				background.render()
				wallFloorNumber.render()
				leftStairCaseDoor?.render()
				leftElevatorWithDoors.render()
				middleElevatorWithDoors.render()
				rightElevatorWithDoors.render()
				rightStairCaseDoor?.render()
				floorText?.render()
				arrowUp?.render()
				arrowDown?.render()
			},
		}
	}