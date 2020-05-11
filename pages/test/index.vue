<template lang="pug">
.container
  #WebGL-output
  .input__box
    input.input__box__text(v-model="cameraX" type="range" value="100" min="-360" max="360" step="1" @input="cameraXChange()")
    input.input__box__text(v-model="cameraY" type="range" value="100" min="-360" max="360" step="1" @input="cameraYChange()")
    input.input__box__text(v-model="cameraZ" type="range" value="100" min="-360" max="360" step="1" @input="cameraZChange()")
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default {
  data() {
    return {
      cameraX: 0,
      cameraY: 20,
      cameraZ: 150,
      renderer: null,
      scene: null,
      camera: null,
      Light1: null,
      plane: null,
      cube: null,
      loarder: null,
      model: null,
      clock: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    cameraXChange() {
      this.camera.position.x = this.cameraX
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
      this.renderer.render(this.scene, this.camera)
    },
    cameraYChange() {
      this.camera.position.y = this.cameraY
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
      this.renderer.render(this.scene, this.camera)
    },
    cameraZChange() {
      this.camera.position.z = this.cameraZ
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
      this.renderer.render(this.scene, this.camera)
    },
    init() {
      this.scene = new THREE.Scene()
      this.clock = new THREE.Clock()

      // renderer
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(new THREE.Color(0x616161))
      this.renderer.shadowMap.enabled = true
      this.renderer.gammaOutput = true
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      // camera
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      this.camera.position.x = this.cameraX
      this.camera.position.y = this.cameraY
      this.camera.position.z = this.cameraZ
      this.camera.lookAt(this.scene.position)

      // Light1
      this.Light1 = new THREE.SpotLight(0xffffff, 2, 500, Math.PI / 4, 1)
      this.Light1.position.set(70, 40, 80)
      this.Light1.castShadow = true
      this.scene.add(this.Light1)

      // cube
      // const cubeGeometry = new THREE.BoxGeometry(20, 20, 20)
      // const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
      // this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      // this.scene.add(this.cube)

      // 3Dmodel
      this.loader = new GLTFLoader()
      this.loader.load('tel.gltf', (gltf) => {
        this.model = gltf.scene
        this.model.name = 'telphoneBox'
        this.model.scale.set(10.0, 10.0, 10.0)
        this.model.castShadow = true
        this.scene.add(this.model)
      })

      // Helpers
      const axes = new THREE.AxesHelper(250)
      this.scene.add(axes)
      // const gridHelper = new THREE.GridHelper(200, 50) // 引数は サイズ、1つのグリッドの大きさ
      // this.scene.add(gridHelper)
      const LightHelper = new THREE.DirectionalLightHelper(this.Light1)
      this.scene.add(LightHelper)

      this.renderer.render(this.scene, this.camera)

      this.render()
      window.addEventListener('resize', this.onResize, false)
    },
    render() {
      document
        .getElementById('WebGL-output')
        .appendChild(this.renderer.domElement)
      // this.cube.rotation.y += 0.005
      if (this.model) {
        this.model.rotation.y -= 0.005
      }
      requestAnimationFrame(this.render)
      this.renderer.render(this.scene, this.camera)
    },
    modelAnimate(model) {
      console.log(model.rotation)
      model.rotation.y += 0.005
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    },
    onResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }
}
</script>

<style lang="scss">
.input__box {
  position: fixed;
  z-index: 20;
  bottom: 70px;
  left: 70px;
  display: flex;
  flex-direction: column;
  input {
    width: 400px;
  }
}
.page-scroll {
  display: none !important;
}
</style>
