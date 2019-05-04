import React from 'react'

import ReduxBundlerContext from './ReduxBundlerContext'

export default function ReduxBundlerProvider({ store, children }) {
  return React.createElement(ReduxBundlerContext.Provider, { value: { store } }, children)
}
