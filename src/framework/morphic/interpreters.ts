import { Arbitrary } from 'fast-check/*'
import { either, Either } from 'fp-ts/lib/Either'
import { Eq } from 'fp-ts/lib/Eq'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { Show } from 'fp-ts/lib/Show'
import { Type } from 'io-ts'
import { builderInterpreter } from 'morphic-ts/lib/interpreters/builder/interpreters'
import { eqInterpreter } from 'morphic-ts/lib/interpreters/eq/interpreters'
import { fastCheckInterpreter } from 'morphic-ts/lib/interpreters/fast-check/interpreters'
import { ioTsStringNonStrict } from 'morphic-ts/lib/interpreters/io-ts-string/interpreters'
import { ioTsNonStrict } from 'morphic-ts/lib/interpreters/io-ts/interpreters'
import { JsonSchemaError } from 'morphic-ts/lib/interpreters/json-schema'
import { jsonSchemaInterpreter } from 'morphic-ts/lib/interpreters/json-schema/interpreters'
import { showInterpreter } from 'morphic-ts/lib/interpreters/show/interpreters'
import { JSONSchema } from 'morphic-ts/lib/json-schema/json-schema'
import { ProgramInterpreter } from 'morphic-ts/lib/usage/materializer'
import { MyProgramURI } from './programs'
/**
 * A definition of Interpreters to use for some Models
 */
interface MyInterpreter<E, A> {
  eq: Eq<A>
  show: Show<A>
  arb: Arbitrary<A>
  strictType: Type<A, unknown, unknown>
  type: Type<A, E, unknown>
  jsonSchema: Either<NonEmptyArray<JsonSchemaError>, JSONSchema>
}
export type MyInterpreterURI = 'MyInterpreter'
declare module 'morphic-ts/lib/usage/interpreters-hkt' {
  interface Interpreters<E, A> {
    MyInterpreter: MyInterpreter<E, A>
  }
}
export const MyInterpreter: ProgramInterpreter<MyProgramURI, MyInterpreterURI> = program => ({
  eq: program(eqInterpreter).eq,
  show: program(showInterpreter).show,
  build: program(builderInterpreter).build,
  arb: program(fastCheckInterpreter).arb,
  strictType: program(ioTsNonStrict).type,
  type: program(ioTsStringNonStrict).type,
  jsonSchema: either.map(program(jsonSchemaInterpreter).schema, s => s.json)
})
