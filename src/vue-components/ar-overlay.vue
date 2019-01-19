<template>
<div style='margin: 0px; overflow: hidden;'>
	
	<div style="position: fixed; top: 10px; width:100%; text-align: center; z-index: 1; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;">
		<div>
			coords: <span id="crd_longitude"></span>, <span id="crd_latitude"></span>
				(zero coords: <span id="zero_crd_longitude"></span>, <span id="zero_crd_latitude"></span>)
		</div>
		<div>
			camera coords: <span id="camera_p_x"></span>, <span id="camera_p_z"></span>
		</div>
		<div>
			compass heading: <span id="compass_heading"></span>,
			camera angle: <span id="camera_angle"></span>,
			yaw angle: <span id="yaw_angle"></span>
		</div>
	</div>
	
</div>
</template>
	