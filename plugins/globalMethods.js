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
    },
    notScroll() {
      console.log('✋not scroll')
      function noScroll(event) {
        event.preventDefault()
      }
      document.addEventListener('touchmove', noScroll, { passive: false })
      document.addEventListener('mousewheel', noScroll, { passive: false })
    },
    onScroll() {
      console.log('👌on scroll')
      function noScroll(event) {
        event.preventDefault()
      }
      document.removeEventListener('touchmove', noScroll, { passive: false })
      // スクロール禁止を解除(PC)
      document.removeEventListener('mousewheel', noScroll, { passive: false })
    }
  }
})
