import {Button, pointerPressed, Sprite, Text} from 'kontra'

export const images = {
	arrowUp: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAACXBIWXMAAAbJAAAGyQGh53xXAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAJ1JREFUGNONkD0KwmAQRN9ugiTgFWwliKUSolVO4hmsbGy8STyDF7DLj2iZe4hgZb610RDBoNsNvJlhVsyMX6ddIaBxUa2mdT3oheZluQbLhtfb9sP8rpvleeSJXoAQeDhzy1OSVG1Sejz6nmj2AgB8T3S/yPOwhe5BsAHiboVB1KjuACQuiokZZyD4MsyZ09Q3J2PUDv37m5H886cnsN8yl97LyDoAAAAASUVORK5CYII=',
	arrowDown: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAACXBIWXMAAAbJAAAGyQGh53xXAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAJpJREFUGNONkLEOAVEQRc9MNiH8y5b73jb+Qq8XpcYH8AEapU4j8QNaYlel16uUgsi+UZCNTVaY+uTce0fMjF8XuW2eoqHzDVDIItPQFmQCSB1kQldz79cgs1qNsNg5t1SAW6s5BI5VBSdEBu9IOMTxJWA9oPjQ9LMkOZcQwN77jQnTVwrzLE1W5brK1BBGherjfm2MK9X++dMTkT8s5B1wNg4AAAAASUVORK5CYII=',
}

export const imageSizes = {
	door: {
		width: 45,
		height: 122
	},
	elevatorFrame: {
		width: 95,
		height: 137,
	},
	doorBlink: {
		width: 45,
		height: 122,
	},
	doorBlink2: {
		width: 100,
		height: 100,
	},
	doorJam: {
		width: 91,
		height: 5,
	},
	floorShadow: {
		width: 102,
		height: 46,
	},
	indicator: {
		width: 19,
		height: 6,
	}
}

export const elevatorDoor  = (onDown) => (x, y) => {
	return Sprite({
		x,
		y,
		width: imageSizes.door.width,
		height: imageSizes.door.height,
		color: 'rgb(70,203,204)',
		onDown,
	})
}

const elevatorDoorLeft = (x, y) => elevatorDoor()(x + 2, y + 10)
const elevatorDoorRight = (x, y) => elevatorDoor()(x + imageSizes.door.width + 3, y + 10)

export const wallSprite = (canvasSize, {x, y} = {x: 0, y: 0}) => (color = 'rgb(34,89,131)') => {
	return Sprite({
		x,
		y,
		width: canvasSize.width,
		height: 2 * canvasSize.height / 3,
		color,
	})
}

export const elevatorFrame = (x, y) => {
	return Sprite({
		x,
		y,
		width: imageSizes.elevatorFrame.width,
		height: imageSizes.elevatorFrame.height,
		color: 'rgb(52,125,158)',
	})
}

export const floorSprite = (canvasSize, { x, y } = { x:0, y: 0 }) => {
	return Sprite({
		x: x,
		y: y * canvasSize.height / 3,
		width: canvasSize.width,
		height: canvasSize.height / 3,
		color: 'rgb(1,16,49)',
	})
}

export const stairCaseDoor = (track, clickHandler) => (x, y) => {
	const door = elevatorFrame(x, y)
	const leftDoor = elevatorDoor(clickHandler)(x + 2, y + 3)
	const rightDoor = elevatorDoor(clickHandler)(x + imageSizes.door.width + 3, y + 3)

	track(leftDoor)
	track(rightDoor)

	leftDoor.color = 'rgb(0,0,0)'
	rightDoor.color = 'rgb(0,0,0)'

	leftDoor.width = leftDoor.width + 4
	leftDoor.height = leftDoor.height + 12
	rightDoor.height = rightDoor.height + 12


	return {
		group: [door, leftDoor, rightDoor],
		update() {
			door.update()
			leftDoor.update()
			rightDoor.update()
		},
		render() {
			door.render()
			leftDoor.render()
			rightDoor.render()
		},
	}
}

