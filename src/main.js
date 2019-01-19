import Vue from 'vue';
import VueRouter from 'vue-router';

import 'three';
import 'aframe';
import './aframe-components/mapbox-terrain.js';
import './aframe-components/compass-rotation.js';
import './aframe-components/gps-place.js';
import './aframe-components/gps-position.js';

import App from './App.vue';


// router
Vue.use(VueRouter);
var router = new VueRouter({
  mode: 'history',
  routes: []
});

// ignore elements for Firefox
Vue.config.ignoredElements = ['a-scene', 'a-assets', 'a-gltf-model', 'a-entity', 'a-sphere', 'a-animation', 'a-sky', 'a-mapbox-terrain'];

var app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
  });
  