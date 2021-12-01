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

      const breakpointListeners = sortedBreakpoints.map((bp, idx) => {
        let query
        if (idx === 0) {
          query = `only screen and (max-width: ${bp}px)`
        } else if (idx === sortedBreakpoints.length - 1) {
          query = `only screen and (min-width: ${parseInt(sortedBreakpoints[idx - 1], 10) + 1}px) and (max-width: ${bp}px)`
          query = `only screen and (min-width: ${parseInt(bp, 10) + 1}px)`
        } else {
          query = `only screen and (min-width: ${parseInt(sortedBreakpoints[idx - 1], 10) + 1}px) and (max-width: ${bp}px)`
        }
        const method = breakpointConfig.breakpoints[bp].method
        return {
          query,
          method,
          listener (e) {
            if (e.matches && self[method]) {
              self.render = self[method]
              self._processRender()
            }
          },
          mediaQueryList: undefined,
          listenerSubscribed: false
        }
      })

      // remove any existing listeners
      self._removeBreakpointListeners()

      // add reactive listeners
      this._breakpointListeners = breakpointListeners
      self._addBreakpointListeners()

      // set the initial render
      breakpointListeners.forEach(m => {
        if (m.mediaQueryList.matches && self[m.method]) {
          self.render = self[m.method]
        }
      })
    }
  }
}