export const createStaticBackground = (canvasSize, color, xyCoords) => {
	const backGroundWall = wallSprite(canvasSize, xyCoords)(color)
	const backGroundFloor = floorSprite(canvasSize, xyCoords)

	return {
		group: [backGroundWall, backGroundFloor],
		update() {
			backGroundWall.update()
			backGroundFloor.update()
		},
		render() {
			backGroundWall.render()
			backGroundFloor.render()
		},
	}
}

export const wallText = (x, y, text, color = 'rgb(255, 255, 255)', size= 40) => {
	const textSprite = Text({
		text,
		font: `${size}px Arial`,
		color,
		x,
		y,
	});

	textSprite.x = textSprite.x - textSprite.width / 2
	textSprite.y = textSprite.y - textSprite.height / 2

	return textSprite
}

const elevatorButton = (context) => (x, y) => {
	const buttonSprite = Sprite({
		x,
		y,
		width: 25,
		height: 40,
	})

	buttonSprite.render = function() {
		context.fillStyle = 'rgba(52,125,158)'
		context.fillRect(this.x, this.y, this.width, this.height)

		context.strokeStyle = 'rgb(54,199,200)'
		context.lineWidth = 1
		context.strokeRect(this.x+2, this.y+2, this.width-4, this.height-4)

		context.stroke()
	}

	return buttonSprite
}

const triangleUp = (context, state) => (x, y) => {
	const triangleSprite = Sprite({
		x,
		y,
		width: 25,
		height: 25,
		image: new Image(),
	})

	triangleSprite.image.src = images.arrowUp

	return triangleSprite
}

const triangleDown = (context, state) => (x, y) => {
	const triangleSprite = Sprite({
		x,
		y,
		width: 25,
		height: 25,
		image: new Image(),
	})

	triangleSprite.image.src = images.arrowDown

	return triangleSprite
}

const floorIndicator = (context, state) => (x, y) => {
	const indicatorSprite = Sprite({
		x,
		y,
		width: 30,
		height: 15,
	})

	const textSprite = Text({
		text: '',
		font: `11px Arial`,
		color: 'rgb(255,0,0)',
		x,
		y,
	})

	indicatorSprite.render = function() {
		context.fillStyle = 'rgba(0, 0, 0)'
		context.fillRect(this.x, this.y, this.width, this.height)

		context.stroke()
		textSprite.render()
	}

	indicatorSprite.update = function() {
		textSprite.text = state.currentFloor
		textSprite.x = indicatorSprite.x + indicatorSprite.width / 2 - textSprite.width / 2
		textSprite.y = indicatorSprite.y + 3
		textSprite.update()
	}

	return indicatorSprite
}

