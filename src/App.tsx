import * as React from 'react'
import { add } from './math'

export const App: React.FC = () => <div>Hello the result is {add(1)(2)}</div>
