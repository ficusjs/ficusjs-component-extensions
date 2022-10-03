import { createCustomElement, renderer, html, withBreakpointRender } from '../util/component.mjs'

createCustomElement(
  'mock-breakpoint-render',
  withBreakpointRender({
    reactive: true,
    breakpoints: {
      768: { method: 'renderTablet' },
      992: { method: 'renderSmallDesktop' },
      1200: { method: 'renderLargeDesktop' }
    }
  }, {
    renderer,
    mounted () {
      console.log('mounted!')
    },
    updated () {
      console.log('updated!')
    },
    renderSmallDesktop () {
      return html`<span>Breakpoint render small desktop</span>`
    },
    renderTablet () {
      return html`<span>Breakpoint render tablet</span>`
    },
    renderLargeDesktop () {
      return html`<span>Breakpoint render large desktop</span>`
    },
    render () {
      return html`<span>Breakpoint render mobile</span>`
    }
  })
)
