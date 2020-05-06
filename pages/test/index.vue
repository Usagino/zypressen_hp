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

export default {
  data() {
    return {
      cameraX: 100,
      cameraY: 100,
      cameraZ: 100,
      renderer: null,
      scene: null,
      camera: null,
      DirectionalLight: null,
      plane: null,
      cube: null
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
      this.renderer = new THREE.WebGLRenderer()
      this.scene = new THREE.Scene()

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

      // Light
      this.DirectionalLight = new THREE.DirectionalLight(
        0xffffff,
        4,
        30,
        Math.PI / 6,
        0,
        0.5
      )
      this.DirectionalLight.position.set(0, 10, 100)
      this.scene.add(this.DirectionalLight)

      this.renderer.setClearColor(new THREE.Color(0x616161))
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      // cube
      const cubeGeometry = new THREE.BoxGeometry(20, 20, 20)
      const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
      this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      this.scene.add(this.cube)

      // Helpers
      const axes = new THREE.AxisHelper(250)
      this.scene.add(axes)
      const gridHelper = new THREE.GridHelper(200, 50) // 引数は サイズ、1つのグリッドの大きさ
      this.scene.add(gridHelper)
      const DirectionalLightHelper = new THREE.DirectionalLightHelper(
        this.DirectionalLight
      )
      this.scene.add(DirectionalLightHelper)

      this.renderer.render(this.scene, this.camera)

      this.render()
      window.addEventListener('resize', this.onResize, false)
    },
    render() {
      document
        .getElementById('WebGL-output')
        .appendChild(this.renderer.domElement)
      this.cube.rotation.z += 0.1
      requestAnimationFrame(this.render)
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

<style lang="scss" scoped>
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
</style>
