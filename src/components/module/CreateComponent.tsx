import * as React from 'react'
import { Mutation } from "react-apollo";
import Loading from '../../components/Loading'

class CreateComponent extends React.Component<any, any> {
  constructor(props : any) {
    super(props)
    this.state = {
      id: '',
      input: ''
    }
  }

  public onChange(e:any) {
    // @ts-ignore
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  public render() {
    return (
      <Mutation mutation={this.props.addMutation} onCompleted={(val) => this.props.selectedItemHandler(val[Object.keys(val)[0]]._id)}>
        {(create, { loading }) => {
          if(loading) { return <Loading /> }
          return (
          <div>
            <p className="title">{this.props.addItemText}</p>
            <form
              onSubmit={e => {
                e.preventDefault();
                create({ variables: { name: this.state.input} }) }}>
              <div className="field">
                <input className="input is-primary" name="input" value={this.state.input} onChange={e => this.onChange(e)}/>
              </div>
              <button className="button is-primary is-small" type="submit">{this.props.addItemText}</button>
            </form>
          </div>
          )
        }}
      </Mutation>
    )}

};

export default CreateComponent