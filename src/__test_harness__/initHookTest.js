import React from 'react'
import { renderHook, act } from 'react-hooks-testing-library'

import { ReduxBundlerProvider } from '..'

export default function initHookTest(hook, store, ...initialHookArguments) {
  let hookArgs = initialHookArguments

  const wrapper = ({ children }) => <ReduxBundlerProvider store={store}>{children}</ReduxBundlerProvider>

  const ref = {
    current: undefined,
    renderCount: 0,
  }

  const { rerender } = renderHook(
    () => {
      ref.current = hook(...hookArgs)
      ref.renderCount += 1
    },
    { wrapper }
  )

  return {
    ref,
    store,
    act,
    rerender: (...nextHookArgs) => {
      hookArgs = nextHookArgs
      rerender()
    },
  }
}
