import { effect } from '@matechs/effect'
import { Decoder } from 'io-ts'

export interface Env {
  env: NodeJS.ProcessEnv
}

export const fromDecoder = <A>(decoder: Decoder<unknown, A>) =>
  effect.accessM(({ env }: Env) => effect.fromEither(decoder.decode(env)))
