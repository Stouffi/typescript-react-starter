import { AsOpaque } from 'morphic-ts/lib/batteries/interpreters-BAST'
import { summon } from 'morphic-ts/lib/batteries/summoner'
import { AType, EType } from 'morphic-ts/lib/usage/utils'

const Nothing_ = summon(F =>
  F.interface(
    {
      type: F.stringLiteral('Nothing')
    },
    'Nothing'
  )
)
export interface Nothing extends AType<typeof Nothing_> {}
export interface NothingRaw extends EType<typeof Nothing_> {}
export const Nothing = AsOpaque<NothingRaw, Nothing>(Nothing_)

const Waiting_ = summon(F =>
  F.interface(
    {
      type: F.stringLiteral('Waiting')
    },
    'Waiting'
  )
)
export interface Waiting extends AType<typeof Waiting_> {}
export interface WaitingRaw extends EType<typeof Waiting_> {}
export const Waiting = AsOpaque<WaitingRaw, Waiting>(Waiting_)
