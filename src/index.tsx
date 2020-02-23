import { effect } from '@matechs/effect'
import * as firebase from 'firebase/app'
import { pipe } from 'fp-ts/es6/pipeable'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './App'
import { Environment, readEnvironment } from './core/environment'

const startApp = effect.sync(() => {
  const rootEl = document.createElement('div')
  rootEl.id = 'root'
  document.body.appendChild(rootEl)
  ReactDOM.render(<App />, rootEl)
})

const initializeFirebase: (e: Environment) => firebase.app.App = firebase.initializeApp

export const program = pipe(
  readEnvironment,
  effect.map(initializeFirebase),
  effect.chain(() => startApp),
  effect.provide(process),
  effect.run
)

console.log(process.env.FIREBASE_apiKey)
console.log(process.env)
