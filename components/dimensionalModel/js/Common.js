import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'// eslint-disable-line
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'// eslint-disable-line
import { TimelineMax, TweenMax } from 'gsap' // eslint-disable-line
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
    this.tl = null
    this.loader = null
    this.dracoLoader = null
    this.dusts = null
    this.model = null
    this.modelTernNum = 0
  }

  init($canvas) {
    this.setSize()
    this.tl = new TimelineMax()
    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas,
      antialias: true
    })
    this.renderer.setClearColor(new THREE.Color(0x000000))
    this.renderer.shadowMap.enabled = true
    this.renderer.gammaOutput = true
    // scene
    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(0x000000, -10, 300)

    this.spotLightAdd()
    this.ambientLightAdd()
    // camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.windowW / this.size.windowH,
      0.1,
      1000
    )
    this.camera.position.set(0, 10, 100)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.renderer.setSize(this.size.windowW, this.size.windowH)
    // this.cube()
    // this.Helpers()
    this.groundAdd()
    // this.cube()
    this.gltfModel()
    // this.dustAdd()
    // this.datGUI()
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
    // this.rotateModel()
    this.renderer.render(this.scene, this.camera)
  }

  onChange(direction) {
    console.log(direction)
  }

  spotLightAdd() {
    this.spotLight = new THREE.SpotLight(0xffffff)
    this.spotLight.position.set(100, 60, 30)
    this.spotLight.angle = Math.PI / 8
    console.log(this.spotLight.angle)
    this.spotLight.penumbra = 0.5
    this.spotLight.decay = 2
    this.spotLight.distance = 300
    this.spotLight.castShadow = true
    this.spotLight.shadow.mapSize.width = 1024
    this.spotLight.shadow.mapSize.height = 1024
    this.spotLight.shadow.camera.near = 10
    this.spotLight.shadow.camera.far = 200
    this.scene.add(this.spotLight)
  }

  ambientLightAdd() {
    this.AmbientLight = new THREE.AmbientLight(0xe4e2c9, 0.2)
    this.scene.add(this.AmbientLight)
  }

  gltfModel() {
    this.dracoLoader = new DRACOLoader()
    this.dracoLoader.setDecoderPath('/draco/')
    this.loader = new GLTFLoader()
    this.loader.setDRACOLoader(this.dracoLoader)
    const url = '/gltf/body/zypbody.glb'
    this.loader.load(url, (gltf) => {
      this.model = gltf.scene
      this.model.scale.set(20, 20, 20)
      this.model.castShadow = true
      gltf.scene.traverse(function(node) {
        if (node.isMesh) {
          node.castShadow = true
        }
      })
      this.model.position.y = -20
      this.scene.add(this.model)
      EventBus.$on(
        'moveDefaultPosition',
        this.animateMoveDefaultPosition.bind(this)
      )
      EventBus.$on('moveModelFadeOut', this.animateMoveModelFadeOut.bind(this))
      EventBus.$on('moveTargetHead', this.animateTargetModelHead.bind(this))
      EventBus.$on('moveShowBack', this.animateMoveShowBack.bind(this))
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

  animateTargetModelHead() {
    if (this.model) {
      TweenMax.to(this.model.rotation, 2, {
        y: 2 * Math.PI,
        onComplete: () => {
          this.model.rotation.y = 0
        }
      })
      TweenMax.to(this.camera.position, 2, {
        y: 12,
        z: 15
      })
      TweenMax.to(this.model.position, 2, {
        x: 0
      })
    }
  }

  animateMoveDefaultPosition() {
    console.log('animateMoveDefaultPosition')
    if (this.model) {
      TweenMax.to(this.model.rotation, 2, {
        y: -2 * Math.PI,
        onComplete: () => {
          this.model.rotation.y = 0
        }
      })
      TweenMax.to(this.model.position, 2, {
        x: 0
      })
      TweenMax.to(this.camera.position, 2, {
        y: 10,
        z: 100
      })
    }
  }

  animateMoveModelFadeOut() {
    console.log('animateMoveModelFadeOut')
    if (this.model) {
      TweenMax.to(this.model.position, 2, {
        x: -100
      })
      TweenMax.to(this.camera.position, 2, {
        z: -100
      })
    }
  }

  animateMoveShowBack() {
    if (this.model) {
      TweenMax.to(this.model.rotation, 2, {
        y: 1 * Math.PI
      })
      TweenMax.to(this.camera.position, 2, {
        y: 10,
        z: 33
      })
      TweenMax.to(this.model.position, 2, {
        x: 0
      })
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
      material.map.dispose()
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

  cube() {
    const material = new THREE.MeshPhongMaterial({
      color: 0x4080ff,
      dithering: true
    })
    const geometry = new THREE.BoxBufferGeometry(10, 60, 10)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.rotation.y = 0.5 * Math.PI
    this.scene.add(mesh)
  }

  groundAdd() {
    // const groundGeometry = new THREE.BoxGeometry(1000000, 0, 1000000)
    // const groundMaterial = new THREE.MeshBasicMaterial({
    //   color: 0xffffff
    // })
    // const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    const material = new THREE.MeshPhongMaterial({
      color: 0xf1f1f1,
      dithering: true
    })
    const geometry = new THREE.PlaneBufferGeometry(1000000, 1000000)
    const ground = new THREE.Mesh(geometry, material)
    ground.position.y = -22
    ground.rotation.x = -Math.PI * 0.5
    ground.receiveShadow = true
    this.scene.add(ground)
  }

  Helpers() {
    const axes = new THREE.AxesHelper(250)
    this.scene.add(axes)
    const gridHelper = new THREE.GridHelper(200, 50) // 引数は サイズ、1つのグリッドの大きさ
    this.scene.add(gridHelper)
    const LightHelper = new THREE.SpotLightHelper(this.spotLight)
    this.scene.add(LightHelper)

    const spotLightShadowHelper = new THREE.CameraHelper(
      this.spotLight.shadow.camera
    )
    this.scene.add(spotLightShadowHelper)
  }

  datGUI() {
    const dat = require('dat.gui') // eslint-disable-line
    this.gui = new dat.GUI()

    // const light = this.gui.addFolder('Light')
    // light.add(this.spotLight, 'penumbra', 1, 2).listen()
    // light.add(this.spotLight, 'decay', 0, 10).listen()
    // light.add(this.spotLight, 'distance', 1, 1000).listen()
    // light.add(this.spotLight, 'angle', 0, Math.PI * 2).listen()
    // light.open()
    //
    // const lightPos = this.gui.addFolder('Light Position')
    // lightPos.add(this.spotLight.position, 'x', -200, 200).listen()
    // lightPos.add(this.spotLight.position, 'y', 0, 200).listen()
    // lightPos.add(this.spotLight.position, 'z', -200, 200).listen()
    // lightPos.open()
    if (this.model) {
      const model = this.gui.addFolder('Model')
      model.add(this.model.position, 'x', -200, 200).listen()
      model.add(this.model.position, 'y', -200, 200).listen()
      model.add(this.model.position, 'z', -200, 200).listen()
      model.open()
    }

    const camera = this.gui.addFolder('Camera')
    camera.add(this.camera.position, 'x', -100, 100).listen()
    camera.add(this.camera.position, 'y', -100, 100).listen()
    camera.add(this.camera.position, 'z', -100, 100).listen()
    camera.open()
  }
}
export default new Common()
