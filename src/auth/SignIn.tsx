import { log, provideConsole } from '@matechs/console'
import { effect } from '@matechs/effect'
import { Button, Form, Input } from 'antd'
import * as firebase from 'firebase'
import { function as f, option, pipeable as p } from 'fp-ts'
import { AsOpaque, summon } from 'morphic-ts/lib/batteries/summoner'
import { AType, EType } from 'morphic-ts/lib/usage/utils'
import * as React from 'react'
import { withStartAppEnvGuard } from '../contexts/start-app-env'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}

const SignInData_ = summon(F =>
  F.interface(
    {
      username: F.string(),
      password: F.string()
    },
    'SignInData'
  )
)

export interface SignInData extends AType<typeof SignInData_> {}
export interface SignInDataRaw extends EType<typeof SignInData_> {}
export const SignInData = AsOpaque<SignInDataRaw, SignInData>(SignInData_)

const signIn = ({ username, password }: SignInData) =>
  effect.accessM(({ auth }: Props) =>
    effect.fromPromise(() => auth.signInWithEmailAndPassword(username, password))
  )

interface Props {
  auth: firebase.auth.Auth
}

export const SignIn: React.FC<Props> = ({ auth }) => {
  const [data, setData] = React.useState<option.Option<SignInData>>(option.none)
  React.useEffect(() => {
    const signInEff = p.pipe(
      data,
      option.map(
        f.flow(
          signIn,
          effect.asUnit,
          effect.chainError(err => log('SignIn error', err)),
          effect.provideS({ auth }),
          provideConsole,
          effect.run
        )
      )
    )
    return p.pipe(signInEff, option.toUndefined)
  })

  const onFinish = (values: unknown) => {
    console.log('Success:', values)
    p.pipe(SignInData.strictType.decode(values), option.fromEither, setData)
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export const SignInContext = withStartAppEnvGuard(f.identity)(SignIn)
