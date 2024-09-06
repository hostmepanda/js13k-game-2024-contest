import {Sprite} from 'kontra'

export const images = {
	backgroundElevator: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAACJCAYAAABKK+THAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAPZJREFUeNrt0jEVgEAQQ8HcPqSABFrMIAMroAwvHAUejma+hEnaepzbU3W2ZImG1JO7p+1Tr7paMiMZ13f0flXA/zZAYfgv+PDhCz58wYcv+PAFH77gwxd8+IIPX/DhCz58wYcPX/DhCz58wYcv+PAFH77gwxd8+IIPX/DhCz58+IIPX/DhCz58wYcv+PAFH77gwxd8+IIPX/Dhwxd8+IIPX/DhCz58wYcv+PAFH77gwxd8+IIPX/Dhwxd8+IIPX/DhCz58wYcv+PAFH77gwxd8+IIPH77gwxd8+IIPX/DhCz58wYcv+PAFH77gwxd8+PAFH76G9QJzEwtwN8E2FQAAAABJRU5ErkJggg==',
	doorBlink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAABRCAYAAACkJjRZAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAn9JREFUaN7VmN2OgjAQRj+7ulr3Yt//QaXg8rM3kDTNFEpnpq2TmCgRcjxOy8dclmUBo34B3IJjDsDL+/wDwIJXf4Zx8pWABIDee28APMCvjgP6JI4NACbvswVwYUK+OUavAL6J407D5naxnLKRXz4K2xy2a+aAfgG4x375WhdJm7mgKTafQjanXFATsek0beaAUn33t74ke7MPdo9ToDFTYW9yN/cltHkWlDI1Ktmcc0FL2nSxxZFSd+K747raJW06yuYZUFvTZirofd3k/ZqUbC4c0BI25z2bKaDfawAJbQ4lbaaApth8CNjsU26JsboRwZiyaZig3ZHNI1Bb4J4+pdjcA6WCcfgXPYRsggNaYqWHbXQalArGc3DRojZjoPZg+5CwOZ6xSYFSwXip2ZsxUGrz1rD55oBS200YFCRsvnJOMoVtho8tp0FjNqv3ZghKBWP/kUDC5jvXpg9qD3rzXtOmvx19HTxgPaVGMxxQW2Cld8zzYYhgPAQ2rYDNSQJ0L8o9iLYobhORlT4J2uwlbFKgkjYXKZsh6KBgc9YA7YRtOgiWUbLpJG36oO5gMlLV5gZKjbVVhwm5oJ2gzVnD5gbavM1w1UvY7KFURtBmp2UzDM4cm5Omzb3gXCV4pATna6nRjGRwbs5mLDirjmYkg3NzNrmgWaOZGqAvFKxc0OzRTGnQDoUrB/Rd2mYuaHGbOaDs0Uwp0Co2z4KKjGZKgFazeQa0r2kzFXSpbTMVVHQ0owWqMkzQAHUt2DwCbcbmEajaMEESdG7J5h5oUzZjoKqjGUnQrjWbFOjUok0KtEOjZQKbwyeANmvTBx1btumDNm1zAy06muGAvvAB9Q9jodHvy+jl0QAAAABJRU5ErkJggg==',
	doorBlink2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAABICAYAAAB1Aey6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAo1JREFUaN7NmV17gyAMRqOtnc7//0+Hc/2Yu4E9aSRIIAhctd7sLG3e42u7bdug0TP00O6ZW4X7AIBrq3CfAAAtwk0AcGkRrrNw0CLchJi2luB6PDUA+O4bW4LOvv5tCe4CACN6v7T0sc7o9QsA1lYW4goAN/TeuOt9Y1N7AMC9FX3dAGAg3zWnr+rix1P7sZNrQl+j0xSZ2lhbX52bjgtcu6Vv12vBvWnKwtHrVeB2mrJGoNerwE1UUx59VYHzaspzvQocns6/pkikVIG72nClmhqIvqrAsZoKbc4pHTSgqWttuKCmasLR6Sy0ZdWEw9NZfZqqBYens6Gp7QL3bLiO0ZQ3cM+GwxIPaupsOCpxpykaxKFTrH2JNMWcIr2VfqcM0xdCp1ipFmvKc0yJj5V20IXpC6HztBZRXwifpqIC1/M1UIXjOugk+DvYu6pws0dTu14Qig70D6nCjTmaIvVQFc7XQUWaIgZRheM0JYkOZxBVuJCmboLoWEu4dVLQlCkhfg1NvUWHJhzexFRNLSVumeitT4qmdtGhBZerqd+jqaXCDQqa8kaHBlyuptjoyIXDHTRVU0YSoqkdNEVT91B05MDhDpqqKSOZRCxcx2hqEGjqMDpS4fAmpmhqi4mOFDi6iYZ5QHNYWErA4U18Ik3FBu4rNjqkcJzcDx9fpS6BBG72xIBEU3c0aVU47nfQIoErheM0NZaKjlg4fMOIY2COnFpSdMTCzR5NSR5fLSnREQM3Zmrq5at5GnB0E90EJL3AgNLpIzUVGx2PnOgIwXGaGgWa+tJ8ZNUzHdRpShK4a250cHAhTfVnRQcHh1PfaUrSCxa72epw3O+gsZpKvuuIgfNpqhNoKuleLeb8AYGiu58lJMT3AAAAAElFTkSuQmCC',
	doorJam: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAFCAYAAAAqspAeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAACBJREFUOMtjZBA08mEYBXQBTKNBMBrYo4E9CkYDe8gAACSJAJmHmlbyAAAAAElFTkSuQmCC',
	elevatorDoor: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAB6CAYAAAArkdrVAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAHhJREFUeNrtzjENADAIADCGqPn/NleggZOkVdBz369YJmMhaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWnpqQYIjgO4DQhtXgAAAABJRU5ErkJggg==',
	floorShadow: 'data:image/png;base64,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',
	indicator: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAGCAYAAAAhS6XkAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAD5JREFUGNNjZOQ3fM7AyCDBQCn4z/CCiSoGMTAwMDAySDAxUBFQ2TAmKpnHxMTAqDl78Y//v/+yUxxkLMw/AfcXCcvXheahAAAAAElFTkSuQmCC',
}

export const imageSizes = {
	door: {
		width: 45,
		height: 122
	},
	background: {
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

export const backgroundElevatorSprite  = (x, y) => {
	const sprite = Sprite({
		x,
		y,
		image: new Image(),
	})

	sprite.image.src = images.backgroundElevator

	return sprite
}

export const elevatorDoor  = (x, y) => {
	const sprite = Sprite({
		x,
		y,
		image: new Image(),
	})

	sprite.image.src = images.elevatorDoor

	return sprite
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

export const elevator = (x, y) => {
	const background = backgroundElevatorSprite(x, y)

	return [
		background,
		elevatorDoor(background.x + imageSizes.door.width / 2 - 20, y + 10),
		elevatorDoor(background.x + imageSizes.door.width + 3 , y + 10),
		doorBlinkTop(background.x - imageSizes.door.width + 3 + imageSizes.doorBlink.width , y + 10),
		doorBlinkTop(background.x + imageSizes.door.width + 3 , y + 10),
		doorBlinkBottom(background.x + imageSizes.door.width - imageSizes.doorBlink.width + 8 , y + imageSizes.door.height - imageSizes.doorBlink2.height / 2 - 12),
		doorBlinkBottom(background.x + imageSizes.doorBlink.width + 8 , y + imageSizes.door.height - imageSizes.doorBlink2.height / 2 - 12),
	]
}