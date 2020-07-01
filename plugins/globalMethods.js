import Vue from 'vue'
// import { TweenMax } from 'gsap'

Vue.mixin({
  methods: {
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
