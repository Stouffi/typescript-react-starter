import { AsOpaque, AType, summon } from '../framework/summoner'

const Environment_ = summon(F =>
  F.interface(
    {
      apiKey: F.string(),
      authDomain: F.string(),
      databaseURL: F.string(),
      projectId: F.string(),
      storageBucket: F.string(),
      messagingSenderId: F.string(),
      appId: F.string()
    },
    'Environment'
  )
)

export interface Environment extends AType<typeof Environment_> {}
export const Environment = AsOpaque<Environment>(Environment_)
