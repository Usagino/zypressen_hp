import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
class Common {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null

    this.size = {
      windowW: null,
      windowH: null
    }

    this.clock = null

    this.time = {
      total: null,
      delta: null
    }
    this.loader = null
    this.mat = null
  }

  init($canvas) {
    this.setSize()

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.windowW / this.size.windowH,
      0.1,
      10000
    )
    this.camera.position.set(0, 10, -10)
    this.camera.lookAt(this.scene.position)

    this.loader = new GLTFLoader()
    const url = 'test.glb'
    this.loader.load(url, (data) => {
      const gltf = data
      const object = gltf.scene
      this.scene.add(object)
    })
    this.mat = new THREE.BoxGeometry(10, 10, 10)

    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas
    })

    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.renderer.setClearColor(0xeaf2f5)
    this.renderer.setSize(this.size.windowW, this.size.windowH)

    this.clock = new THREE.Clock()
    this.clock.start()
  }

  setSize() {
    this.size = {
      windowW: window.innerWidth,
      windowH: window.innerHeight
    }
  }

  resize() {
    this.setSize()
    this.camera.aspect = this.size.windowW / this.size.windowH
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.size.windowW, this.size.windowH)
  }

  render() {
    // this.time.delta = this.clock.getDelta()
    // this.time.total += this.delta

    this.renderer.render(this.scene, this.camera)
  }
}

export default new Common()
