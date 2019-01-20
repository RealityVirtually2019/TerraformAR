
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
  }
  else {
    if (CONFIG.DEBUG) {console.log("Registering data-marker...");}
}


var dataIcon = {
  'airQuality': 'image.png',
  climateChange: 'image.png',
  pollution: 'image.png', 
  landDev: 'image.png', 
  waterQuality: 'image.png', 
  health:'image.png'
}

AFRAME.registerComponent('data-marker', {
	schema: {
		latitude: {
			type: 'number',
			default: 0,
		},
		longitude: {
			type: 'number',
			default: 0,
		},
		type:  { //airQuality, climateChange, pollution, landDev, waterQuality, and health
			type: 'string',
			default: 'airQuality',
		},
	},
  
  init: function () {
		
		
	},
}