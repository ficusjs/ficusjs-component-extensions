import { html, createCustomElement, renderer, withStyles } from '../util/component.mjs'

createCustomElement(
  'multiple-styles',
  withStyles({
    renderer,
    styles () {
      return [
        'http://localhost:8080/test/e2e/with-styles/css/all.min.css',
        `
        multiple-styles .message {
          background-color: yellow;
          color: black;
          padding: 10px 15px;
        }
        `
      ]
    },
    render () {
      return html`<div>
        <div class="message">
          <h2><i class="fas fa-user"></i> This is a message</h2>
        </div>
      </div>`
    }
  })
)
