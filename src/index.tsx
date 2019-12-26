import { effect } from '@matechs/effect'
import { fold } from '@matechs/effect/lib/exit'
import * as firebase from 'firebase/app'
import { constVoid } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './App'
import { Environment } from './core/environment'
import { fromDecoder } from './framework/effects/process-env'

const startApp = effect.sync(() => {
  const rootEl = document.createElement('div')
  rootEl.id = 'root'
  document.body.appendChild(rootEl)
  ReactDOM.render(<App />, rootEl)
})

const initializeFirebase = (e: Environment) => firebase.initializeApp(e)

export const program = pipe(
  fromDecoder(Environment.strictType),
  effect.map(initializeFirebase),
  effect.chain(() => startApp),
  effect.provide(process),
  effect.runToPromiseExit,
  async pro => {
    const exit = await pro
    return fold(
      constVoid,
      err => console.log(err),
      err => console.log(err),
      () => console.log('Starting App Interrupted')
    )(exit)
  }
)
