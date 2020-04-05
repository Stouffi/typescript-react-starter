import { option, pipeable as p } from 'fp-ts'
import * as React from 'react'

export const withContextGuard = <C extends object>(Context: React.Context<option.Option<C>>) => <
  CP extends object
>(
  f: (c: C) => CP
) => <P extends object>(Wrapped: React.FC<P & CP>): React.FC<P> => props =>
  p.pipe(
    React.useContext(Context),
    option.map(c => <Wrapped {...f(c)} {...props} />),
    option.toNullable
  )
