import Vue from 'vue' // eslint-disable-line
import EventBus from "~/utils/event-bus"; // eslint-disable-line
import { gsap } from 'gsap' // eslint-disable-line

export default async ({ app, params }) => {
  await app.router.afterEach((to, from) => {
    EventBus.$emit('passingThePath', to.name)
  })
}
