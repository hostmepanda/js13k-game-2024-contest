import {GameLoop, init, initPointer, collides, pointerPressed, track} from 'kontra'
import {diamondSprite, elevatorFloorSelector, elevatorFrame, gemSprite} from './assets/images'
import {floorColor} from './colors'
import {initFloor} from './static-elements/floor'
import {createSlotsBox} from './static-elements/slots-box'

const { canvas, context } = init()
const pointer = initPointer({ radius: 10 })

const renderContext = canvas.getContext('2d')

const canvasSize =  {
	width: 800,
	height: 600,
}

const SLOTS = [1, 2, 3, 4, 5, 6, 7, 8]

const floorCameraPoints = {
	floor1: {
		y: 0
	},
	floor2: {
		y: canvasSize.height,
	},
	floor3: {
		y: 2 * canvasSize.height,
	},
	floor4: {
		y: 3 * canvasSize.height,
	},
	floor5: {
		y: 4 * canvasSize.height,
	},
	floor6: {
		y: 5 * canvasSize.height,
	},
	floor7: {
		y: 6 * canvasSize.height,
	},
	floor8: {
		y: 7 * canvasSize.height,
	},
	floor9: {
		y: 8 * canvasSize.height,
	},
	floor10: {
		y: 9 * canvasSize.height,
	},
	floor11: {
		y: 10 * canvasSize.height,
	},
	floor12: {
		y: 11 * canvasSize.height,
	},
	floor13: {
		y: 12 * canvasSize.height,
	},
}

const cameraPosition = {
	y: floorCameraPoints.floor1.y,
	x: 0,
	dy: 4,
	targetY: floorCameraPoints.floor1.y,
	isMoving: false,
}

const gameElementsState = {
	'yellow-gem': {
		id: 1,
		isPicked: false,
		isUsed: false,
		currentFloor: 1,
		slotNumber: null,
		isDragging: false,
		x: 400,
		y: 450,
	},
	'diamond': {
		id: 2,
		isPicked: false,
		isUsed: false,
		currentFloor: 1,
		slotNumber: null,
		isDragging: false,
		x: 200,
		y: 450,
	},
}

const gameArtefactsStates = [
	{
		item: gemSprite(gameElementsState['yellow-gem'])(track)(),
		type: 'yellow-gem',
	}, {
		item: diamondSprite(gameElementsState['diamond'])(track)(),
		type: 'diamond',
	}
]

