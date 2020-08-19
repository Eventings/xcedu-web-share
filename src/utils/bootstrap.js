
function boot(store, router, Root) {
  if (typeof window.Vue === 'undefined') {
    throw new ReferenceError('No Gobal Vue found!')
  }

  VuexRouterSync.sync(store, router)

  let bootstrap
  let mount
  let unmount

  const options = {
    router,
    store,
    render(h) {
      return h(Root)
    }
  }

  if (window.singleSpaNavigate && window.singleSpaVue) {
    const vueLifecycles = window.singleSpaVue({
      Vue,
      appOptions: options
    })
    bootstrap = vueLifecycles.bootstrap
    mount = vueLifecycles.mount
    unmount = vueLifecycles.unmount
  } else {
    new Vue(options).$mount('#app')
  }

  return { bootstrap, mount, unmount }
}

export default boot
