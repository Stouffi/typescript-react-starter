import { Kind, URIS, URIS2, Kind2 } from 'morphic-ts/lib/HKT'
import { HKT2 } from 'fp-ts/lib/HKT'
import { Program } from 'morphic-ts/lib/usage/programs-hkt'
import { GetAlgebra, Algebra, Algebra1, Algebra2 } from 'morphic-ts/lib/core'
/**
 * A definition of Algebra to use for some Models (can be extended)
 */
type AllAlgebra = GetAlgebra<
  'Primitive' | 'Intersection' | 'Object' | 'Recursive' | 'Set' | 'StrMap' | 'TaggedUnions'
>
export interface MyAlgebra<F> extends Algebra<AllAlgebra, F> {}
export interface MyAlgebra1<F extends URIS> extends Algebra1<AllAlgebra, F> {}
export interface MyAlgebra2<F extends URIS2> extends Algebra2<AllAlgebra, F> {}
export type MyProgramURI = 'MyProgram'
declare module 'morphic-ts/lib/usage/programs-hkt' {
  interface Program<E, A> {
    MyProgram: <G>(a: MyAlgebra<G>) => HKT2<G, E, A>
  }
  interface Program1<E, A> {
    MyProgram: <G extends URIS>(a: MyAlgebra1<G>) => Kind<G, A>
  }
  interface Program2<E, A> {
    MyProgram: <G extends URIS2>(a: MyAlgebra2<G>) => Kind2<G, E, A>
  }
}
export type MyProgram<E, A> = Program<E, A>[MyProgramURI]
