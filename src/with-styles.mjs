export function withStyles (options) {
  return {
    ...options,
    created () {
      if (options.styles && typeof options.styles === 'function') {
        globalThis.__ficusjs__ = globalThis.__ficusjs__ || {}
        globalThis.__ficusjs__.styles = globalThis.__ficusjs__.styles || {}
        this._injectStyles(options.styles())
      }
      if (options.created) options.created.call(this)
    },
    _isStyleSheet (x) {
      return typeof x === 'object' && x.tagName && x.tagName.toLowerCase() === 'style'
    },
    async _injectStyles (styleItems) {
      if (globalThis.__ficusjs__ && globalThis.__ficusjs__.styles && globalThis.__ficusjs__.styles[this.componentTagName]) return

      globalThis.__ficusjs__.styles[this.componentTagName] = { loaded: false }

      if (
        (Array.isArray(styleItems) && styleItems.filter(x => (typeof x !== 'string' && !this._isStyleSheet(x))).length) ||
        (!Array.isArray(styleItems) && (typeof styleItems !== 'string' && !this._isStyleSheet(styleItems)))
      ) {
        // if this IS an array and any of the elements are NOT a string -> Error
        // if this is NOT an array and also NOT a string -> Error
        console.error('Dude, styles must return a CSS string or an array of CSS strings!')
        return
      }

      let cssToImport
      // styles may be an array
      if (Array.isArray(styleItems)) {
        cssToImport = await Promise.all(styleItems.map(item => this._processStyle(item, this.componentTagName)))
      } else {
        cssToImport = await this._processStyle(styleItems, this.componentTagName)
      }

      globalThis.__ficusjs__.styles[this.componentTagName].styles = cssToImport
      globalThis.__ficusjs__.styles[this.componentTagName].loaded = true
      this.areStylesInjected = true
    },
    _injectStylesheet (style) {
      document.getElementsByTagName('head')[0].appendChild(style)
    },
    async _processStyle (item, tagName) {
      if (this._isStyleSheet(item)) {
        item.setAttribute('data-tag', tagName)
        this._injectStylesheet(item)
        return item
      }

      // if this is an http(s)://**/*.css url, create link element and inject into header
      const linkRegex = /http[s]?:\/\/.+\.css$/
      if (linkRegex.test(item)) {
        const linkElem = document.createElement('link')
        linkElem.rel = 'stylesheet'
        linkElem.type = 'text/css'
        linkElem.href = item
        linkElem.setAttribute('data-tag', tagName)
        document.head.appendChild(linkElem)
        return linkElem
      }

      // if this is a local file, read it and return the contents
      const fileRegex = /.+\.css$/
      if (fileRegex.test(item)) {
        return globalThis.fetch(item).then(css => css.text()).then(cssText => this._createAndInjectStylesheet(cssText, { 'data-tag': tagName }))
      }

      // otherwise, this is (hopefully) raw css so create the styles and return it
      return this._createAndInjectStylesheet(item, { 'data-tag': tagName })
    },
    _createAndInjectStylesheet (cssText, attributes) {
      const style = this._createStyle(cssText)
      this._setElementAttributes(style, attributes)
      this._injectStylesheet(style)
      return style
    },
    _createStyle (cssText) {
      const style = document.createElement('style')
      style.appendChild(document.createTextNode(cssText))
      return style
    },
    _setElementAttributes (element, attributes) {
      if (attributes) {
        Object.keys(attributes).forEach(k => {
          element.setAttribute(k, attributes[k])
        })
      }
    }
  }
}
