import { html, createCustomElement, renderer, withStyles } from '../util/component.mjs'

createCustomElement(
  'single-link',
  withStyles({
    renderer,
    styles () {
      return 'http://localhost:8080/test/e2e/with-styles/css/link.css'
    },
    render () {
      return html`<div>
        <div class="message">
          <h2>This is another message</h2>
        </div>
      </div>`
    }
  })
)
