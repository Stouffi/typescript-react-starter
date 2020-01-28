import { last, lookup } from 'fp-ts/es6/Array'
import { fold, isSome } from 'fp-ts/es6/Option'
import { pipe } from 'fp-ts/es6/pipeable'
import { ValidationError } from 'io-ts'

/**
 * The insecure variant of `shortReport` which may leak sensitive information.
 * To use only in development.
 *
 * @param errors
 */
export const shortReportInsecure = (errors: ValidationError[]): string =>
  errors
    .map(error => {
      const contextArray = new Array(...error.context)
      const expectedType = last(contextArray)
      const outerType = lookup(contextArray.length - 2, contextArray)

      const msg = `${error.context.map(c => c.key).join('/')}: expecting type <${pipe(
        expectedType,
        fold(
          () => 'UNKNOWN',
          x => x.type.name
        )
      )}> ${
        isSome(outerType) ? `in Type ${outerType.value.type.name}` : ''
      } Got value <${JSON.stringify(error.value)}>, type: ${typeof error.value}`
      return msg
    })
    .join('\n')

/**
 * A short reporter made to report less verbose (so, more readable) messages than native `io-ts` `PathReporter`.
 * @param errors
 */
export const shortReport = (errors: ValidationError[]): string =>
  errors
    .map(error => {
      const contextArray = new Array(...error.context)
      const expectedType = last(contextArray)
      const outerType = lookup(contextArray.length - 2, contextArray)

      const msg = `${error.context.map(c => c.key).join('/')}: expecting type <${pipe(
        expectedType,
        fold(
          () => 'UNKNOWN',
          x => x.type.name
        )
      )}> ${isSome(outerType) ? `in Type ${outerType.value.type.name}` : ''} Got invalid value`
      return msg
    })
    .join('\n')
