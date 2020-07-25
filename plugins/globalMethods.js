import Vue from 'vue'
// import { TweenMax } from 'gsap'

Vue.mixin({
  methods: {
    keyUp(callback) {
      addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
          callback()
        }
      })
    },
    keyDown(callback) {
      addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
          callback()
        }
      })
    },
    changeWebp(image) {
      if (this.$ua.browser() === 'Safari') {
        return image
      } else {
        return image + '?fm=webp'
      }
    },
    changeWebpLocal(image) {
      if (this.$ua.browser() === 'Safari') {
        return image
      } else {
        return image + '.webp'
      }
    },
    zeroPadding(number) {
      return ('0' + number).slice(-2)
    },
    globalIconMoseOver(el) {
      if (this.$ua.deviceType() !== 'smartphone') {
        const target = document.querySelector('.mouse-stoker')
        target.classList.add(el)
      }
    },
    iconMouseLeave(el) {
      if (this.$ua.deviceType() !== 'smartphone') {
        const target = document.querySelector('.mouse-stoker')
        target.classList.remove(el)
      }
    }

    // notScroll() {
    //   const windowHeight = window.innerHeight
    //   const bodyElement = document.querySelector('body')
    //   const bodyHeight = bodyElement.clientHeight
    //   console.log(bodyHeight, windowHeight)
    //   console.log(bodyHeight <= windowHeight)
    //   if (bodyHeight <= windowHeight) {
    //     TweenMax.set('html,body', { overflow: 'hidden' })
    //     console.log('hidden')
    //   } else {
    //     TweenMax.set('html,body', { overflow: '' })
    //     console.log('scroll')
    //   }
    //   window.onresize = () => {
    //     this.notScroll()
    //   }
    // }
  }
})
