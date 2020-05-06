<template lang="pug">
.container
  #WebGL-output
</template>

<script>
import * as THREE from 'three'

export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null
    }
  },
  mounted() {
    this.renderer = new THREE.WebGLRenderer()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.renderer.setClearColor(new THREE.Color(0xeeeeee))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    const planeGeometry = new THREE.PlaneGeometry(60, 20)
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)

    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    this.scene.add(plane)

    // 3-1 カメラの位置 見え方を設定する
    this.camera.position.x = -30
    this.camera.position.y = 40
    this.camera.position.z = 30
    this.camera.lookAt(this.scene.position)

    // 3-2 jsのappendChild関数でdiv要素に追加
    document
      .getElementById('WebGL-output')
      .appendChild(this.renderer.domElement)
    // 3-3 rendererにsecne cameraの描画を指示する
    this.renderer.render(this.scene, this.camera)

    this.render()
  },
  methods: {
    render() {
      document
        .getElementById('WebGL-output')
        .appendChild(this.renderer.domElement)
    }
  }
}
</script>

<style lang="css" scoped></style>
