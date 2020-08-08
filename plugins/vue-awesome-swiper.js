import Vue from 'vue'
import {
  Swiper as SwiperClass,
  Pagination,
  Mousewheel,
  Autoplay,
  EffectFade
} from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
SwiperClass.use([Pagination, Mousewheel, Autoplay, EffectFade])
Vue.use(getAwesomeSwiper(SwiperClass))
Vue.use(VueAwesomeSwiper)
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass) // eslint-disable-line
