AFRAME.registerComponent('gps-position', {

	watchId: null,
	zeroCrd: null,
	crd: null,

	schema: {
		accuracy: {
			type: 'int',
			default: 100
		},
		'zero-crd-latitude': {
			type: 'number',
			default: NaN
		},
		'zero-crd-longitude': {
			type: 'number',
			default: NaN
		}
	},

	init: function () {

		if (!isNaN(this.data['zero-crd-latitude']) && !isNaN(this.data['zero-crd-longitude'])) {
			this.zeroCrd = {
				latitude: this.data['zero-crd-latitude'],
				longitude: this.data['zero-crd-longitude']
			};
		}

		this.watchId = this.watchGPS(function (position) {
			this.crd = position.coords;
			this.updatePosition();
		}.bind(this));

	},

	watchGPS: function (success, error) {

		if (typeof (error) == 'undefined')
			error = function (err) {
				console.warn('ERROR(' + err.code + '): ' + err.message);
			};

		if (!("geolocation" in navigator)) {
			error({
				code: 0,
				message: 'Geolocation is not supported by your browser'
			});
			return;
		}

		return navigator.geolocation.watchPosition(success, error, {
			enableHighAccuracy: true,
			maximumAge: 0,
			timeout: 27000
		});
	},

	updatePosition: function () {

		if (this.crd.accuracy > this.data.accuracy) return;

		if (!this.zeroCrd) this.zeroCrd = this.crd;

		var p = this.el.getAttribute('position');

		p.x = this.calcMeters(
			this.zeroCrd, {
				longitude: this.crd.longitude,
				latitude: this.zeroCrd.latitude
			}
		) * (
			this.crd.longitude > this.zeroCrd.longitude ?
			1 : -1
		);
		p.z = this.calcMeters(
			this.zeroCrd, {
				longitude: this.zeroCrd.longitude,
				latitude: this.crd.latitude
			}
		) * (
			this.crd.latitude > this.zeroCrd.latitude ?
			-1 : 1
		);

		this.el.setAttribute('position', p);

	},

	calcMeters: function (src, dest) {
		var dlon = THREE.Math.degToRad(dest.longitude - src.longitude);
		var dlat = THREE.Math.degToRad(dest.latitude - src.latitude);

		var a = (Math.sin(dlat / 2) * Math.sin(dlat / 2)) + Math.cos(THREE.Math.degToRad(src.latitude)) * Math.cos(THREE.Math.degToRad(dest.latitude)) * (Math.sin(dlon / 2) * Math.sin(dlon / 2));
		var angle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return angle * 6378160;
	},

	remove: function () {
		if (this.watchId) navigator.geolocation.clearWatch(this.watchId);
		this.watchId = null;
	}

});