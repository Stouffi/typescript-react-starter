import { cacheUnaryFunction } from 'morphic-ts/lib/core'
import { Materialized } from 'morphic-ts/lib/usage/materializer'
import { makeSummoner } from 'morphic-ts/lib/usage/summoner'
import { makeTagged } from 'morphic-ts/lib/usage/tagged-union'
import { MyInterpreter, MyInterpreterURI } from './morphic/interpreters'
import { MyProgram, MyProgramURI } from './morphic/programs'
/**
 * The definition of instanciation (applies an Interpreter to a specific Program based on an Algebra)
 */
export interface M<E, A> extends Materialized<E, A, MyProgramURI, MyInterpreterURI> {
  _E: E
  _A: A
}
export interface UM<A> extends M<unknown, A> {}
export type AType<X extends M<any, any>> = X['_A']
export type EType<X extends M<any, any>> = X['_E']
export interface MyProg<L, A> extends MyProgram<L, A> {}
interface Summons {
  summonAs: <L, A>(F: MyProg<L, A>) => M<L, A>
  summonAsA: <A>() => <L>(F: MyProg<L, A>) => M<L, A>
  summonAsL: <L>() => <A>(F: MyProg<L, A>) => M<L, A>
  summon: <A>(F: MyProg<unknown, A>) => UM<A>
}
export const { summonAs, summonAsA, summonAsL, summon } = makeSummoner<
  MyProgramURI,
  MyInterpreterURI
>(cacheUnaryFunction, MyInterpreter) as Summons
/**
 * creates a tagged Variants from several Types.
 */
export const tagged = makeTagged<MyProgramURI, MyInterpreterURI>(summon)
export const AsOpaque = <O>(x: UM<O>): UM<O> => x
