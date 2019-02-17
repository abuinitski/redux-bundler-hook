# Redux-Bundler Hook

![](https://img.shields.io/npm/v/redux-bundler-hook.svg)![](https://img.shields.io/npm/dt/:packageName.svg)

React.js bindings to Henrik Joreteg's [redux-bundler](https://github.com/HenrikJoreteg/redux).

See redux-bundler documentation at https://reduxbundler.com/

## Installation

```
npm install redux-bundler-hook
```

## Usage

### wrap your React app with a provider

```javascript
import { hydrate } from 'react-dom'
import { ReduxBundlerProvider } from 'redux-bundler-hook'

import createStore from '../bundles'

const store = createStore()

hydrate(
  <ReduxBundlerProvider store={store}>
    <App />
  </ReduxBundlerProvider>,
  document.getElementById('root')
)
```

### use the hook in your components

```javascript
import { useConnect } from 'redux-bundler-hook'

import AppLayout from './AppLayout'

export default function App() {
  const {
    route: { component: RoutedComponent },
    colorScheme,
    doSetColorScheme,
  } = useConnect('selectRoute', 'selectColorScheme', 'doSetColorScheme')

  return (
    <AppLayout>
      <RoutedComponent colorScheme={colorScheme} onSetColorScheme={doSetColorScheme} />
    </AppLayout>
  )
}
```