export const elevator = (track, context, handler, state, pointer, yAxisShift, gameContext, floorNumber, gameElementsState) => (x, y) => {
	const frame = elevatorFrame(x, y)
	const elevatorButtonSprite = elevatorButton(context)(frame.x + frame.width + 2, frame.y + frame.height / 2 - 20)
	const triangleUpSprite= triangleUp(context, state)(elevatorButtonSprite.x+8, elevatorButtonSprite.y+7)
	const triangleDownSprite= triangleDown(context, state)(elevatorButtonSprite.x+8, elevatorButtonSprite.y+25)

	const leftDoor = elevatorDoorLeft(x, y)
	const rightDoor = elevatorDoorRight(x, y)

	track(triangleUpSprite, triangleDownSprite, frame)

	frame.onDown = () => {
		if (state.isOpen && !state.isClosing && gameContext.activeFloor === state.currentFloor) {
			state.isShowingFloorSelector = true
		}
	}

	const group = [
		frame,
		leftDoor,
		rightDoor,
		elevatorButtonSprite,
		triangleDownSprite,
		triangleUpSprite,
		floorIndicator(context, state)(frame.x + frame.width / 2 - 15, frame.y - 6),
	]

	return {
		group,
		update(diffTime) {
			group.map(sprite => sprite.update())
			const distanceTopArrow = Math.sqrt(
				(triangleUpSprite.x - (pointer.x - 15)) ** 2 + (triangleUpSprite.y - (pointer.y - 15) - yAxisShift) ** 2
			)

			const distanceBottomArrow = Math.sqrt(
				(triangleDownSprite.x - (pointer.x - 15)) ** 2 + (triangleDownSprite.y - (pointer.y - 15) - yAxisShift) ** 2
			)

			const isItemPlaced = Object.values(gameElementsState).find(({ picked, placedToHole, elevatorPlaced }) => picked && placedToHole && elevatorPlaced === state.id)

			const shouldOpenDoors = state.stopFloors?.[isItemPlaced?.type]?.includes(gameContext.activeFloor)
				|| state.stopFloors.default.includes(gameContext.activeFloor)
				|| state.stopFloors.unblockedFloors.includes(gameContext.activeFloor)

			if ((distanceTopArrow < 15 || distanceBottomArrow < 15)  && pointerPressed('left') && !state.isOpen && !state.isClosing && !state.isMoving) {
				state.targetFloor = gameContext.activeFloor
				state.isMoving = state.targetFloor !== state.currentFloor
				state.isMovingUp = state.targetFloor > state.currentFloor
				state.isMovingDown = state.targetFloor < state.currentFloor
				state.shouldOpen = shouldOpenDoors
				state.isShowingFloorSelector = false
			}

			if (state.isOpening && state.currentFloor === floorNumber) {
				if (leftDoor.x > x - leftDoor.width + 13) {
					leftDoor.x = leftDoor.x - 0.5
				}
				if (rightDoor.x < x + frame.width - 13) {
					rightDoor.x = rightDoor.x + 0.5
				}
				if (!(leftDoor.x > x - leftDoor.width + 13) && !(rightDoor.x < x + frame.width - 13)) {
					state.isOpening = false
					state.isOpen = true
					state.shouldOpen = false
					state.autoClose = 30
				}
			}

			if (state.isClosing && state.currentFloor === floorNumber) {
				if (leftDoor.x < frame.x + 2) {
					leftDoor.x = leftDoor.x + 0.6
				}
				if (rightDoor.x > frame.x + frame.width / 2 + 1) {
					rightDoor.x = rightDoor.x - 0.6
				}

				if (leftDoor.x > frame.x + 2 && rightDoor.x <= frame.x + frame.width / 2 + 1) {
					state.isClosing = false
					state.isOpen = false
					state.isMoving = state.targetFloor !== state.currentFloor
					state.isMovingUp = state.targetFloor > state.currentFloor
					state.isMovingDown = state.targetFloor < state.currentFloor
					state.isShowingFloorSelector = false
					state.autoClose = null
				}
			}

			if (state.autoClose !== null && state.isOpen && !state.isClosing && !state.isShowingFloorSelector) {
				state.autoClose = state.autoClose - diffTime
			}

			if (state.autoClose <= 0 && state.autoClose !== null) {
				state.autoClose = null
				state.isClosing = true
				state.shouldOpen = false
			}
		},
		render() {
			group.map(sprite => sprite.render())
		},
	}
}

export const closedDoorStairCase = (track, onDown) => (x, y) => {
	const doorSprite =  Sprite({
		x,
		y,
		width: imageSizes.door.width * 2,
		height: imageSizes.door.height,
		color: 'rgb(105,66,0)',
		onDown,
	})

	track(doorSprite)

	return doorSprite
}

