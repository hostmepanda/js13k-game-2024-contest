import {GameLoop, init, initPointer, collides, pointerPressed, track} from 'kontra'
import {diamondSprite, gemSprite} from './assets/images'
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
}

const gameElementsState = {
	'yellow-gem': {
		id: 1,
		isPicked: false,
		isUsed: false,
		currentFloor: 2,
		slotNumber: null,
		isDragging: false,
		x: 400,
		y: 450,
	},
	'diamond': {
		id: 2,
		isPicked: false,
		isUsed: false,
		currentFloor: 4,
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
	let activeFloor = 1
	let draggingElementId = null
	const slotBoxState = {
		items: [],
	}

	const elevatorsState = {
		left: {
			isOpen: false,
			isMoving: false,
			isMovingUp: false,
			isMovingDown: false,
			currentFloor: 5,
			targetFloor: 5,
			dy: 4,
		},
		middle: {
			isOpen: false,
			isMoving: false,
			isMovingUp: false,
			isMovingDown: false,
			currentFloor: 8,
			targetFloor: 8,
			dy: 2,
		},
		right: {
			isOpen: false,
			isMoving: false,
			isMovingUp: false,
			isMovingDown: false,
			currentFloor: 12,
			targetFloor: 12,
			dy: 15,
		},
	}
	const leftStairCaseDoorHandler = () => {
		if (activeFloor === 1) {
			return
		}
		activeFloor = activeFloor - 1
		cameraPosition.y = floorCameraPoints[`floor${activeFloor}`].y
	}

	const rightStairCaseDoorHandler = () => {
		if (activeFloor === 13) {
			return
		}
		activeFloor = activeFloor + 1
		cameraPosition.y = floorCameraPoints[`floor${activeFloor}`].y
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
				activeFloor,
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


	let loop = GameLoop({
		update() {
			const busySlots = Object
				.values(gameElementsState)
				.filter(({ slotNumber }) => !!slotNumber)
				.map(({slotNumber}) => slotNumber)

			const freeSlots = SLOTS.filter((slot) => !busySlots.includes(slot))

			floorStages.forEach((floor) => {
				floor.update()
			})
			itemSlots.update()

			gameArtefactsStates.forEach(({ item, isPicked, currentFloor}) => {
				const absolutionItemY = gameElementsState[item.type].isPicked ? item.y : item.y - (activeFloor - 1) * canvasSize.height
				const distance = Math.sqrt(
					(item.x - (pointer.x - 15)) ** 2 + (item.y - (gameElementsState[item.type].isPicked ? pointer.y - 15 : ((pointer.y - 15)+ (activeFloor - 1) * canvasSize.height))) ** 2)
				const isColliding = itemSlots.x <= item.x && item.x <= itemSlots.x + itemSlots.width
					&& itemSlots.y <= absolutionItemY && absolutionItemY <= itemSlots.y + itemSlots.height

				if (distance <= pointer.radius) {
					if (pointerPressed('left') && draggingElementId !== item.id) {
						gameElementsState[item.type].isDragging = true
						draggingElementId = item.id
						gameElementsState[item.type].isPicked = false
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
						gameElementsState[item.type].currentFloor = activeFloor
						gameElementsState[item.type].slotNumber = null
						gameElementsState[item.type].isPicked = false
						slotBoxState.items = slotBoxState.items.filter((type) => type !== item.type)
					}
				}

				if (gameElementsState[item.type].isDragging) {
					gameElementsState[item.type].x = pointer.x - 15
					gameElementsState[item.type].y = pointer.y - 15 + (activeFloor - 1) * canvasSize.height
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

		},
		render() {
			itemSlots.render()

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

			Object
				.entries(gameElementsState)
				.filter(([, {isPicked}]) => !isPicked)
				.forEach(([type]) => {
					gameArtefactsStates.filter(({type: spriteType}) => type === spriteType).forEach(({item}) => item.render())
				})

							// Restore the context to original state
			renderContext.restore()

		}
	});

	loop.start()
}

launchRound()