function launchRound() {
	const gameContext = {
		activeFloor: 1,
	}
	let draggingElementId = null
	const slotBoxState = {
		items: [],
	}

	const floorPointsSwitcher = {
		floor1: floorCameraPoints.floor1.y + canvasSize.height / 2 - 20,
		floor2: floorCameraPoints.floor2.y + canvasSize.height / 2 - 20,
		floor3: floorCameraPoints.floor3.y + canvasSize.height / 2 - 20,
		floor4: floorCameraPoints.floor4.y + canvasSize.height / 2 - 20,
		floor5: floorCameraPoints.floor5.y + canvasSize.height / 2 - 20,
		floor6: floorCameraPoints.floor6.y + canvasSize.height / 2 - 20,
		floor7: floorCameraPoints.floor7.y + canvasSize.height / 2 - 20,
		floor8: floorCameraPoints.floor8.y + canvasSize.height / 2 - 20,
		floor9: floorCameraPoints.floor9.y + canvasSize.height / 2 - 20,
		floor10: floorCameraPoints.floor10.y + canvasSize.height / 2 - 20,
		floor11: floorCameraPoints.floor11.y + canvasSize.height / 2 - 20,
		floor12: floorCameraPoints.floor12.y + canvasSize.height / 2 - 20,
		floor13: floorCameraPoints.floor13.y + canvasSize.height / 2 - 20,
	}

	const elevatorsState = {
		left: {
			item: elevatorFrame(
				canvasSize.width / 8 * 2,
				floorCameraPoints.floor5.y + canvasSize.height / 2 - 20
			),
			isOpen: false,
			isOpening: true,
			isClosing: false,
			isMoving: false,
			isMovingUp: false,
			isMovingDown: false,
			shouldOpen: true,
			isShowingFloorSelector: false,
			isMovingUser: false,
			currentFloor: 1,
			targetFloor: 1,
			dy: 8,
			shouldWaitForCameraUpdate: false,
		},
		middle: {
			item: elevatorFrame(
				canvasSize.width / 8 * 3.5,
				floorCameraPoints.floor8.y + canvasSize.height / 2 - 20,
			),
			isOpen: false,
			isOpening: false,
			isClosing: false,
			isMoving: false,
			isMovingUp: false,
			isMovingDown: false,
			shouldOpen: false,
			isShowingFloorSelector: false,
			isMovingUser: false,
			currentFloor: 8,
			targetFloor: 8,
			dy: 10,
			shouldWaitForCameraUpdate: false,
		},
		right: {
			item: elevatorFrame(
				canvasSize.width / 8 * 5,
				floorCameraPoints.floor12.y + canvasSize.height / 2 - 20,
			),
			isOpen: false,
			isOpening: false,
			isClosing: false,
			isMoving: false,
			isMovingUp: false,
			isMovingDown: false,
			shouldOpen: false,
			isShowingFloorSelector: false,
			isMovingUser: false,
			currentFloor: 12,
			targetFloor: 12,
			dy: 15,
			shouldWaitForCameraUpdate: false,
		},
	}
	const leftStairCaseDoorHandler = () => {
		if (gameContext.activeFloor === 1) {
			return
		}
		gameContext.activeFloor = gameContext.activeFloor - 1
		cameraPosition.targetY = floorCameraPoints[`floor${gameContext.activeFloor}`].y
	}

	const rightStairCaseDoorHandler = () => {
		if (gameContext.activeFloor === 13) {
			return
		}
		gameContext.activeFloor = gameContext.activeFloor + 1
		cameraPosition.targetY = floorCameraPoints[`floor${gameContext.activeFloor}`].y
	}

	const floor1Handlers= {
		handlers: {
			leftStairCaseDoorHandler,
			rightStairCaseDoorHandler,
		},
	}

	const floorStages = [1,2,3,4,5,6,7,8,9,10,11,12,13].map(
		(floorNumber) => {
			return initFloor(
				canvasSize,
				{ y: floorCameraPoints[`floor${floorNumber}`].y },
				floorColor[`floor${floorNumber}`],
				`FLOOR ${floorNumber}`,
				floorNumber,
				renderContext,
				elevatorsState,
				pointer,
				gameContext,
			)(floor1Handlers)
		}
	)
	const itemSlots = createSlotsBox(renderContext)(5, 500)

	const slotCoordinates = {
		slot1: {
			x0: itemSlots.x,
			x1: itemSlots.x + 50,
			y0: itemSlots.y,
			y1: itemSlots.y + 50,
		},
		slot2: {
			x0: itemSlots.x + 50,
			x1: itemSlots.x + 100,
			y0: itemSlots.y,
			y1: itemSlots.y + 50,
		},
		slot3: {
			x0: itemSlots.x + 100,
			x1: itemSlots.x + 150,
			y0: itemSlots.y,
			y1: itemSlots.y + 50,
		},
		slot4: {
			x0: itemSlots.x + 150,
			x1: itemSlots.x + 200,
			y0: itemSlots.y,
			y1: itemSlots.y + 50,
		},
		slot5: {
			x0: itemSlots.x,
			x1: itemSlots.x + 50,
			y0: itemSlots.y + 50,
			y1: itemSlots.y + 100,
		},
		slot6: {
			x0: itemSlots.x + 50,
			x1: itemSlots.x + 100,
			y0: itemSlots.y + 50,
			y1: itemSlots.y + 100,
		},
		slot7: {
			x0: itemSlots.x + 100,
			x1: itemSlots.x + 150,
			y0: itemSlots.y + 50,
			y1: itemSlots.y + 100,
		},
		slot8: {
			x0: itemSlots.x + 150,
			x1: itemSlots.x + 200,
			y0: itemSlots.y + 50,
			y1: itemSlots.y + 100,
		},
	}

	const floorDashboardInElevator = elevatorFloorSelector(context, elevatorsState, gameContext, canvasSize)()

	let timerPassed = 0
	let loop = GameLoop({
		update(timeDiff) {
			timerPassed += timeDiff

			floorStages.forEach((floor) => {
				floor.update(timeDiff)
			})

			itemSlots.update()

			Object.values(elevatorsState).forEach((state) => {
				if (state.isMoving) {
					if (state.isMovingUser) {
						state.item.y = state.item.y + (state.isMovingUp ? cameraPosition.dy : -cameraPosition.dy)
					} else {
						state.item.y = state.item.y + (state.isMovingUp ? state.dy : -state.dy)
					}
				}

				if (state.item.y <= floorPointsSwitcher.floor1 + 5) {
					state.currentFloor = 1
				} else if (state.item.y <= floorPointsSwitcher.floor2 - 5 && state.item.y >= floorPointsSwitcher.floor1 + 5) {
					state.currentFloor = 2
					gameContext.activeFloor = 1
				} else if (state.item.y <= floorPointsSwitcher.floor3 - 5 && state.item.y >= floorPointsSwitcher.floor2 + 5) {
					state.currentFloor = 3
				} else if (state.item.y <= floorPointsSwitcher.floor4 - 5 && state.item.y >= floorPointsSwitcher.floor3 + 5) {
					state.currentFloor = 4
				} else if (state.item.y <= floorPointsSwitcher.floor5 - 5 && state.item.y >= floorPointsSwitcher.floor4 + 5) {
					state.currentFloor = 5
				} else if (state.item.y <= floorPointsSwitcher.floor6 - 5 && state.item.y >= floorPointsSwitcher.floor5 + 5) {
					state.currentFloor = 6
				} else if (state.item.y <= floorPointsSwitcher.floor7 - 5 && state.item.y >= floorPointsSwitcher.floor6 + 5) {
					state.currentFloor = 7
				} else if (state.item.y <= floorPointsSwitcher.floor8 - 5 && state.item.y >= floorPointsSwitcher.floor7 + 5) {
					state.currentFloor = 8
				} else if (state.item.y <= floorPointsSwitcher.floor9 - 5 && state.item.y >= floorPointsSwitcher.floor8 + 5) {
					state.currentFloor = 9
				} else if (state.item.y <= floorPointsSwitcher.floor10 - 5 && state.item.y >= floorPointsSwitcher.floor9 + 5) {
					state.currentFloor = 10
				} else if (state.item.y <= floorPointsSwitcher.floor11 - 5 && state.item.y >= floorPointsSwitcher.floor10 + 5) {
					state.currentFloor = 11
				} else if (state.item.y <= floorPointsSwitcher.floor12 - 5 && state.item.y >= floorPointsSwitcher.floor11 + 5) {
					state.currentFloor = 12
				} else if (state.item.y <= floorPointsSwitcher.floor13 - 5 && state.item.y >= floorPointsSwitcher.floor12 + 5) {
					state.currentFloor = 13
				}

				if (state.currentFloor === state.targetFloor) {
					state.isMoving = false
					state.isMovingUp = false
					state.isMovingDown = false
					state.item.y = floorPointsSwitcher[`floor${state.currentFloor}`]

					if (state.isMovingUser) {
						gameContext.activeFloor = state.currentFloor
					}
					if (state.isMovingUser && cameraPosition.targetY === cameraPosition.y) {
						state.shouldWaitForCameraUpdate = false
					}
					if (!state.shouldWaitForCameraUpdate) {
						state.isOpening = state.shouldOpen
						state.isMovingUser = false
					}
				}

				state.item.update()
			})


			const dashboardFloorSelectorOpenedState = Object.values(elevatorsState).find(({ isShowingFloorSelector }) => isShowingFloorSelector)

			gameArtefactsStates.forEach(({ item, isPicked, currentFloor}) => {
				const absolutionItemY = gameElementsState[item.type].isPicked ? item.y : item.y - (gameContext.activeFloor - 1) * canvasSize.height
				const distance = Math.sqrt(
					(item.x - (pointer.x - 15)) ** 2 + (item.y - (gameElementsState[item.type].isPicked ? pointer.y - 15 : ((pointer.y - 15)+ (gameContext.activeFloor - 1) * canvasSize.height))) ** 2)
				const isColliding = itemSlots.x <= item.x && item.x <= itemSlots.x + itemSlots.width
					&& itemSlots.y <= absolutionItemY && absolutionItemY <= itemSlots.y + itemSlots.height

				if (distance <= pointer.radius) {
					if (pointerPressed('left') && draggingElementId !== item.id) {
						gameElementsState[item.type].isDragging = true
						draggingElementId = item.id
						gameElementsState[item.type].isPicked = dashboardFloorSelectorOpenedState ? true : false
						slotBoxState.items = slotBoxState.items.filter((slot) => slot !== item.type)
					}
				}

				if (gameElementsState[item.type].isDragging && !pointerPressed('left')) {
					gameElementsState[item.type].isDragging = false
					draggingElementId = false
					gameElementsState[item.type].y = pointer.y - 15

					slotBoxState.items.push(item.type)
					gameElementsState[item.type].slotNumber = slotBoxState.items.length
					gameElementsState[item.type].isPicked = true

					if (!isColliding) {
						gameElementsState[item.type].currentFloor = gameContext.activeFloor
						gameElementsState[item.type].slotNumber = null
						gameElementsState[item.type].isPicked = dashboardFloorSelectorOpenedState ? true : false
						slotBoxState.items = slotBoxState.items.filter((type) => type !== item.type)
					}
				}

				if (gameElementsState[item.type].isDragging) {
					gameElementsState[item.type].x = pointer.x - 15
					gameElementsState[item.type].y = pointer.y - 15 + (gameContext.activeFloor - 1) * canvasSize.height
				}

				item.update()
			})

			slotBoxState.items.forEach(type => {
				const itemConfig = gameElementsState[type]
				if (itemConfig.slotNumber === null) {
					return
				}
				itemConfig.x = slotCoordinates[`slot${itemConfig.slotNumber}`].x0 + 9
				itemConfig.y = slotCoordinates[`slot${itemConfig.slotNumber}`].y0 + 9
			})

			floorDashboardInElevator.update()

			const movingUserElevator = Object.values(elevatorsState).find(({ isMovingUser, isMoving }) => isMovingUser && isMoving)

			if (movingUserElevator) {
				cameraPosition.dy = 4
				cameraPosition.targetY = floorCameraPoints[`floor${movingUserElevator.targetFloor}`].y
				movingUserElevator.shouldWaitForCameraUpdate = true
			}

			if (cameraPosition.targetY !== cameraPosition.y) {
				cameraPosition.isMoving = true
				cameraPosition.y = cameraPosition.targetY > cameraPosition.y ? cameraPosition.y + cameraPosition.dy : cameraPosition.y - cameraPosition.dy
			} else {
				cameraPosition.isMoving = false
				cameraPosition.dy = 2
				cameraPosition.y = cameraPosition.targetY
			}
		},
		render() {
			const dashboardFloorSelectorOpenedState = Object.values(elevatorsState).find(({ isShowingFloorSelector }) => isShowingFloorSelector)

			Object.entries(gameElementsState)
				.filter(([, {isPicked}]) => isPicked)
				.forEach(([type]) => {
					gameArtefactsStates.filter(({type: spriteType}) => type === spriteType).forEach(({item}) => item.render())
				})

			renderContext.save()

			renderContext.translate(0, -cameraPosition.y)
			floorStages.forEach((floor) => {
				floor.render()
			})

			if (!dashboardFloorSelectorOpenedState) {
				Object
					.entries(gameElementsState)
					.filter(([, {isPicked}]) => !isPicked)
					.forEach(([type]) => {
						gameArtefactsStates.filter(({type: spriteType}) => type === spriteType).forEach(({item}) => item.render())
					})
			}

			renderContext.restore()

			if (dashboardFloorSelectorOpenedState) {
				const pickedArtefacts = Object
					.entries(gameElementsState)
					.filter(([, {isPicked}]) => isPicked)
					.map(([type]) => {
						return gameArtefactsStates.filter(({type: spriteType}) => type === spriteType).map(({ item }) => item)
					}).flat(2);

				[
					...floorDashboardInElevator.group,
					itemSlots,
					...pickedArtefacts,
				].forEach(sprite => sprite.render())


			}

			if (!dashboardFloorSelectorOpenedState) {
				itemSlots.render()
			}


		}
	});

	loop.start()
}

launchRound()