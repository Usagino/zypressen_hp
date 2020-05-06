<template lang="pug">
.container
  #WebGL-output
</template>

<script>
import * as THREE from 'three'

export default {
  mounted() {
    const renderer = new THREE.WebGLRenderer()
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    renderer.setClearColor(new THREE.Color(0xeeeeee))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const planeGeometry = new THREE.PlaneGeometry(60, 20)
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)

    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    scene.add(plane)

    // 3-1 カメラの位置 見え方を設定する
    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30
    camera.lookAt(scene.position)

    // 3-2 jsのappendChild関数でdiv要素に追加
    document.getElementById('WebGL-output').appendChild(renderer.domElement)
    // 3-3 rendererにsecne cameraの描画を指示する
    renderer.render(scene, camera)

    this.render(renderer)
  },
  methods: {
    render(renderer) {
      document.getElementById('WebGL-output').appendChild(renderer.domElement)
    }
  }
}
</script>

<style lang="css" scoped></style>