export const artefactSprite = (itemState, context, type, color) => {
	const sprite = Sprite({
		type: type,
		x: itemState.x,
		y: itemState.y,
		width: 30,
		height: 30,
		radius: 30,
		color,
	})

	sprite.render = function () {

		if (type === 'key') {
			context.fillStyle = '#FFD700'; // Gold color
			context.fillRect(this.x + 4, this.y + 14, 8, 18); // Shaft of the key (longer)
			context.beginPath();
			context.arc(this.x+8, this.y+12, 6, 0, Math.PI * 2); // Head of the key (larger circle)
			context.fill();
			context.fillStyle = '#DAA520'; // Darker gold for keyhole
			context.beginPath();
			context.arc(this.x + 8, this.y + 12, 3, 0, Math.PI * 2); // Smaller circle for keyhole
			context.fill();
			context.strokeStyle = 'black';
			context.lineWidth = 1;
			context.stroke();
		} else if (type === 'lock') {
			context.fillStyle = 'rgb(25,210,255)';
			context.fillRect(this.x, this.y + 8, this.width, this.height - 10);
			context.beginPath();
			context.moveTo(this.x + this.width / 4, this.y + 8); // Left side of shackle
			context.lineTo(this.x + this.width / 4, this.y - 8); // Top of shackle
			context.lineTo(this.x + (3 * this.width) / 4, this.y - 8); // Right side of shackle
			context.lineTo(this.x + (3 * this.width) / 4, this.y + 8); // Back to body
			context.strokeStyle = 'black';
			context.lineWidth = 5;
			context.stroke();
		} else {
			context.fillStyle = this.color;
			context.beginPath();
			context.moveTo(this.x + this.width / 2, this.y);  // Top point
			context.lineTo(this.x, this.y + this.height / 3);  // Left upper point
			context.lineTo(this.x + this.width / 4, this.y + this.height);  // Left bottom point
			context.lineTo(this.x + (3 * this.width) / 4, this.y + this.height);  // Right bottom point
			context.lineTo(this.x + this.width, this.y + this.height / 3);  // Right upper point
			context.closePath();
			context.fill();
		}
	}

	if (type !== 'lock') {
		sprite.update = function() {
			if (itemState.isDragging) {
				this.x = itemState.x
				this.y = itemState.y
			} else {
				if (itemState.isPicked) {
					this.x = itemState.x
					this.y = itemState.y
				}

				if (!itemState.isPicked) {
					this.x = itemState.x
					this.y = (itemState.currentFloor - 1) * 600 + itemState.y
				}
			}
		}
	}

	return sprite
}

export const diamonds = (itemState, context, track) => [
	'yellow-gem',
	'diamond',
	'red-gem',
	'yellow-diamond',
	'orange-diamond',
	'emerald',
	'red-diamond',
	'green-diamond',
	'key',
	'lock',
].map(id => {
	const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
	const artefact = artefactSprite(itemState[id], context, id, color)

	track(artefact)

	return { item: artefact, type: id }
})

export const gemSprite = (itemState, context) => (track) => () => {
	const sprite = Sprite({
		type: 'yellow-gem',
		x: itemState.x,
		y: itemState.y,
		width: 30,
		height: 30,
		radius: 30,
		color: 'rgb(255,255,0)',
	})

	sprite.render = function () {
		context.fillStyle = this.color;
		context.beginPath();
		context.moveTo(this.x + this.width / 2, this.y);  // Top point
		context.lineTo(this.x, this.y + this.height / 3);  // Left upper point
		context.lineTo(this.x + this.width / 4, this.y + this.height);  // Left bottom point
		context.lineTo(this.x + (3 * this.width) / 4, this.y + this.height);  // Right bottom point
		context.lineTo(this.x + this.width, this.y + this.height / 3);  // Right upper point
		context.closePath();
		context.fill();
	}

	track(sprite)

	sprite.update = function() {
		if (itemState.isDragging) {
			this.x = itemState.x
			this.y = itemState.y
		} else {
			if (itemState.isPicked) {
				this.x = itemState.x
				this.y = itemState.y
			}

			if (!itemState.isPicked) {
				this.x = itemState.x
				this.y = (itemState.currentFloor - 1) * 600 + itemState.y
			}
		}
	}

	return sprite
}

