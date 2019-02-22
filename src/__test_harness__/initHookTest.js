import React from 'react'
import { testHook as hookTestingHarness } from 'react-testing-library'

import { ReduxBundlerProvider } from '..'

export default function initHookTest(hook, store, ...initialHookArguments) {
  let hookArgs = initialHookArguments

  const wrapper = ({ children }) => <ReduxBundlerProvider store={store}>{children}</ReduxBundlerProvider>

  const ref = {
    current: undefined,
    renderCount: 0,
  }

  const { rerender } = hookTestingHarness(
    () => {
      ref.current = hook(...hookArgs)
      ref.renderCount += 1
    },
    { wrapper }
  )

  return {
    ref,
    store,
    rerender: (...nextHookArgs) => {
      hookArgs = nextHookArgs
      rerender()
    },
  }
}
