<template lang="pug">
  .container.works-page
    .works--thumbnail
      button.button.button--top(@click="countTop()") あげて
      button.button.button--bottom(@click="countBottom()") さげて
      .works--thumbnail__wrap(v-for="(item,index) in WORKS" :key="item.id" v-show="index === currentNum")
        img.works--thumbnail__wrap--img(:src="item.THUMBNAIL.url")
</template>

<script>
import axios from 'axios' // eslint-disable-line
import { TimelineMax, TweenMax } from 'gsap' // eslint-disable-line
import inView from 'in-view' // eslint-disable-line
export default {
  async asyncData() {
    const { data } = await axios.get(
      'https://zypressen.microcms.io/api/v1/works',
      {
        headers: { 'X-API-KEY': process.env.CMSKEY }
      }
    )
    return {
      WORKS: data.contents
    }
  },
  data() {
    return {
      WORKS: [],
      currentNum: 0
    }
  },
  mounted() {
    console.log(this.WORKS)
  },
  methods: {
    countToggleTop() {
      return this.currentNum >= this.WORKS.length - 1
    },
    countToggleBottom() {
      return this.currentNum === 0
    },
    countTop() {
      if (this.countToggleTop()) {
        this.currentNum = 0
      } else {
        this.currentNum += 1
      }
    },
    countBottom() {
      if (this.countToggleBottom()) {
        this.currentNum = this.WORKS.length - 1
      } else {
        this.currentNum -= 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  position: fixed;
  right: $pri-value;
  color: $color-orange;
  &--top {
    bottom: $pri-value * 2;
  }
  &--bottom {
    bottom: $pri-value;
  }
}
.works-page {
  @include full-screen;
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
}
.works {
  &--thumbnail {
    width: 50vw;
    height: 100vh;
    &__wrap {
      width: 50vw;
      height: 100vh;
      &--img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
