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
		isPicked: false,
		isUsed: false,
		currentFloor: 2,
		slotNumber: null,
		isDragging: false,
		x: 400,
		y: 450,
	},
	'diamond': {
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
	const slotBoxState = {
		items: [],
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
			)(floor1Handlers)
		}
	)

	const itemSlots = createSlotsBox(renderContext)(5, 500)

	let loop = GameLoop({
		update() {
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
					if (pointerPressed('left')) {
						gameElementsState[item.type].isDragging = true
						gameElementsState[item.type].isPicked = false
					}
				}

				if (gameElementsState[item.type].isDragging && !pointerPressed('left')) {
					gameElementsState[item.type].isDragging = false
					gameElementsState[item.type].y = pointer.y - 15
					if (!isColliding) {
						gameElementsState[item.type].currentFloor = activeFloor
					}
				}

				if (gameElementsState[item.type].isDragging) {
					gameElementsState[item.type].x = pointer.x - 15
					gameElementsState[item.type].y = pointer.y - 15 + (activeFloor - 1) * canvasSize.height
				}

				if (isColliding && !pointerPressed('left')) {
					gameElementsState[item.type].isPicked = true
					if (itemSlots.x <= item.x && item.x <= itemSlots.x + 50 && !(item.x > itemSlots.x + 50)) {
						if (itemSlots.y <= absolutionItemY && absolutionItemY <= itemSlots.y + 50 && !(absolutionItemY > itemSlots.y + 50)) {
							gameElementsState[item.type].slotNumber = 1
							gameElementsState[item.type].x = itemSlots.x + 15 - item.width / 4
							gameElementsState[item.type].y = itemSlots.y + 15 - item.height / 2
						} else {
							gameElementsState[item.type].slotNumber = 5
							gameElementsState[item.type].x = itemSlots.x + 15
							gameElementsState[item.type].y = itemSlots.y + 15 + 50 - item.height / 2
						}
					} else if (itemSlots.x + 50 <= item.x && item.x <= itemSlots.x + 100 && !(item.x > itemSlots.x + 100)) {
						if (itemSlots.y <= absolutionItemY && absolutionItemY <= itemSlots.y + 50 && !(absolutionItemY > itemSlots.y + 50)) {
							gameElementsState[item.type].slotNumber = 2
							gameElementsState[item.type].x = itemSlots.x + 15 + 50 - item.width / 4
							gameElementsState[item.type].y = itemSlots.y + 15 - item.height / 2
						} else {
							gameElementsState[item.type].slotNumber = 6
							gameElementsState[item.type].x = itemSlots.x + 15 + 50 - item.width / 4
							gameElementsState[item.type].y = itemSlots.y + 15 + 50 - item.height / 2
						}
					} else if (itemSlots.x + 100 <= item.x && item.x <= itemSlots.x + 150 && !(item.x > itemSlots.x + 150)) {
						if (itemSlots.y <= absolutionItemY && absolutionItemY <= itemSlots.y + 50 && !(absolutionItemY > itemSlots.y + 50)) {
							gameElementsState[item.type].slotNumber = 3
							gameElementsState[item.type].x = itemSlots.x + 15 + 100 - item.width / 4
							gameElementsState[item.type].y = itemSlots.y + 15 - item.height / 2
						} else {
							gameElementsState[item.type].slotNumber = 7
							gameElementsState[item.type].x = itemSlots.x + 15 + 100 - item.width / 4
							gameElementsState[item.type].y = itemSlots.y + 15 + 50 - item.height / 2
						}
					} else if (itemSlots.x + 150 <= item.x && item.x <= itemSlots.x + 200 && !(item.x > itemSlots.x + 200)) {
						if (itemSlots.y <= absolutionItemY && absolutionItemY <= itemSlots.y + 50 && !(absolutionItemY > itemSlots.y + 50)) {
							gameElementsState[item.type].slotNumber = 4
							gameElementsState[item.type].x = itemSlots.x + 15 + 150 - item.width / 4
							gameElementsState[item.type].y = itemSlots.y + 15
						} else {
							gameElementsState[item.type].slotNumber = 8
							gameElementsState[item.type].x = itemSlots.x + 15 + 150 - item.width / 4
							gameElementsState[item.type].y = itemSlots.y + 15 + 50
						}
					} else {
						gameElementsState[item.type].slotNumber = null
					}
				}

				item.update()
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