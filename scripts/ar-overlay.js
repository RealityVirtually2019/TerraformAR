window.onload = function(){
	
	var camera = document.getElementById('camera');
	
	camera.addEventListener('componentchanged', function (evt) {
			switch(evt.detail.name){
			case 'rotation':
				//console.log('camera rotation changed', evt.detail.newData);
				var compassRotation = camera.components['compass-rotation'];
				var lookControls = camera.components['look-controls'];
				document.querySelector('#camera_angle').innerText = evt.detail.y;
				if(lookControls){
					document.querySelector('#yaw_angle').innerText = THREE.Math.radToDeg(lookControls.yawObject.rotation.y);
				}
				if(compassRotation){
					document.querySelector('#compass_heading').innerText = compassRotation.heading;
				}
				break;
			case 'position':
				//console.log('camera position changed', evt.detail.newData);
				var gpsPosition = camera.components['gps-position'];
				document.querySelector('#camera_p_x').innerText = evt.detail.x;
				document.querySelector('#camera_p_z').innerText = evt.detail.z;
				if(gpsPosition){
					if(gpsPosition.crd){
						document.querySelector('#crd_longitude').innerText = gpsPosition.crd.longitude;
						document.querySelector('#crd_latitude').innerText = gpsPosition.crd.latitude;
					}
					if(gpsPosition.zeroCrd){
						document.querySelector('#zero_crd_longitude').innerText = gpsPosition.zeroCrd.longitude;
						document.querySelector('#zero_crd_latitude').innerText = gpsPosition.zeroCrd.latitude;
					}
				}
				
				break;
			}
		});
	
};
