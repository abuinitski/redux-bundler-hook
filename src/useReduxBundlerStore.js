import { useContext } from 'react'

import { ReduxBundlerContext } from './index'

export default function useReduxBundlerStore() {
  return useContext(ReduxBundlerContext).store
}
