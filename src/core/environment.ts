/* eslint-disable @typescript-eslint/camelcase */
import { effect } from '@matechs/effect'
import { flow } from 'fp-ts/es6/function'
import { pipe } from 'fp-ts/es6/pipeable'
import { AsOpaque, summon } from 'morphic-ts/lib/batteries/summoner'
import { AType, EType } from 'morphic-ts/lib/usage/utils'
import { fromDecoder } from '../framework/effects/process-env'
import { shortReportInsecure } from './short-report'

const Environment_ = summon(F =>
  F.interface(
    {
      FIREBASE_apiKey: F.string(),
      FIREBASE_authDomain: F.string(),
      FIREBASE_databaseURL: F.string(),
      FIREBASE_projectId: F.string(),
      FIREBASE_storageBucket: F.string(),
      FIREBASE_messagingSenderId: F.string(),
      FIREBASE_appId: F.string()
    },
    'Environment'
  )
)

export interface Environment extends AType<typeof Environment_> {}
export interface EnvironmentRaw extends EType<typeof Environment_> {}
export const Environment = AsOpaque<EnvironmentRaw, Environment>(Environment_)

export const readEnvironment = pipe(
  fromDecoder(Environment.strictType),
  effect.mapError(
    flow(
      shortReportInsecure,
      s => console.log('Invalid Environment', s),
      () => 'Invalid Environment'
    )
  )
)

declare const _env: NodeJS.ProcessEnv

export const env = _env
