import Animate from "./Animate";// eslint-disable-line

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js' // eslint-disable-line
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js' // eslint-disable-line
import EventBus from "~/utils/event-bus"; // eslint-disable-line
// import dat from 'dat.gui';// eslint-disable-line

class Common {
  constructor() {
    this.scene = null
    this.camera = null
    this.spotLight = null
    this.AmbientLight = null
    this.renderer = null
    this.size = {
      windowW: null,
      windowH: null
    }
    this.loader = null
    this.dracoLoader = null
    this.model = null
    this.currentPath = null
    this.ground = null
    // event bus
    EventBus.$on('passingThePath', this.appliedPath.bind(this))
  }

  init($canvas) {
    this.setSize()
    // scene
    this.scene = new THREE.Scene()
    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas,
      antialias: true
    })
    // this.renderer.setClearColor(new THREE.Color(0x000000))
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.outputEncoding = THREE.sRGBEncoding
    // this.renderer.gammaInput = true
    // this.renderer.gammaOutput = true

    // this.scene.fog = new THREE.Fog(0x000000, -10, 300)

    // camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.windowW / this.size.windowH,
      0.1,
      1000
    )
    this.camera.position.set(0, 0, 100)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.camera.position.y = 22
    this.renderer.setSize(this.size.windowW, this.size.windowH)

    // model before
    this.dracoLoader = new DRACOLoader()
    this.dracoLoader.setDecoderPath('/draco/')
    this.loader = new GLTFLoader()
    this.loader.setDRACOLoader(this.dracoLoader)
    const url = '/ayumu.glb'
    this.loader.load(url, (gltf) => {
      this.spotLightAdd()
      this.modelAdd(gltf)
      this.groundAdd()
      this.Helpers()
      this.datGUI()
      // this.tweakpane()
    })
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
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.size.windowW, this.size.windowH)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  onChange(direction) {
    console.log(direction)
  }

  appliedPath(name) {
    this.currentPath = name
    this.switchAnime()
  }

  switchAnime() {
    switch (this.currentPath) {
      case 'index':
        Animate.animateMoveDefaultPosition(this.model, this.camera)
        break
      case 'works':
        Animate.animateMoveModelFadeOut(this.model, this.camera)
        break
      case 'about':
        Animate.animateAboutPage(this.model, this.camera)
        break
      case 'contact':
        Animate.animateMoveShowBack(this.model, this.camera)
        break
    }
  }

  spotLightAdd() {
    this.spotLight = new THREE.SpotLight(0x5c5c5c)
    this.spotLight.position.set(0, 60, 30)
    this.spotLight.angle = Math.PI
    this.spotLight.penumbra = 0.5
    this.spotLight.decay = 2
    this.spotLight.intensity = 2
    this.spotLight.distance = 300

    this.spotLight.castShadow = true
    this.spotLight.shadow.mapSize.width = 2048
    this.spotLight.shadow.mapSize.height = 2048
    this.spotLight.shadow.camera.near = 10
    this.spotLight.shadow.camera.far = 200
    this.scene.add(this.spotLight)
  }

  modelAdd(gltf) {
    this.model = gltf.scene
    this.model.scale.set(20, 20, 20)
    this.model.position.y = 8
    this.model.castShadow = true
    this.scene.add(this.model)
    this.switchAnime()
    EventBus.$on('moveDefaultPosition', this.animateMoveDefaultPosition)
    EventBus.$on('moveModelFadeOut', this.animateMoveModelFadeOut)
    EventBus.$on('animateAboutPage', this.animateAboutPage)
    EventBus.$on('moveShowBack', this.animateMoveShowBack)
  }

  groundAdd() {
    const geometry = new THREE.BoxGeometry(1000000, 0, 1000000)
    const material = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.2
    })
    this.ground = new THREE.Mesh(geometry, material)
    /// this.ground.rotation.x = Math.PI / 2

    this.ground.receiveShadow = true
    this.ground.position.y = 1
    this.scene.add(this.ground)
  }

  Helpers() {
    const axes = new THREE.AxesHelper(2000)
    this.scene.add(axes)
    // const gridHelper = new THREE.GridHelper(200, 50) // 引数は サイズ、1つのグリッドの大きさ
    // this.scene.add(gridHelper)
    const LightHelper = new THREE.SpotLightHelper(this.spotLight)
    this.scene.add(LightHelper)

    // const spotLightShadowHelper = new THREE.CameraHelper(
    //   this.spotLight.shadow.camera
    // )
    // this.scene.add(spotLightShadowHelper)
    const helperGround = new THREE.BoxHelper(this.ground, 0xff0000) // eslint-disable-line
    this.scene.add(helperGround)
  }

  tweakpane() {
    const Tweakpane = require('tweakpane') // eslint-disable-line
    const pane = new Tweakpane()
    const cameraFl = pane.addFolder({
      title: 'CAMERA'
    })
    const CAMERA = {
      X: this.camera.position.x,
      Y: this.camera.position.y,
      Z: this.camera.position.z
    }
    cameraFl.addInput(CAMERA, 'X', {
      min: -200,
      max: 200
    })

    const planeFl = pane.addFolder({
      title: 'Ground'
    })
    const ground = this.groundAdd()
    const GROUND = {
      X: ground.rotation.x,
      Y: ground.rotation.y,
      Z: ground.rotation.z
    }
    planeFl.addInput(GROUND, 'X', {
      min: -200,
      max: 200
    })
  }

  datGUI() {
    const dat = require('dat.gui') // eslint-disable-line
    this.gui = new dat.GUI()
    const light = this.gui.addFolder('Light')
    light.add(this.spotLight, 'penumbra', 1, 2).listen()
    light.add(this.spotLight, 'decay', 0, 10).listen()
    light.add(this.spotLight, 'distance', 1, 1000).listen()
    light.add(this.spotLight, 'angle', 0, Math.PI).listen()
    light.add(this.spotLight, 'intensity', 0, 3).listen()
    light.open()

    const lightPos = this.gui.addFolder('Light Position')
    lightPos.add(this.spotLight.position, 'x', -200, 200).listen()
    lightPos.add(this.spotLight.position, 'y', 0, 200).listen()
    lightPos.add(this.spotLight.position, 'z', -200, 200).listen()
    lightPos.open()

    const lightShadow = this.gui.addFolder('Light Shadow')
    lightShadow
      .add(this.spotLight.shadow.mapSize, 'width', -2000, 2000)
      .listen()
    lightShadow
      .add(this.spotLight.shadow.mapSize, 'height', -2000, 2000)
      .listen()
    lightShadow.add(this.spotLight.shadow.camera, 'near', -20, 20).listen()
    lightShadow.add(this.spotLight.shadow.camera, 'far', -400, 400).listen()
    lightShadow.open()
    //
    const camera = this.gui.addFolder('Camera position')
    camera.add(this.camera.position, 'x', -200, 200).listen()
    camera.add(this.camera.position, 'y', -200, 200).listen()
    camera.add(this.camera.position, 'z', -200, 200).listen()
    camera.open()
    const ground = this.gui.addFolder('Ground') // eslint-disable-line
    // ground.add(this.ground.position, 'x', -1000, 1000).listen()
    ground.add(this.ground.position, 'y', 0, 50).listen()
    ground.open()
  }
}
export default new Common()
