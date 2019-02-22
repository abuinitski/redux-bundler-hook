import React from 'react'
import { composeBundlesRaw } from 'redux-bundler'
import { act } from 'react-testing-library'

import initHookTest from '../__test_harness__/initHookTest'

import { useConnect } from '../index'

describe('useConnect hook', () => {
  const createStore = composeBundlesRaw(
    {
      name: 'itemOne',
      reducer: (state = { data: 'Item1' }, action) => {
        if (action.type === 'ITEM_ONE_CHANGED') {
          return { ...state, data: action.payload }
        }
        return state
      },
      selectItemOne: state => state.itemOne.data,
      doChangeItemOne: nextValue => ({ type: 'ITEM_ONE_CHANGED', payload: nextValue }),
    },
    {
      name: 'itemTwo',
      reducer: (state = { data: 'Item2' }, action) => {
        if (action.type === 'ITEM_TWO_CHANGED') {
          return { ...state, data: action.payload }
        }
        return state
      },
      selectItemTwo: state => state.itemTwo.data,
      doChangeItemTwo: nextValue => ({ type: 'ITEM_TWO_CHANGED', payload: nextValue }),
    }
  )

  const initUseConnectTest = (...args) => initHookTest(useConnect, createStore(), ...args)

  test('is able to select data from the store', () => {
    const { ref } = initUseConnectTest('selectItemOne', 'selectItemTwo')

    expect(ref.current.itemOne).toBe('Item1')
    expect(ref.current.itemTwo).toBe('Item2')
  })

  test('reflects external changes in store', () => {
    const { ref, store } = initUseConnectTest('selectItemOne', 'selectItemTwo')

    expect(ref.current.itemOne).toBe('Item1')

    act(() => {
      store.doChangeItemOne('Item1-Changed')
    })
    expect(ref.current.itemOne).toBe('Item1-Changed')
  })

  test('allows to select actions', () => {
    const { ref } = initUseConnectTest('selectItemOne', 'doChangeItemOne')

    act(() => {
      ref.current.doChangeItemOne('Item1-Changed')
    })
    expect(ref.current.itemOne).toBe('Item1-Changed')
  })

  test('does not re-render when not needed', () => {
    const { ref } = initUseConnectTest('selectItemOne', 'doChangeItemOne', 'doChangeItemTwo')
    expect(ref.renderCount).toBe(1)

    act(() => {
      ref.current.doChangeItemOne('Item1-Changed')
    })
    expect(ref.renderCount).toBe(2)

    act(() => {
      ref.current.doChangeItemTwo('Item2-Changed')
    })
    expect(ref.renderCount).toBe(2)
  })

  test('it adapts when arguments change', () => {
    const { ref, rerender } = initUseConnectTest('selectItemOne')

    expect(ref.current.itemOne).not.toBeUndefined()
    expect(ref.current.itemTwo).toBeUndefined()

    act(() => {
      rerender('selectItemTwo')
    })

    console.log(ref.current)
    expect(ref.current.itemOne).toBeUndefined()
    expect(ref.current.itemTwo).not.toBeUndefined()
    expect(ref.renderCount).toBe(3) // can't avoid one extra re-render in this case
  })
})
