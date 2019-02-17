import React from 'react'

import ReduxBundlerContext from './ReduxBundlerContext'

export { default as useConnect } from './useConnect'

export const ReduxBundlerProvider = ({ store, children }) =>
  React.createElement(ReduxBundlerContext.Provider, { value: { store } }, children)
