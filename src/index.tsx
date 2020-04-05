import { effect, exit } from '@matechs/effect'
import 'antd/dist/antd.css'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { function as f, option, pipeable as p } from 'fp-ts'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContext } from './App'
import { StartAppEnv, StartAppEnvContext } from './contexts/start-app-env'
import { env, Environment, readEnvironment } from './core/environment'

const startApp = (e: StartAppEnv) => {
  const rootEl = document.createElement('div')
  rootEl.id = 'root'
  document.body.appendChild(rootEl)
  ReactDOM.render(
    <StartAppEnvContext.Provider value={option.some(e)}>
      <AppContext />
    </StartAppEnvContext.Provider>,
    rootEl
  )
}

interface FirebaseInitializeAppOptions {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

const stripEnvVarsPrefix = (e: Environment): FirebaseInitializeAppOptions => ({
  apiKey: e.REACT_APP_FIREBASE_apiKey,
  authDomain: e.REACT_APP_FIREBASE_authDomain,
  databaseURL: e.REACT_APP_FIREBASE_databaseURL,
  projectId: e.REACT_APP_FIREBASE_projectId,
  storageBucket: e.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: e.REACT_APP_FIREBASE_messagingSenderId,
  appId: e.REACT_APP_FIREBASE_appId
})

export const initializeFirebase: (e: Environment) => firebase.app.App = f.flow(
  stripEnvVarsPrefix,
  firebase.initializeApp
)

const toStartAppEnv = (app: firebase.app.App): StartAppEnv => ({ auth: app.auth() })

const getStartAppEnv = p.pipe(
  readEnvironment,
  effect.map(
    f.flow(initializeFirebase, toStartAppEnv, startApp, e => {
      console.log(JSON.stringify(e))
      return e
    })
  )
)

export const program = p.pipe(getStartAppEnv, effect.provide({ env }), eff =>
  effect.run(eff, ex => {
    exit.isDone(ex) || console.log('Program exited with error', ex)
  })
)
