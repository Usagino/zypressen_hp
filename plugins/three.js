import Vue from 'vue'
import * as THREE from 'three'
import 'imports-loader?THREE=three!three/examples/js/loaders/OBJLoader.js'
import 'imports-loader?THREE=three!three/examples/js/loaders/MTLLoader.js'
import 'imports-loader?THREE=three!three/examples/js/loaders/PLYLoader.js'
import 'imports-loader?THREE=three!three/examples/js/loaders/GLTFLoader.js'
import 'imports-loader?THREE=three!three/examples/js/controls/OrbitControls.js'
import 'imports-loader?THREE=three!three/examples/jsm/loaders/GLTFLoader'

Vue.use({
  install(Vue, options) {
    Vue.prototype.$THREE = THREE
  }
})
