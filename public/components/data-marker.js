if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
  }
  else {
    if (CONFIG.DEBUG) {console.log("Registering data-marker...");}
}

// http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_.28JavaScript.2FActionScript.2C_etc..29
function long2reltile(lon,rellon,zoom) {
  var pos = (Math.floor((rellon+180)/360*Math.pow(2,zoom)))
  var rel = (lon+180)/360*Math.pow(2,zoom)
  return rel - pos; 
};

function lat2reltile(lat, rellat,zoom)  { 
  var pos = (Math.floor((1-Math.log(Math.tan(rellat*Math.PI/180) + 1/Math.cos(rellat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)))
  var rel = (1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)
  return rel - pos;
};

var dataColor = {
  airQuality: 'yellow',
  climateChange: 'red',
  pollution: 'green', 
  landDev: 'brown', 
  waterQuality: 'blue', 
  health:'pink'
}

AFRAME.registerComponent('data-marker', {
	schema: {
		rellatitude: {
			type: 'number',
			default: 0,
		},
		rellongitude: {
			type: 'number',
			default: 0,
		},
		latitude: {
			type: 'number',
			default: 0,
		},
		longitude: {
			type: 'number',
			default: 0,
		},
		zoom: {
			type: 'number',
			default: 0,
		},
		type:  {
			type: 'string',
			default: 'airQuality',
		}
	},
  
  init: function () {
    var data = this.data;
    var el = this.el;
    
    var mesh = el.getOrCreateObject3D('mesh', THREE.Mesh);
    
    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material = new THREE.MeshStandardMaterial( {color: dataColor[data.type]} );
    var sphere = new THREE.Mesh( geometry, material );
    
    el.setObject3D('mesh', sphere);
    
    var currentPosition = this.el.object3D.position;
    
    el.setAttribute('position', {
      x: currentPosition.x + lat2reltile(data.longitude, data.rellongitude, data.zoom),
      y: currentPosition.y + long2reltile(data.latitude, data.rellatitude, data.zoom),
      z: currentPosition.z
    });
	},
  
  remove: function () {
    this.el.removeObject3D('mesh');
  }
}