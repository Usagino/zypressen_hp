import Vue from 'vue'
import { TweenMax } from 'gsap'

Vue.mixin({
  mounted() {
    this.notScroll()
  },
  methods: {
    notScroll() {
      const containerClass = document.getElementsByClassName('container')
      const containerClassHeight = containerClass[0].clientHeight
      const windowHeight = window.parent.screen.height
      if (containerClassHeight < windowHeight) {
        TweenMax.set('html,body', { overflow: 'hidden' })
      } else {
        TweenMax.set('html,body', { overflow: 'scroll' })
      }
      window.onresize = () => {
        this.notScroll()
      }
    }
  }
})
