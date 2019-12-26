import { effect } from '@matechs/effect'
import { Decoder } from 'io-ts'

export const fromDecoder = <A>(decoder: Decoder<unknown, A>) =>
  effect.accessM(({ env }: NodeJS.Process) => effect.fromEither(decoder.decode(env)))
