import { createCustomElement, renderer, html, withLazyRender } from '../util/component.mjs'

createCustomElement(
  'mock-lazy-empty',
  withLazyRender({
    renderer,
    mounted () {
      console.log('mounted!')
    },
    updated () {
      console.log('updated!')
    },
    render () {
      return this.elementVisible
        ? html`<span>Lazy rendered component with no initial content</span>`
        : ''
    }
  })
)

createCustomElement(
  'mock-lazy-loader',
  withLazyRender({
    renderer,
    mounted () {
      console.log('mounted!')
    },
    updated () {
      console.log('updated!')
    },
    render () {
      return this.elementVisible
        ? html`<span>Lazy rendered component with placeholder</span>`
        : html`<span>Placeholder</span>`
    }
  })
)
