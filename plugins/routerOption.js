import Vue from 'vue' // eslint-disable-line
import EventBus from "~/utils/event-bus"; // eslint-disable-line
import { gsap } from 'gsap' // eslint-disable-line
import { ScrollTrigger } from "gsap/ScrollTrigger";  // eslint-disable-line

export default async ({ app, params }) => {
  await app.router.afterEach((to, from) => {
    EventBus.$emit('passingThePath', to.name)
    switch (to.name) {
      case 'index':
        EventBus.$emit('moveDefaultPosition')
        break
      case 'works':
        EventBus.$emit('moveModelFadeOut')
        break
      case 'about':
        EventBus.$emit('animateAboutPage')
        break
      case 'contact':
        EventBus.$emit('moveShowBack')
        break
    }
  })
}
