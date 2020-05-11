<template>
  <main class="wrapper">
    <div id="canvas" ref="webgl"></div>
    <div v-for="image in images" :key="image.src" ref="plane" class="plane">
      <img alt crossorigin="anonymous" :src="image.src" />
    </div>
  </main>
</template>

<script>
import { Curtains } from 'curtainsjs'
import { vertex, fragment } from '~/assets/webgl/shaderinit.js'
// import anime from 'animejs/lib/anime.es.js'
export default {
  data() {
    return {
      curtains: null,
      plane: null,
      planes: [],
      images: [{ src: '/menu/about.jpg' }],
      params: {
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
          time: {
            name: 'uTime',
            type: '1f',
            value: 0
          }
        }
      }
    }
  },
  computed: {},
  mounted() {
    this.setupCurtains()
    this.setupPlane()
  },
  methods: {
    setupCurtains() {
      this.curtains = new Curtains({
        container: this.$refs.webgl,
        pixelRatio: window.devicePixelRatio
      })
    },
    handlePlanes(i) {
      const plane = this.planes[i]
      plane.onRender(() => {
        plane.uniforms.time.value++ // update our time uniform value
      })
    },
    setupPlane() {
      for (let i = 0; i < this.$refs.plane.length; i++) {
        this.plane = this.curtains.addPlane(this.$refs.plane[i], this.params)
        if (this.plane) {
          this.planes.push(this.plane)
          this.handlePlanes(i)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
#canvas {
  position: fixed;
  width: 100%;
  height: 100vh;
}
.plane {
  width: 80%;
  height: 80vh;
  margin: 10vh auto;
}
.plane img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  display: none;
}
</style>
