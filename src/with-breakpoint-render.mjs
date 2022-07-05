export function withBreakpointRender (breakpointConfig, options) {
  return {
    ...options,
    created () {
      this.setBreakpointConfig(breakpointConfig)
      if (options.created) options.created.call(this)
    },
    mounted () {
      this._addBreakpointListeners()
      if (options.mounted) options.mounted.call(this)
    },
    updated () {
      this._addBreakpointListeners()
      if (options.updated) options.updated.call(this)
    },
    removed () {
      this._removeBreakpointListeners()
      if (options.removed) options.removed.call(this)
    },
    _addBreakpointListeners () {
      const self = this
      if (self._breakpointConfig && self._breakpointConfig.reactive) {
        self._breakpointListeners.forEach(m => {
          if (!m.listenerSubscribed) {
            const mediaQueryList = window.matchMedia(m.query)
            mediaQueryList.addEventListener('change', m.listener)
            m.mediaQueryList = mediaQueryList
            m.listenerSubscribed = true
          }
        })
      }
    },
    _removeBreakpointListeners () {
      const self = this
      if (self._breakpointListeners) {
        self._breakpointListeners.forEach(m => {
          if (m.mediaQueryList) {
            m.mediaQueryList.removeEventListener('change', m.listener)
            m.listenerSubscribed = false
          }
        })
      }
    },
    setBreakpointConfig (breakpointConfig) {
      const self = this
      self._breakpointConfig = breakpointConfig

      const sortedBreakpoints = Object.keys(breakpointConfig.breakpoints)
        .sort((a, b) => a - b)

      if (!options.render) {
        throw new Error("Dude, when using breakpoints, you must provide a 'render' method for the smallest screen size")
      }

      const breakpointListeners = sortedBreakpoints.map((bp, idx) => {
        const query = `only screen and (min-width: ${bp}px)`
        const method = breakpointConfig.breakpoints[bp].method
        return {
          query,
          method,
          listener (e) {
            if (e.matches && options[method]) {
              self.render = options[method]
              self._processRender()
            }
          },
          mediaQueryList: undefined,
          listenerSubscribed: false
        }
      })

      // add the default renderer for the smallest screen size
      breakpointListeners.unshift({
        query: `only screen and (max-width: ${sortedBreakpoints[0] - 1}px)`,
        method: 'render',
        listener (e) {
          if (e.matches) {
            self.render = options.render
            self._processRender()
          }
        },
        mediaQueryList: undefined,
        listenerSubscribed: false
      })

      // remove any existing listeners
      self._removeBreakpointListeners()

      // add reactive listeners
      this._breakpointListeners = breakpointListeners
      self._addBreakpointListeners()

      // set the initial render
      breakpointListeners.forEach(m => {
        if (m.mediaQueryList.matches && options[m.method]) {
          self.render = options[m.method]
        }
      })
    }
  }
}
