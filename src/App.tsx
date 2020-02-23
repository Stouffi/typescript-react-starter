import * as React from 'react'
import { add } from './math'

export const App: React.FC = () => <div>Hello the result is {add(1)(3)}</div>
