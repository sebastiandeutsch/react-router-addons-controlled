# react-router-addons-controlled [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

[build-badge]: https://img.shields.io/travis/ReactTraining/react-router-addons-controlled/master.svg?style=flat-square
[build]: https://travis-ci.org/ReactTraining/react-router-addons-controlled

[npm-badge]: https://img.shields.io/npm/v/react-router-addons-controlled.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-router-addons-controlled

# THIS IS EXPERIMENTAL SO IF YOU USE IT AND FIND PROBLEMS THEY ARE YOUR PROBLEMS THAT YOU MUST SOLVE, MAYBE EVEN ALL BY YOURSELF.

[`react-router-addons-controlled`](https://www.npmjs.com/package/react-router-addons-controlled) attempts to treat `<Router>` like a controlled component (think `<input value onChange/>`). Unfortunately, it's not that simple. You can't actually control the browser history, so it's more a two-way data binding situation. However, in the majority of cases, it will feel like a controlled component.

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-router-addons-controlled

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else:

```js
// using an ES6 transpiler, like babel
import BrowserRouter from 'react-router-addons-controlled/ControlledBrowserRouter'

// not using an ES6 transpiler
var BrowserRouter = require('react-router-addons-controlled/ControlledBrowserRouter')
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/react-history/umd/react-router-addons-controlled.min.js"></script>
```

You can find the library on `window.ReactRouterControlled`.

## Usage

`react-router-addons-controlled` ships with 2 different Router components that you can use depending on your environment.

- `<ControlledBrowserRouter>` is for use in modern web browsers that support the [HTML5 history API](http://diveintohtml5.info/history.html) (see [cross-browser compatibility](http://caniuse.com/#feat=history))
- `<ControlledMemoryHistory>` is used as a reference implementation and may also be used in non-DOM environments, like [React Native](https://facebook.github.io/react-native/)

There is no `<ControlledHashRouter>` because hash histories can't provide all of the information we need (I don't think anyway, haven't tried.)

```js
<Router
  history={history}                  // the history object to listen to
                                     
  location={location}                // the location to navigate to

  action={action}                    // the action to use: "PUSH" || "REPLACE", 

  onChange={(location, action) => {  // called when the user clicks
                                     // back/forward buttons
                                     // if you get a "SYNC" action
                                     // YOU MUST ACCEPT IT INTO YOUR STATE
                                     // otherwise it's all busted
  }}

  {...additionalRouterProps}         // all other props supported by the
                                     // uncontrolled "sister" router
/>
```

So, just like with a controlled input, you respond to `onChange` by setting state, or dispatching in redux.

### Examples

Please see the examples for more detailed usage:

- [Redux](/redux-example/index.js)
- [Component State](/manual-tests/index.js)

# DID I MENTION THIS IS EXPERIMENTAL?

