<template lang="pug">
.telphoneBox
  .events
    p(@click="defaultPositionAnimate()")  Default position
    p(@click="animate()") animate

    p(@click="animate2()") animate2
  #WebGLarea
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TweenMax } from 'gsap'

export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      Light: null,
      plane: null,
      cube: null,
      loarder: null,
      model: null,
      clock: null,
      animationSpeed: 3
    }
  },
  mounted() {},
  created() {
    if (process.client) {
      this.init()
    }
  },
  methods: {
    hoge() {
      console.log('hoge')
    },
    init() {
      this.scene = new THREE.Scene()
      this.clock = new THREE.Clock()

      // renderer
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(new THREE.Color(0x000000))
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
      this.camera.position.set(0, 20, 150)
      this.camera.lookAt(this.scene.position)

      // Light
      this.Light = new THREE.SpotLight(0x6f6f6f, 2, 500, Math.PI / 4, 1)
      this.Light.position.set(70, 40, 80)
      this.Light.castShadow = true
      this.scene.add(this.Light)

      // 3Dmodel
      this.loader = new GLTFLoader()
      this.loader.load('tel.gltf', (gltf) => {
        this.model = gltf.scene
        this.model.scale.set(10.0, 10.0, 10.0)
        this.model.castShadow = true
        this.scene.add(this.model)
      })
      this.render()
      this.renderer.render(this.scene, this.camera)
      window.addEventListener('resize', this.onResize, false)
    },
    render() {
      document.getElementById('WebGLarea').appendChild(this.renderer.domElement)
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
    },
    Helpers() {
      const axes = new THREE.AxesHelper(250)
      this.scene.add(axes)
      // const gridHelper = new THREE.GridHelper(200, 50) // 引数は サイズ、1つのグリッドの大きさ
      // this.scene.add(gridHelper)
      const LightHelper = new THREE.DirectionalLightHelper(this.Light)
      this.scene.add(LightHelper)
    },

    defaultPositionAnimate() {
      TweenMax.to(this.model.rotation, this.animationSpeed, {
        y: 0 * Math.PI
      })
      TweenMax.to(this.camera.position, this.animationSpeed, { z: 150 })
      this.renderer.render(this.scene, this.camera)
    },
    animate() {
      TweenMax.to(this.model.rotation, this.animationSpeed, {
        y: 4 * Math.PI
      })
      TweenMax.to(this.camera.position, this.animationSpeed, { z: 80 })
      this.renderer.render(this.scene, this.camera)
    },
    animate2() {
      TweenMax.to(this.model.rotation, this.animationSpeed, {
        y: 12 * Math.PI
      })
      TweenMax.to(this.camera.position, this.animationSpeed, { z: 300 })
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>

<style lang="scss">
.telphoneBox {
  .events {
    position: fixed;
    z-index: 2;
    bottom: $pri-value;
    left: $pri-value;
    display: flex;
    flex-direction: row;
    @include gap-right(20px);
    p {
      cursor: pointer;
      padding: 4px 20px;
      border-radius: 100px;
      border: 2px solid $color-white;
    }
  }
}
#WebGLarea {
  position: fixed;
  @include full-screen;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
