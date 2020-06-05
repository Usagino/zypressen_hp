import EventBus from "~/utils/event-bus"; // eslint-disable-line

export default async ({ app }) => {
  await app.router.afterEach((to, from) => {
    console.log(to.path, from.path)

    switch (to.path) {
      case '/':
        EventBus.$emit('moveDefaultPosition')
        break
      case '/works':
        EventBus.$emit('moveModelFadeOut')
        break
      case '/about':
        EventBus.$emit('moveTargetHead')
        break
      case '/contact':
        EventBus.$emit('moveShowBack')
        break
    }
  })
}
