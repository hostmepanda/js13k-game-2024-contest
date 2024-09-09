import { Sprite, Text, pointerPressed, pointerOver} from 'kontra'

export const images = {
	doorBlink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAABRCAYAAACkJjRZAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAn9JREFUaN7VmN2OgjAQRj+7ulr3Yt//QaXg8rM3kDTNFEpnpq2TmCgRcjxOy8dclmUBo34B3IJjDsDL+/wDwIJXf4Zx8pWABIDee28APMCvjgP6JI4NACbvswVwYUK+OUavAL6J407D5naxnLKRXz4K2xy2a+aAfgG4x375WhdJm7mgKTafQjanXFATsek0beaAUn33t74ke7MPdo9ToDFTYW9yN/cltHkWlDI1Ktmcc0FL2nSxxZFSd+K747raJW06yuYZUFvTZirofd3k/ZqUbC4c0BI25z2bKaDfawAJbQ4lbaaApth8CNjsU26JsboRwZiyaZig3ZHNI1Bb4J4+pdjcA6WCcfgXPYRsggNaYqWHbXQalArGc3DRojZjoPZg+5CwOZ6xSYFSwXip2ZsxUGrz1rD55oBS200YFCRsvnJOMoVtho8tp0FjNqv3ZghKBWP/kUDC5jvXpg9qD3rzXtOmvx19HTxgPaVGMxxQW2Cld8zzYYhgPAQ2rYDNSQJ0L8o9iLYobhORlT4J2uwlbFKgkjYXKZsh6KBgc9YA7YRtOgiWUbLpJG36oO5gMlLV5gZKjbVVhwm5oJ2gzVnD5gbavM1w1UvY7KFURtBmp2UzDM4cm5Omzb3gXCV4pATna6nRjGRwbs5mLDirjmYkg3NzNrmgWaOZGqAvFKxc0OzRTGnQDoUrB/Rd2mYuaHGbOaDs0Uwp0Co2z4KKjGZKgFazeQa0r2kzFXSpbTMVVHQ0owWqMkzQAHUt2DwCbcbmEajaMEESdG7J5h5oUzZjoKqjGUnQrjWbFOjUok0KtEOjZQKbwyeANmvTBx1btumDNm1zAy06muGAvvAB9Q9jodHvy+jl0QAAAABJRU5ErkJggg==',
	doorBlink2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAABICAYAAAB1Aey6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAo1JREFUaN7NmV17gyAMRqOtnc7//0+Hc/2Yu4E9aSRIIAhctd7sLG3e42u7bdug0TP00O6ZW4X7AIBrq3CfAAAtwk0AcGkRrrNw0CLchJi2luB6PDUA+O4bW4LOvv5tCe4CACN6v7T0sc7o9QsA1lYW4goAN/TeuOt9Y1N7AMC9FX3dAGAg3zWnr+rix1P7sZNrQl+j0xSZ2lhbX52bjgtcu6Vv12vBvWnKwtHrVeB2mrJGoNerwE1UUx59VYHzaspzvQocns6/pkikVIG72nClmhqIvqrAsZoKbc4pHTSgqWttuKCmasLR6Sy0ZdWEw9NZfZqqBYens6Gp7QL3bLiO0ZQ3cM+GwxIPaupsOCpxpykaxKFTrH2JNMWcIr2VfqcM0xdCp1ipFmvKc0yJj5V20IXpC6HztBZRXwifpqIC1/M1UIXjOugk+DvYu6pws0dTu14Qig70D6nCjTmaIvVQFc7XQUWaIgZRheM0JYkOZxBVuJCmboLoWEu4dVLQlCkhfg1NvUWHJhzexFRNLSVumeitT4qmdtGhBZerqd+jqaXCDQqa8kaHBlyuptjoyIXDHTRVU0YSoqkdNEVT91B05MDhDpqqKSOZRCxcx2hqEGjqMDpS4fAmpmhqi4mOFDi6iYZ5QHNYWErA4U18Ik3FBu4rNjqkcJzcDx9fpS6BBG72xIBEU3c0aVU47nfQIoErheM0NZaKjlg4fMOIY2COnFpSdMTCzR5NSR5fLSnREQM3Zmrq5at5GnB0E90EJL3AgNLpIzUVGx2PnOgIwXGaGgWa+tJ8ZNUzHdRpShK4a250cHAhTfVnRQcHh1PfaUrSCxa72epw3O+gsZpKvuuIgfNpqhNoKuleLeb8AYGiu58lJMT3AAAAAElFTkSuQmCC',
	doorJam: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAFCAYAAAAqspAeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAACBJREFUOMtjZBA08mEYBXQBTKNBMBrYo4E9CkYDe8gAACSJAJmHmlbyAAAAAElFTkSuQmCC',
	floorShadow: 'data:image/png;base64,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',
	indicator: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAGCAYAAAAhS6XkAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAD5JREFUGNNjZOQ3fM7AyCDBQCn4z/CCiSoGMTAwMDAySDAxUBFQ2TAmKpnHxMTAqDl78Y//v/+yUxxkLMw/AfcXCcvXheahAAAAAElFTkSuQmCC',
	yellowGem: 'data:image/png;base64,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',
	diamond: 'data:image/png;base64,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'
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

export const elevatorDoorLeft = (x, y) => {
	const elevatorDoorSprite = elevatorDoor()(x + 2, y + 10)

	return elevatorDoorSprite
}

export const elevatorDoorRight = (x, y) => {
	const elevatorDoorSprite = elevatorDoor()(x + imageSizes.door.width + 3, y + 10)

	return elevatorDoorSprite
}


export const doorBlinkTop = (x, y) => {
	const sprite = Sprite({
		x,
		y,
		image: new Image(),
	})

	sprite.image.src = images.doorBlink

	return sprite
}

export const doorBlinkBottom = (x, y) => {
	const sprite = Sprite({
		x,
		y,
		image: new Image(),
	})

	sprite.image.src = images.doorBlink2

	return sprite
}

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

export const elevator = (track, handler) => (x, y) => {
	const frame = elevatorFrame(x, y)
	const group = [
		frame,
		elevatorDoorLeft(x, y),
		elevatorDoorRight(x, y),
		// doorBlinkTop(background.x - imageSizes.door.width + 3 + imageSizes.doorBlink.width , y + 10),
		// doorBlinkTop(background.x + imageSizes.door.width + 3 , y + 10),
		// doorBlinkBottom(background.x + imageSizes.door.width - imageSizes.doorBlink.width + 8 , y + imageSizes.door.height - imageSizes.doorBlink2.height / 2 - 12),
		// doorBlinkBottom(background.x + imageSizes.doorBlink.width + 8 , y + imageSizes.door.height - imageSizes.doorBlink2.height / 2 - 12),
	]

	return {
		group,
		update() {
			group.map(sprite => sprite.update())
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

export const gemSprite = (itemState) => (track) => () => {
	const sprite = Sprite({
		type: 'yellow-gem',
		x: itemState.x,
		y: itemState.y,
		width: 50,
		height: 50,
		image: new Image(),
	})

	sprite.image.src = images.yellowGem

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

export const diamondSprite = (itemState) => (track) => () => {
	const sprite = Sprite({
		type: 'diamond',
		x: itemState.x,
		y: itemState.y,
		width: 50,
		height: 50,
		image: new Image(),
	})

	sprite.image.src = images.diamond

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
