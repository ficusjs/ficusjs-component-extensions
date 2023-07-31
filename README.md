# FicusJS component extensions

Functions for extending components.

For documentation visit [https://docs.ficusjs.org/extending-components/](https://docs.ficusjs.org/extending-components/)

## Getting started

The `withBreakpointRender` function extends a component to render different content based on the current breakpoint.

```js
// import it with all other features
import { createCustomElement, withBreakpointRender } from 'https://cdn.skypack.dev/ficusjs@6'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// define a breakpoint configuration
const breakpointConfig = {
  reactive: false,
  breakpoints: {
    992: { method: 'renderTablet' },
    768: { method: 'renderMobile' },
    1200: { method: 'renderDesktop' }
  }
}

// create the component
createCustomElement(
  'breakpoint-component',
  withBreakpointRender(breakpointConfig, {
    renderer,
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
```

The `withLazyRender` function extends a component to render content lazily.

```js
// import it with all other features
import { createCustomElement, withLazyRender } from 'https://cdn.skypack.dev/ficusjs@6'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// as there is no initial content rendered, the `mounted` method
// is triggered when the component is visible
createCustomElement(
  'lazy-component',
  withLazyRender({
    renderer,
    render () {
      return this.elementVisible
        ? html`<button type="button">A styled button</button>`
        : ''
    },
    mounted () {
      // when elementVisible changes this will be called so we can load extra stuff we need
    }
  })
)

// as there is initial rendered content, the `updated` method
// is triggered when the component is visible
createCustomElement(
  'lazy-component-with-placeholder',
  withLazyRender({
    renderer,
    render () {
      return this.elementVisible
        ? html`<button type="button">A styled button</button>`
        : '<span class="placeholder"></span>'
    },
    updated () {
      // when elementVisible changes this will be called so we can load extra stuff we need
    }
  })
)
```

The `withStyles` function extends a component to add scoped styles.

```js
// import it with all other features
import { createCustomElement, withStyles } from 'https://cdn.skypack.dev/ficusjs@6'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// import the css tagged template literal
import { css } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/css'

createCustomElement(
  'my-component',
  withStyles({
    renderer,
    styles () {
      return css`
        my-component button {
          background-color: yellow;
          color: black;
        }
      `
    },
    render () {
      return html`<button type="button">A styled button</button>`
    }
  })
)
```

## Installation

FicusJS component extensions is part of [FicusJS](https://docs.ficusjs.org) but can also be installed independently in a number of ways.

### CDN

We recommend using native ES modules in the browser.

```html
<script type="module">
  import { withBreakpointRender, withLazyRender, withStyles } from 'https://cdn.skypack.dev/@ficusjs/component-extensions'
</script>
```

FicusJS component extensions is available on [Skypack](https://www.skypack.dev/view/@ficusjs/component-extensions).

### NPM

FicusJS component extensions works nicely with build tools such as Snowpack, Webpack or Rollup. If you are using a NodeJS tool, you can install the NPM package.

```bash
npm install @ficusjs/component-extensions
```

### Available builds

FicusJS component extensions only provides ES module builds. For legacy browsers or alternative modules such as CommonJS, it is recommended to use a build tool to transpile the code.

## Development

How to set-up FicusJS component extensions for local development.

1. Clone the repository:

```bash
git clone https://github.com/ficusjs/ficusjs-component-extensions.git
```

2. Change the working directory

```bash
cd ficusjs-component extensions
```

3. Install dependencies

```bash
npm install
```

4. Run the local development server

```bash
npm run dev
```

That's it! Now open http://localhost:8080 to see a local app.

## License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## Contributing to FicusJS component extensions

Any kind of positive contribution is welcome! Please help us to grow by contributing to the project.

If you wish to contribute, you can work on any features you think would enhance the library. After adding your code, please send us a Pull Request.

> Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our [CODE OF CONDUCT](CODE_OF_CONDUCT.md), and the process for submitting pull requests to us.

## Support

We all need support and motivation. FicusJS is not an exception. Please give this project a ⭐️ to encourage and show that you liked it. Don't forget to leave a star ⭐️ before you move away.

If you found the library helpful, please consider [sponsoring us](https://github.com/sponsors/ficusjs).
