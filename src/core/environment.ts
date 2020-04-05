/* eslint-disable @typescript-eslint/camelcase */
import { effect } from '@matechs/effect'
import { function as f, pipeable as p } from 'fp-ts'
import { AsOpaque, summon } from 'morphic-ts/lib/batteries/summoner'
import { AType, EType } from 'morphic-ts/lib/usage/utils'
import { fromDecoder } from '../framework/effects/process-env'
import { shortReportInsecure } from './short-report'

const Environment_ = summon(F =>
  F.interface(
    {
      REACT_APP_FIREBASE_apiKey: F.string(),
      REACT_APP_FIREBASE_authDomain: F.string(),
      REACT_APP_FIREBASE_databaseURL: F.string(),
      REACT_APP_FIREBASE_projectId: F.string(),
      REACT_APP_FIREBASE_storageBucket: F.string(),
      REACT_APP_FIREBASE_messagingSenderId: F.string(),
      REACT_APP_FIREBASE_appId: F.string()
    },
    'Environment'
  )
)

export interface Environment extends AType<typeof Environment_> {}
export interface EnvironmentRaw extends EType<typeof Environment_> {}
export const Environment = AsOpaque<EnvironmentRaw, Environment>(Environment_)

export const readEnvironment = p.pipe(
  fromDecoder(Environment.strictType),
  effect.mapError(
    f.flow(
      shortReportInsecure,
      s => console.log('Invalid Environment', s),
      () => 'Invalid Environment'
    )
  )
)

declare global {
  const _env: NodeJS.ProcessEnv
}

export const env = _env
