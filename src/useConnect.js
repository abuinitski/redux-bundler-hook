import { useContext, useEffect, useState, useMemo } from 'react'

import ReduxBundlerContext from './ReduxBundlerContext'

export default function useConnect(...args) {
  const { store } = useContext(ReduxBundlerContext)

  const [keysToWatch, actions] = useMemo(() => cookArguments(store, args), args)

  const [state, setState] = useState(() => store.select(keysToWatch))

  useEffect(
    () =>
      store.subscribeToSelectors(keysToWatch, changes => {
        setState(currentState => ({ ...currentState, ...changes }))
      }),
    [keysToWatch]
  )

  return {
    ...actions,
    ...state,
  }
}

function cookArguments(store, args) {
  const keysToWatch = []
  const actions = {}

  args.forEach(keyName => {
    if (keyName.slice(0, 6) === 'select') {
      keysToWatch.push(keyName)
      return
    }

    if (keyName.slice(0, 2) === 'do') {
      actions[keyName] = (...args) => {
        if (store.action) {
          return store.action(keyName, args)
        }
        return store[keyName](...args)
      }
      return
    }

    throw Error(`Can Not Connect: ${keyName}`)
  })

  return [keysToWatch, actions]
}
