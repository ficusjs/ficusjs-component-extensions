import { html, createCustomElement, renderer, withStyles } from '../util/component.mjs'

createCustomElement(
  'single-style-tag',
  withStyles({
    renderer,
    styles () {
      const cssText = `
        single-style-tag .message {
          background-color: pink;
          color: purple;
          padding: 10px 15px;
        }
      `
      const style = document.createElement('style')
      style.appendChild(document.createTextNode(cssText))
      return style
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
