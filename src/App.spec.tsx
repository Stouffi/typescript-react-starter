import { render } from '@testing-library/react'
import * as firebase from 'firebase'
import 'firebase/auth'
import { constNull } from 'fp-ts/lib/function'
import * as React from 'react'
import { App } from './App'
import { SignInContext } from './auth/SignIn'

jest.mock('./auth/SignIn', () => ({ SignInContext: jest.fn(constNull) }))

describe('App', () => {
  test('mount', () => {
    firebase.initializeApp({ apiKey: process.env.REACT_APP_FIREBASE_apiKey })
    const auth = firebase.auth()
    const spy = jest.spyOn(auth, 'onAuthStateChanged')
    // Implemented as immediately signed out
    spy.mockImplementation(nextOrObserver =>
      typeof nextOrObserver === 'function' ? nextOrObserver(null as any) : nextOrObserver.next(null)
    )
    render(<App auth={auth} />)
    expect(SignInContext).toHaveBeenCalled()
    spy.mockRestore()
  })
})