export const elevatorFloorSelector = (context, state, gameContext, canvasSize, gameElementsState, slotCoordinates) => () => {
	const shadowDrop = Sprite({
		x: 0,
		y: 0,
		width: canvasSize.width,
		height: canvasSize.height,
		color: 'rgba(0,0,0,0.55)',
	})

	const dashboardPlate = Sprite({
		x: shadowDrop.width / 2 - 150,
		y: shadowDrop.height / 2 - 250,
		width: 300,
		height: 500,
		color: 'rgba(52,125,158)',
	})

	const buttons = [1,2,3,4,5,6,7,8,9,10,11,12,13].map(
		floorNumber => {
			let button = Button({
				id: floorNumber,
				isEnabled: false,
				x: dashboardPlate.x + 68 + (floorNumber - 1) % 3 * 85,
				y: dashboardPlate.y + 80 + Math.floor((floorNumber - 1) / 3)  * 55,
				width: 70,
				height: 30,
				anchor: {x: 0.5, y: 0.5},
				color: 'rgb(0,104,148)',

				// text properties
				text: {
					text: floorNumber,
					color: 'white',
					font: '20px Arial, sans-serif',
					anchor: {x: 0.5, y: 0.5}
				},

				// pointer events
				onDown() {
					this.y += 3;
				},
				onUp() {
					this.y -= 3;

					if (this.isEnabled) {
						const activeState = Object.values(state).find(({ isShowingFloorSelector }) => isShowingFloorSelector)
						if (activeState.currentFloor !== floorNumber) {
							activeState.isShowingFloorSelector = false
							activeState.targetFloor = floorNumber
							activeState.isClosing = true
							activeState.isMovingUser = true
							activeState.shouldOpen = true
							activeState.autClose = null
						}
					}
				}
			});

			return button
		}
	)

	const exitButton = Button({
		x: dashboardPlate.x + dashboardPlate.width / 2,
		y: dashboardPlate.y + dashboardPlate.height - 40,
		width: 90,
		height: 40,
		anchor: {x: 0.5, y: 0.5},
		color: 'rgb(255,175,51)',

		text: {
			text: 'EXIT',
			color: 'black',
			font: '20px Arial, sans-serif',
			anchor: {x: 0.5, y: 0.5}
		},

		onDown() {
			this.y += 3;
			Object.values(gameElementsState).filter(({ picked }) => picked).forEach(({ type, slotNumber, x, y, ...rest }) => {
				gameElementsState[type] = {
					slotNumber,
					x: slotCoordinates[`slot${slotNumber}`].x0 + 9,
					y: slotCoordinates[`slot${slotNumber}`].y0 + 9,
					...rest,
					picked: true,
					isDragging: false,
					placedToHole: false,
					elevatorPlaced: null,
				}
			})
		},
		onUp() {
			this.y -= 3;

			const activeState = Object.values(state).find(({ isShowingFloorSelector }) => isShowingFloorSelector)
			activeState.isShowingFloorSelector = false
			activeState.autoClose = 30
		}
	})

	buttons.push(exitButton)

	const itemHole = Button({
		x: dashboardPlate.x + dashboardPlate.width / 2 - 50,
		y: dashboardPlate.y + dashboardPlate.height - 180,
		width: 100,
		height: 100,
		radius: 30,
		color: 'rgb(255,255,198)',
	})

	itemHole.render = function() {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius, 0, Math.PI * 2);
		context.fill();
		context.globalCompositeOperation = 'destination-out';  // Erase part of the shape
		context.beginPath();
		context.arc(this.x + this.width / 2, this.y + this.height / 2, this.radius-5, 0, Math.PI * 2);
		context.fill();
		context.globalCompositeOperation = 'source-over';
	}

	const spriteGroup = [shadowDrop, dashboardPlate, ...buttons, itemHole]

	return {
		group: spriteGroup,
		update: () => {
			const activatedElevatorState = Object.values(state).find(({ isShowingFloorSelector }) => isShowingFloorSelector)

			activatedElevatorState?.stopFloors?.default?.forEach((allowedFloor) => {
				const buttonToEnable = buttons.find(({id}) => id === allowedFloor)
				buttonToEnable.isEnabled = true
				buttonToEnable.color = 'rgb(37,148,0)'
			})

			activatedElevatorState?.stopFloors?.unblockedFloors?.forEach((allowedFloor) => {
				const buttonToEnable = buttons.find(({id}) => id === allowedFloor)
				if (buttonToEnable) {
					buttonToEnable.color = 'rgb(37,148,0)'
					buttonToEnable.isEnabled = true

				}
			})

			spriteGroup.map(sprite => sprite.update())
		},
		render: () => {
			spriteGroup.map(sprite => sprite.render())
		}
	}
}
