import { createCustomElement, renderer, html, withBreakpointRender } from '../util/component.mjs'

createCustomElement(
  'mock-breakpoint-render',
  withBreakpointRender({
    reactive: true,
    breakpoints: {
      992: { method: 'renderTablet' },
      768: { method: 'renderMobile' },
      1200: { method: 'renderDesktop' }
    }
  }, {
    renderer,
    mounted () {
      console.log('mounted!')
    },
    updated () {
      console.log('updated!')
    },
    renderTablet () {
      return html`<span>Breakpoint render tablet</span>`
    },
    renderMobile () {
      return html`<span>Breakpoint render mobile</span>`
    },
    renderDesktop () {
      return html`<span>Breakpoint render desktop</span>`
    }
  })
)
