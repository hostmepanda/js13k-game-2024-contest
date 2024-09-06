import {GameLoop, init, initPointer} from 'kontra'

import {initFloor1} from './floors/floor-1'
import {initFloor2} from './floors/floor-2'

const { canvas, context } = init()
const pointer = initPointer()

const canvasSize =  {
	width: 800,
	height: 600,
}

const cameraPosition = {
	x: 0,
}

const floorCameraPoints = {
	floor1: {
		y: 13 * canvasSize.height,
	},
	floor2: {
		y: 12 * canvasSize.height,
	},
	floor3: {
		y: 11 * canvasSize.height,
	},
	floor4: {
		y: 10 * canvasSize.height,
	},
	floor5: {
		y: 9 * canvasSize.height,
	},
	floor6: {
		y: 8 * canvasSize.height,
	},
	floor7: {
		y: 7 * canvasSize.height,
	},
	floor8: {
		y: 6 * canvasSize.height,
	},
	floor9: {
		y: 5 * canvasSize.height,
	},
	floor10: {
		y: 4 * canvasSize.height,
	},
	floor11: {
		y: 3 * canvasSize.height,
	},
	floor12: {
		y: 2 * canvasSize.height,
	},
	floor13: {
		y: 0,
	},
}

function launchRound() {
	let activeFloor = 1

	const leftStairCaseDoorHandler = () => {
		console.log('--Active floor: ', {activeFloor})
	}

	const rightStairCaseDoorHandler = () => {
		console.log('--Active floor: ', {activeFloor})
	}

	const floor1Handlers= {
		handlers: {
			leftStairCaseDoorHandler,
			rightStairCaseDoorHandler,
		},
	}

	const floor1 = initFloor1(canvasSize, floorCameraPoints)(floor1Handlers)
	const floor2 = initFloor2(canvasSize, floorCameraPoints)(floor1Handlers)

	let loop = GameLoop({
		update() {
			floor1.update()
			floor2.update()
		},
		render() {
			floor1.render()
			floor2.render()
		}
	});

	loop.start();
}

launchRound()