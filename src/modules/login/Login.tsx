import * as React from 'react'
import { Mutation } from 'react-apollo'
import { createAccount, login as loginMutation } from '../../graphql/mutations/mutations'
import Loading from '../../components/Loading'

export default class Login extends React.Component<any, any> {
  constructor(props) {
    super(props)

    this.state = {
      login: true,
      email: '',
      password: ''
    }
  }

  public render() {
    const { login, email, password } = this.state
    return (
      <div>
        <h1>{login ? 'Login' : 'Sign up'}</h1>
        <section className="section"> 
          <div className="container">
            <div className="field">
              <input className="input" 
                value={email} 
                onChange={e => this.setState({email: e.target.value})} 
                type="text" 
                placeholder="Enter email"/>
            </div>
            <div className="field">
              <input className="input" 
                value={password} 
                onChange={e => this.setState({password: e.target.value})} 
                type="password" 
                placeholder="Enter password"/>
            </div>
          </div>
        </section>
        <section className="section">
          <Mutation mutation={login ? loginMutation : createAccount} 
            onCompleted={(login) => { 
              const key = 'login'
              localStorage.setItem('auth-token', login[key].token)}
            }>
            {(create, {loading}) => {
              if (loading) { return <Loading /> }
              return (
                <button className="button" 
                  onClick={() => create({variables: this.state})}>
                  {login ? 'Login' : 'Create account'}
                </button>
              ) 
            }}
          </Mutation>
          <button className="button" 
            onClick={() => this.setState({login: !login})}>
              {login ? 'need to create an account?' : 'already have an account?'}
          </button>
        </section>
      </div>
    )
  }
}