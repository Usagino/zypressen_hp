import Common from "./Common";// eslint-disable-line

import * as THREE from "three";  // eslint-disable-line
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'// eslint-disable-line
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'// eslint-disable-line
import { TimelineMax, TweenMax } from 'gsap'// eslint-disable-line

export default class WebglWrap {
  constructor(props) {
    this.props = props
    this.init()
  }

  init() {
    Common.init(this.props.$canvas)
    this.loop()
  }

  resize() {
    Common.resize()
  }

  loop() {
    this.render()
    requestAnimationFrame(this.loop.bind(this))
  }

  render() {
    Common.render()
  }
}
