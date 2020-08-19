;!function () {
  if (typeof window.Vue === 'undefined') {
    return
  }
  const toQueryString = params => Object.keys(params).reduce((target, key) => {
    target.push(`${key}=${query[key]}`)
    return target
  }, []).join('&')

  Vue.mixin({
    beforeMount () {
      const { asyncData } = this.$options
      if (asyncData) {
        asyncData({ store: this.$store, route: this.$route })
      }
    },
    beforeRouteUpdate (to, from, next) {
      const { asyncData } = this.$options
      if (asyncData) {
        asyncData({ store: this.$store, route: to })
      }
      next()
    }
  })

  Vue.mixin({
    methods: {
      navigateToUrl(url, params = {}) {
        const querystr = toQueryString(params)
        const fullUrl = querystr ? `${url}?${querystr}` : url
        if (window.singleSpaNavigate) {
          window.singleSpa.navigateToUrl(fullUrl)
        } else {
          const protocol = location.protocol
          const host = location.host
          location.href = `${protocol}//${host}${fullUrl}`
        }
      }
    },
  })
}()
