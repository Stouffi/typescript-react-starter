import { option } from 'fp-ts'
import * as React from 'react'
import { withContextGuard } from '../framework/context/safe-context'

export interface StartAppEnv {
  auth: firebase.auth.Auth
}

export const StartAppEnvContext = React.createContext<option.Option<StartAppEnv>>(option.none)

export const withStartAppEnvGuard = withContextGuard(StartAppEnvContext)
