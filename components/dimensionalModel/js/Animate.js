import { TimelineMax, gsap } from 'gsap' // eslint-disable-line
import { ScrollTrigger } from "gsap/ScrollTrigger";  // eslint-disable-line

class Animate {
  animateMoveDefaultPosition(model, camera) {
    if (model) {
      // console.log(model)
      gsap.to(model.rotation, 2, {
        y: -2 * Math.PI,
        onComplete: () => {
          model.rotation.y = 0
        }
      })
      gsap.to(model.position, 2, {
        x: 0
      })
      gsap.to(camera.position, 2, {
        z: 100,
        x: 0
      })
      // scroll
      gsap.utils.toArray('.link-window').forEach((section, index) => {
        // console.log(section.className)
        gsap.to(model.rotation, {
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            scrub: true
          },
          y: Math.PI * 2
        })
      })
    }
  }

  animateMoveModelFadeOut(model, camera) {
    if (model) {
      gsap.to(model.position, 2, {
        x: -100
      })
      gsap.to(camera.position, 2, {
        z: -100
      })
    }
  }

  animateMoveShowBack(model, camera) {
    if (model) {
      gsap.to(model.rotation, 2, {
        y: 1 * Math.PI
      })
      gsap.to(camera.position, 2, {
        z: 33,
        x: 0
      })
      gsap.to(model.position, 2, {
        x: 0
      })
    }
  }

  animateAboutPage(model, camera) {
    if (model) {
      gsap.to(model.rotation, 2, {
        y: -2 * Math.PI,
        onComplete: () => {
          model.rotation.y = 0
        }
      })
      gsap.to(camera.position, 2, {
        x: -30
      })
    }
  }
}
export default new Animate()
