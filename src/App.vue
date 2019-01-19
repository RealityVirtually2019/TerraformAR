<template>
	<a-scene embedded artoolkit='sourceType: webcam;'>
		
		<a-camera id="camera" user-height="1.6" gps-position compass-rotation></a-camera>
		
    <a-mapbox-terrain position="0 0.2 -0.4" ></a-mapbox-terrain>
  </a-scene>
</template>

<script>
export default {
    data() {
      return {
        test: []
      }
    },

    mounted () {
      document.body.addEventListener('renderstart', function (evt) {

      });

      document.body.addEventListener('enter-vr', function (evt) {

      });

      var camera = document.getElementById('camera');
	
      camera.addEventListener('componentchanged', function (evt) {
        switch(evt.detail.name){
          case 'rotation':
            //console.log('camera rotation changed', evt.detail.newData);
            var compassRotation = camera.components['compass-rotation'];
            var lookControls = camera.components['look-controls'];
            camera_angle.innerText = evt.detail.newData.y;
            if(lookControls){
              yaw_angle.innerText = THREE.Math.radToDeg(lookControls.yawObject.rotation.y);
            }
            if(compassRotation){
              compass_heading.innerText = compassRotation.heading;
            }
            break;
          case 'position':
            //console.log('camera position changed', evt.detail.newData);
            var gpsPosition = camera.components['gps-position'];
            camera_p_x.innerText = evt.detail.newData.x;
            camera_p_z.innerText = evt.detail.newData.z;
            if(gpsPosition){
              if(gpsPosition.crd){
                crd_longitude.innerText = gpsPosition.crd.longitude;
                crd_latitude.innerText = gpsPosition.crd.latitude;
              }
              if(gpsPosition.zeroCrd){
                zero_crd_longitude.innerText = gpsPosition.zeroCrd.longitude;
                zero_crd_latitude.innerText = gpsPosition.zeroCrd.latitude;
              }
            }
            
            break;
        }
      });
      

    },


    methods: {
      testMethod: function (value) {
            return 'value: ' + value;
      },

    }
  }
</script>

<style src="./app.css"></style>

