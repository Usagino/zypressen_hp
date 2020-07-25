export default {
  data: () => ({
    style: {
      '--wh': '100vh'
    }
  }),
  mounted() {
    this.$nextTick(() => {
      this.getWindowSize()
      window.addEventListener('resize', this.getWindowSize)
    })
  },
  methods: {
    getWindowSize() {
      this.style['--wh'] = `${window.innerHeight}px`
    }
  }
}
