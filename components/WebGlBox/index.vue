<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// import 3Dmodel from '~/assets/webgl/test.gltf'
export default {
  data() {
    // === scene ===
    const scene = new THREE.Scene()
    const loader = new GLTFLoader()

    // === renderer ===
    const renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xeaf2f5)
    renderer.setSize(window.innerWidth, window.innerHeight)

    // === camera ===
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // === light ===
    const light = new THREE.DirectionalLight(0xcdeef7)
    light.position.set(0, 0, 10)

    // === model ===

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)

    // === controll ===
    const controls = new OrbitControls(camera, renderer.domElement)

    return {
      scene,
      renderer,
      camera,
      light,
      cube,
      canRender: false,
      loader,
      controls
    }
  },
  created() {
    // === sceneにmodel,light, cameraを追加 ===
    this.scene.add(this.camera)
    this.scene.add(this.light)
    this.scene.add(this.cube)
    this.loader.load('test.gltf', (gltf) => {
      this.scene.add(gltf.scene)
    })
    this.controls.userPan = false
    this.controls.userPanSpeed = 0.0
    this.controls.maxDistance = 5000.0
    this.controls.maxPolarAngle = Math.PI * 0.495
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 4.0
  },
  mounted() {
    this.canRender = true
  },
  updated() {
    const stage = document.getElementById('stage')
    stage.appendChild(this.renderer.domElement)
    this.animate()
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate)
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    }
  },
  render(h) {
    if (this.canRender) {
      if (
        process.env.NODE_ENV === 'development' &&
        this.$slots.default &&
        this.$slots.default.length > 1
      ) {
        throw new Error('[vue-no-ssr] You cannot use multiple child components')
      }

      return h('div', {
        class: 'stage',
        attrs: { id: 'stage' }
      })
    }
    return h('div', 'server side')
  }
}
</script>

<style lang="scss">
#stage {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
}
</style>
