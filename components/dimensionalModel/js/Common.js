import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'// eslint-disable-line
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'// eslint-disable-line
import { TimelineMax, TweenMax } from 'gsap' // eslint-disable-line
import EventBus from "~/utils/event-bus"; // eslint-disable-line

class Common {
  constructor() {
    this.scene = null
    this.camera = null
    this.light = null
    this.renderer = null
    this.size = {
      windowW: null,
      windowH: null
    }
    this.tl = null
    this.loader = null
    this.dracoLoader = null
    this.dusts = null
    this.model = null
    this.modelTernNum = 0
    EventBus.$on('MOVE_MODEL', this.onChange.bind(this))
  }

  init($canvas) {
    this.setSize()
    this.tl = new TimelineMax()
    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas
    })
    this.renderer.setClearColor(new THREE.Color(0x000000))
    this.renderer.shadowMap.enabled = true
    this.renderer.gammaOutput = true
    // scene
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0x000000, -20, 300)
    // light
    this.Light = new THREE.DirectionalLight(0xffffff, 4)
    this.Light.position.set(40, 120, 80)
    this.Light.castShadow = true
    this.scene.add(this.Light)
    // camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.windowW / this.size.windowH,
      0.1,
      1000
    )
    this.camera.position.set(0, 30, 150)
    this.camera.lookAt(this.scene.position)
    this.renderer.setSize(this.size.windowW, this.size.windowH)
    // this.cube()
    this.Helpers()
    this.gltfModel()
    this.dustAdd()
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
    this.rotateModel()
    this.renderer.render(this.scene, this.camera)
  }

  onChange(direction) {
    console.log(direction)
  }

  gltfModel() {
    this.dracoLoader = new DRACOLoader()
    this.dracoLoader.setDecoderPath('/draco/')
    this.loader = new GLTFLoader()
    this.loader.setDRACOLoader(this.dracoLoader)
    const url = '/gltf/tel_min.gltf'
    this.loader.load(url, (gltf) => {
      this.model = gltf.scene
      this.model.scale.set(10.0, 10.0, 10.0)
      this.model.castShadow = true
      this.scene.add(this.model)
    })
  }

  rotateModel() {
    if (this.model) {
      this.modelTernNum += 0.01
      this.model.rotation.y = this.modelTernNum
      if (this.model.rotation.y >= 2 * Math.PI) {
        this.modelTernNum = 0
      }
    }
  }

  dustAdd() {
    const geometry = new THREE.Geometry()
    // 表示する範囲を宣言して
    const SIZE = 200
    // 表示するパーティクルの数を決めて
    const LENGTH = 5000
    // その数まで四方八方に表示させるループ処理をする
    for (let i = 0; i < LENGTH; i++) {
      geometry.vertices.push(
        new THREE.Vector3(
          SIZE * (Math.random() - 0.5),
          SIZE * (Math.random() - 0.5),
          SIZE * (Math.random() - 0.5)
        )
      )
    }
    const texture = new THREE.TextureLoader().load('/dust.png')
    // const material = new THREE.MeshBasicMaterial({ map: texture })
    let material = new THREE.PointsMaterial()
    if (material.map) {
      material.map.dispose() // これを必ず呼ぶこと！！！
      material.map = texture
    } else {
      material = new THREE.PointsMaterial({
        // color: '0xffffff',
        size: 2,
        map: texture,
        transparent: true
      })
    }

    this.dusts = new THREE.Points(geometry, material)
    this.tl.to(this.dusts.rotation, 600, {
      y: -2 * Math.PI,
      repeat: -1
    })
    this.scene.add(this.dusts)
  }

  Helpers() {
    const axes = new THREE.AxesHelper(250)
    this.scene.add(axes)
    const gridHelper = new THREE.GridHelper(200, 50) // 引数は サイズ、1つのグリッドの大きさ
    this.scene.add(gridHelper)
    const LightHelper = new THREE.DirectionalLightHelper(this.Light)
    this.scene.add(LightHelper)
  }
}
export default new Common()
