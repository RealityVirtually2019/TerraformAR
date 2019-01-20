AFRAME.registerComponent('compass-rotation', {

	lookControls: null,
	lastTimestamp: 0,
	heading: null,


	schema: {
		fixTime: {
			type: 'int',
			default: 2000
		},
		orientationEvent: {
			type: 'string',
			default: 'auto'
		}
	},

	init: function () {

		if (typeof (this.el.components['look-controls']) == 'undefined') return;

		this.lookControls = this.el.components['look-controls'];

		this.handlerOrientation = this.handlerOrientation.bind(this);

		if (this.data.orientationEvent == 'auto') {
			if ('ondeviceorientationabsolute' in window) {
				this.data.orientationEvent = 'deviceorientationabsolute';
			} else if ('ondeviceorientation' in window) {
				this.data.orientationEvent = 'deviceorientation';
			} else {
				this.data.orientationEvent = '';
				alert('Compass not supported');
				return;
			}
		}

		window.addEventListener(this.data.orientationEvent, this.handlerOrientation, false);

		window.addEventListener('compassneedscalibration', function (event) {
			alert('Your compass needs calibrating! Wave your device in a figure-eight motion');
			event.preventDefault();
		}, true);

	},

	tick: function (time, timeDelta) {

		if (this.heading === null ||
			this.lastTimestamp > (time - this.data.fixTime)) return;

		this.lastTimestamp = time;
		this.updateRotation();

	},

	calcCompassHeading: function (alpha, beta, gamma) {

		// Convert degrees to radians
		var alphaRad = alpha * (Math.PI / 180);
		var betaRad = beta * (Math.PI / 180);
		var gammaRad = gamma * (Math.PI / 180);

		// Calculate equation components
		var cA = Math.cos(alphaRad);
		var sA = Math.sin(alphaRad);
		var cB = Math.cos(betaRad);
		var sB = Math.sin(betaRad);
		var cG = Math.cos(gammaRad);
		var sG = Math.sin(gammaRad);

		// Calculate A, B, C rotation components
		var rA = -cA * sG - sA * sB * cG;
		var rB = -sA * sG + cA * sB * cG;
		var rC = -cB * cG;

		// Calculate compass heading
		var compassHeading = Math.atan(rA / rB);

		// Convert from half unit circle to whole unit circle
		if (rB < 0) {
			compassHeading += Math.PI;
		} else if (rA < 0) {
			compassHeading += 2 * Math.PI;
		}

		// Convert radians to degrees
		compassHeading *= 180 / Math.PI;

		return compassHeading;
	},

	handlerOrientation: function (evt) {

		var heading = null;

		//console.log('device orientation event', evt);

		if (typeof (evt.webkitCompassHeading) != 'undefined') {

			if (evt.webkitCompassAccuracy < 50) {
				heading = evt.webkitCompassHeading;
			} else {
				console.warn('webkitCompassAccuracy is evt.webkitCompassAccuracy');
			}

		} else if (evt.alpha !== null) {
			if (evt.absolute === true || typeof (evt.absolute == 'undefined')) {
				heading = this.calcCompassHeading(evt.alpha, evt.beta, evt.gamma);
			} else {
				console.warn('evt.absolute === false');
			}
		} else {
			console.warn('evt.alpha === null');
		}

		this.heading = heading;

	},

	updateRotation: function () {

		/*
		camera.components["look-controls"].yawObject.rotation.y = THREE.Math.degToRad(
			(
				360
				- camera.components["compass-rotation"].heading
				- (
					camera.getAttribute('rotation').y
					- THREE.Math.radToDeg(camera.components["look-controls"].yawObject.rotation.y)
				)
			)
			% 360
		)
		*/


		var heading = 360 - this.heading
		var camera_rotation = this.el.getAttribute('rotation').y;
		var yaw_rotation = THREE.Math.radToDeg(this.lookControls.yawObject.rotation.y);

		var offset = (heading - (camera_rotation - yaw_rotation)) % 360;

		this.lookControls.yawObject.rotation.y = THREE.Math.degToRad(offset);

	},

	remove: function () {
		if (this.data.orientationEvent)
			window.removeEventListener(this.data.orientationEvent, this.handlerOrientation, false);
	}

});