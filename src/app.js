import {GameLoop, init, initPointer} from 'kontra'
import {floorColor} from './colors'
import {initFloor} from './floors/floor'

const { canvas, context } = init()
const pointer = initPointer()

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

function launchRound() {
	let activeFloor = 1

	const leftStairCaseDoorHandler = () => {
		console.log(`--Active floor: ${activeFloor}`, {activeFloor})
		if (activeFloor === 1) {
			return
		}
		activeFloor = activeFloor - 1
		cameraPosition.y = floorCameraPoints[`floor${activeFloor}`].y
		console.log(`--Active floor: ${activeFloor}`, {activeFloor})
	}

	const rightStairCaseDoorHandler = () => {
		console.log(`--Active floor: ${activeFloor} `, {activeFloor})
		if (activeFloor === 13) {
			return
		}
		activeFloor = activeFloor + 1
		cameraPosition.y = floorCameraPoints[`floor${activeFloor}`].y
		console.log(`--Active floor: ${activeFloor}`, {activeFloor})
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

	let loop = GameLoop({
		update() {
				floorStages.forEach((floor) => {
					floor.update()
				})
		},
		render() {
			renderContext.save();

			renderContext.translate(0, -cameraPosition.y);
			floorStages.forEach((floor) => {
				floor.render()
			})

			// Restore the context to original state
			renderContext.restore();

		}
	});

	loop.start();
}

launchRound()