import { render } from '@testing-library/react'
import * as React from 'react'
import { App } from './App'

describe('App', () => {
  test('mount', () => {
    const { getByText } = render(<App />)
    getByText(/Hello the result/)
  })
})
