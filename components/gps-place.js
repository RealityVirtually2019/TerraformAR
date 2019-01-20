AFRAME.registerComponent('gps-place', {

	cameraGpsPosition: null,
	deferredInitInterval: 0,

	schema: {
		latitude: {
			type: 'number',
			default: 0
		},
		longitude: {
			type: 'number',
			default: 0
		},
		cameraSelector: {
			type: 'string',
			default: 'a-camera, [camera]'
		}
	},

	init: function () {
		if (this.deferredInit()) return;
		this.deferredInitInterval = setInterval(this.deferredInit.bind(this), 1000);
	},

	deferredInit: function () {

		if (!this.cameraGpsPosition) {
			var camera = document.querySelector(this.data.cameraSelector);
			if (typeof (camera.components['gps-position']) == 'undefined') return;
			this.cameraGpsPosition = camera.components['gps-position'];
		}

		if (!this.cameraGpsPosition.zeroCrd) return;

		this.updatePosition();

		clearInterval(this.deferredInitInterval);
		this.deferredInitInterval = 0;

		return true;
	},

	updatePosition: function () {

		var p = {
			x: 0,
			y: 0,
			z: 0
		};

		p.x = this.cameraGpsPosition.calcMeters(
			this.cameraGpsPosition.zeroCrd, {
				longitude: this.data.longitude,
				latitude: this.cameraGpsPosition.zeroCrd.latitude
			}
		) * (
			this.data.longitude > this.cameraGpsPosition.zeroCrd.longitude ?
			1 : -1
		);
		p.z = this.cameraGpsPosition.calcMeters(
			this.cameraGpsPosition.zeroCrd, {
				longitude: this.cameraGpsPosition.zeroCrd.longitude,
				latitude: this.data.latitude
			}
		) * (
			this.data.latitude > this.cameraGpsPosition.zeroCrd.latitude ?
			-1 : 1
		);

		this.el.setAttribute('position', p);

	}


});