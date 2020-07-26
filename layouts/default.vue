<template lang="pug">
  .page
    nuxt
</template>

<script>
import deviceMixin from '@/assets/js/device'
import EventBus from '@/utils/event-bus' // eslint-disable-line

export default {
  mixins: [deviceMixin],
  mounted() {
    // addEventListener('keydown', (event) => {
    //   console.log(event.code)
    // })
    const babseStyle = [
      'padding:4px 12px',
      'font-size: 8px',
      'border:1px solid #020202'
    ]
    const textStyle = [
      ...babseStyle,
      'background-color: #020202',
      'color: white',
      'border-right: none'
    ].join(';')
    const iconStyle = [
      ...babseStyle,
      'text-decoration: none;',
      'background-color: #5e5e5e',
      'border-right: none',
      'border-left: none',
      'padding:4px 2px'
    ].join(';')
    const linkStyle = [...babseStyle, 'border-left: none'].join(';')

    console.log(
      '%cMADE WITH BY ZYPRESSEN%c🌲%chttps://zypressen.org',
      textStyle,
      iconStyle,
      linkStyle
    )
  },
  methods: {}
}
</script>

<style lang="scss">
html {
  background: $color-black;
}
</style>
