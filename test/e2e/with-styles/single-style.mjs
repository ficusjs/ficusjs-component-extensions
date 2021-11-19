import { html, createCustomElement, renderer, withStyles } from '../util/component.mjs'

createCustomElement(
  'single-style',
  withStyles({
    renderer,
    styles () {
      return `
        single-style .message {
          background-color: green;
          color: white;
          padding: 10px 15px;
        }
      `
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
