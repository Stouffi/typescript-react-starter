import { Spin } from 'antd'
import { function as f, option } from 'fp-ts'
import { makeADT, ofType } from 'morphic-ts/lib/adt'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { SignInContext } from './auth/SignIn'
import { withStartAppEnvGuard } from './contexts/start-app-env'
import { Nothing, Waiting } from './framework/adt/variant'

interface ContextProps {
  auth: firebase.auth.Auth
}

interface HasUser {
  type: 'HasUser'
  user: firebase.User
}

const ResourceUser = makeADT('type')({
  Nothing: ofType<Nothing>(),
  Waiting: ofType<Waiting>(),
  HasUser: ofType<HasUser>()
})

const nothing = ResourceUser.of.Nothing({})
const waiting = ResourceUser.of.Waiting({})

const toUserOrUndefined = f.flow(
  option.fromPredicate(ResourceUser.is.HasUser),
  option.map(({ user }) => user),
  option.toUndefined
)

export const App: React.FC<ContextProps> = ({ auth }) => {
  const [userState, setUser] = useState(waiting)
  useEffect(
    () =>
      auth.onAuthStateChanged(
        f.flow(
          option.fromNullable,
          option.fold(
            () => nothing,
            user => ResourceUser.of.HasUser({ user })
          ),
          setUser
        )
      ),
    [toUserOrUndefined(userState)]
  )
  return ResourceUser.match({
    HasUser: ({ user }) => <p>Hello {user.displayName ?? 'you'}</p>,
    Nothing: () => <SignInContext />,
    Waiting: () => <Spin />
  })(userState)
}

export const AppContext = withStartAppEnvGuard(f.identity)(App)
