import { effect } from '@matechs/effect'

export interface Logger {
  log: (s: string, ...args: unknown[]) => effect.Effect<unknown, never, void>
}

export const logWith = (message: string) =>
  effect.chainTap(a => effect.accessM(({ log }: Logger) => log(message, a)))
