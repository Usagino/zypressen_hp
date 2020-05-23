<template lang="pug">
.pageAyumukun
  .switch_linked
    .switch_linked__wrap
      .switch_linked__wrap__text
        p.s-lw-top ZYPRESSEN
        nuxt-link.s-lw-works(to="/works") WORKS
        nuxt-link.s-lw-about(to="/about") ABOUT
        nuxt-link.s-lw-contact(to="/contact") CONTACT
    .switch_linked__scroll
      p SCROLL
  #WebGLarea
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TimelineMax, TweenMax } from 'gsap'

export default {
  data() {
    // const tl = new TimelineMax()
    return {
      renderer: null,
      scene: null,
      camera: null,
      Light: null,
      plane: null,
      cube: null,
      loarder: null,
      ground: null,
      dusts: null,
      model: null,
      clock: null,
      swipeStart: 0,
      swipeEnd: 0,
      animationSpeed: 3,
      animaChangeCount: 1,
      tl: new TimelineMax(),
      CurrentClass: 'String',
      PreviousClass: 'top',
      modelTern: 0
    }
  },
  mounted() {
    this.init()
    this.wheelAction()
    this.swipeAciton()

    this.tl
      .set('.s-lw-top', {
        display: 'block'
      })
      .to('.s-lw-top', 0.3, {
        y: '0%',
        ease: 'ease-in',
        delay: 2,
        rotate: '0deg'
      })
    // this.defaultPositionAnimate()
  },
  methods: {
    init() {
      this.scene = new THREE.Scene()
      this.clock = new THREE.Clock()

      // renderer
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setClearColor(new THREE.Color(0x000000))
      this.renderer.shadowMap.enabled = true
      this.renderer.gammaOutput = true
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      // fog
      this.scene.fog = new THREE.Fog(0x000000, -20, 300)
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
      this.Light = new THREE.DirectionalLight(0xffffff, 4)
      this.Light.position.set(40, 120, 80)
      this.Light.castShadow = true
      this.scene.add(this.Light)

      // 3Dmodel
      this.loader = new GLTFLoader()
      this.loader.load('tel.gltf', (gltf) => {
        this.model = gltf.scene
        this.model.scale.set(10.0, 10.0, 10.0)
        this.model.castShadow = true
        this.scene.add(this.model)
        this.ternModel()
      })

      this.groundAdd()
      // this.dustAdd()
      // this.Helpers()
      this.render()
      this.renderer.render(this.scene, this.camera)
      window.addEventListener('resize', this.onResize, false)
    },
    groundAdd() {
      const groundGeometry = new THREE.BoxGeometry(1000000, 0, 1000000)
      const groundMaterial = new THREE.MeshBasicMaterial({
        color: 0x0a0a0a
      })
      const ground = new THREE.Mesh(groundGeometry, groundMaterial)
      ground.position.set(0, -22, 0)
      ground.castShadow = true
      this.scene.add(ground)
    },
    dustAdd() {
      const geometry = new THREE.Geometry()
      // 表示する範囲を宣言して
      const SIZE = 500
      // 表示するパーティクルの数を決めて
      const LENGTH = 1000000
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
      const material = new THREE.PointsMaterial({
        // color: '0xffffff',
        size: 0.5,
        map: texture,
        transparent: true
      })

      this.dusts = new THREE.Points(geometry, material)
      TweenMax.to(this.dusts.rotation, 600, {
        y: -2 * Math.PI,
        repeat: -1
      })
      this.scene.add(this.dusts)
    },
    render() {
      document.getElementById('WebGLarea').appendChild(this.renderer.domElement)
      requestAnimationFrame(this.render)
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
      const gridHelper = new THREE.GridHelper(200, 50) // 引数は サイズ、1つのグリッドの大きさ
      this.scene.add(gridHelper)
      const LightHelper = new THREE.DirectionalLightHelper(this.Light)
      this.scene.add(LightHelper)
    },
    ternModel() {
      TweenMax.set(this.model.rotation, { y: (this.modelTern += 0.01) })
      if (2 * Math.PI <= this.modelTern) {
        this.modelTern = 0
      }
      this.renderer.render(this.scene, this.camera)
      if (this.animaChangeCount === 1) {
        requestAnimationFrame(this.ternModel)
      }
    },
    defaultPositionAnimate() {
      this.ternModel()
      TweenMax.to(this.camera.position, this.animationSpeed, { z: 150 })
      this.renderer.render(this.scene, this.camera)
      this.switchText('top')
    },
    worksAnimate() {
      const tern = 12 * Math.PI
      TweenMax.to(this.model.rotation, this.animationSpeed, {
        y: tern
      })
      this.modelTern = tern
      TweenMax.to(this.camera.position, this.animationSpeed, { z: 300 })
      this.renderer.render(this.scene, this.camera)
      this.switchText('works')
    },
    aboutAnimate() {
      TweenMax.to(this.model.rotation, this.animationSpeed, {
        y: 4 * Math.PI
      })
      TweenMax.to(this.camera.position, this.animationSpeed, { z: 200 })
      this.renderer.render(this.scene, this.camera)
      this.switchText('about')
    },
    contactAnimate() {
      const tern = 2 * Math.PI
      TweenMax.to(this.model.rotation, this.animationSpeed, {
        y: tern
      })
      this.modelTern = tern
      TweenMax.to(this.camera.position, this.animationSpeed, { z: 400 })
      this.renderer.render(this.scene, this.camera)
      this.switchText('contact')
    },
    switchText(CurrentClass) {
      this.tl
        .to(`.s-lw-${this.PreviousClass}`, 0.3, {
          y: '120%',
          rotate: '10deg'
        })
        .set(`.s-lw-${this.PreviousClass}`, { display: 'none' })
        .set(`.s-lw-${CurrentClass}`, { display: 'block' })
        .to(`.s-lw-${CurrentClass}`, 0.3, {
          y: '0%',
          rotate: '0deg',
          delay: 0.3
        })
    },
    wheelAction() {
      // Function of the wheel. Scrolling at a constant power will do the job.
      let wheelToggle = true
      window.onmousewheel = (event) => {
        const wheelPower = 50
        if (event.wheelDelta > wheelPower && wheelToggle) {
          this.animaChangeCount -= 1
          if (this.animaChangeCount <= 0) {
            this.animaChangeCount = 4
          }
          this.changeAnimation(this.animaChangeCount)

          wheelToggle = false
          setTimeout(() => {
            wheelToggle = true
          }, 3000)
        } else if (event.wheelDelta < wheelPower * -1 && wheelToggle) {
          this.animaChangeCount += 1
          if (this.animaChangeCount >= 5) {
            this.animaChangeCount = 1
          }
          this.changeAnimation(this.animaChangeCount)

          wheelToggle = false
          setTimeout(() => {
            wheelToggle = true
          }, 3000)
        }
      }
    },
    swipeAciton() {
      window.addEventListener('touchstart', (event) => {
        this.swipeStart = event.changedTouches[0].pageY
      })
      window.addEventListener('touchend', (event) => {
        this.swipeEnd = event.changedTouches[0].pageY
        const absValue = Math.abs(this.swipeStart - this.swipeEnd)
        if (absValue > 100) {
          if (this.swipeStart > this.swipeEnd) {
            console.log('👇', absValue)
            this.animaChangeCount -= 1
            if (this.animaChangeCount <= 0) {
              this.animaChangeCount = 4
            }
            this.changeAnimation(this.animaChangeCount)
          } else {
            console.log('☝️', absValue)
            this.animaChangeCount += 1
            if (this.animaChangeCount >= 5) {
              this.animaChangeCount = 1
            }
            this.changeAnimation(this.animaChangeCount)
          }
        }
      })
    },
    changeAnimation(animaChangeCount) {
      if (animaChangeCount === 1) {
        console.log(animaChangeCount, 'TOP')
        this.defaultPositionAnimate()
        this.PreviousClass = 'top'
      } else if (animaChangeCount === 2) {
        console.log(animaChangeCount, 'WORKS')
        this.worksAnimate()
        this.PreviousClass = 'works'
      } else if (animaChangeCount === 3) {
        console.log(animaChangeCount, 'ABOUT')
        this.aboutAnimate()
        this.PreviousClass = 'about'
      } else if (animaChangeCount === 4) {
        console.log(animaChangeCount, 'CONTACT')
        this.contactAnimate()
        this.PreviousClass = 'contact'
      }
    }
  }
}
</script>

<style lang="scss">
.pageAyumukun {
  position: fixed;
  top: 0;
  left: 0;
  @include full-screen;
  .switch_linked {
    position: absolute;
    bottom: $pri-value;
    left: 0;
    right: 0;
    width: fit-content;
    height: fit-content;
    display: block;
    margin: auto;
    @include mq(sm) {
      bottom: 32px;
    }
    &__wrap {
      &__text {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: auto;
        width: fit-content;
        overflow: hidden;
        text-align: center;
        @include font-title-first;
        p,
        a {
          display: none;
          transform: translateY(120%) rotate(5deg);
          transform-origin: left;
        }
      }
    }
    &__scroll {
      text-align: center;
      @include font-nav-primary;
      p {
        color: $color-gray;
      }
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
