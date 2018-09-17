import * as React from 'react'
import { Mutation } from "react-apollo";
import { ICreateComponent, ICreateComponentState } from './control-interfaces'
import Loading from '../Loading'
import CustomersSelectComponent from './CustomersSelectComponent';


class CreateComponent extends React.Component<ICreateComponent, ICreateComponentState> {
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
                this.props.modulePrefix === 'projects' ? (
                  create({ variables: { name: this.state.input, customerId: this.state.id } })
                ) : 
                  create({ variables: { name: this.state.input } });
              }}
            >
              {this.props.modulePrefix === 'projects' ? 
                <CustomersSelectComponent id={this.state.id} onChange={e => this.onChange(e)} /> 
              : ''}
              <div className="field">
                <input className="input" name="input" value={this.state.input} onChange={e => this.onChange(e)}/>
              </div>
              <button className="button is-primary" type="submit">{this.props.addItemText}</button>
            </form>
          </div>
          )
        }}
      </Mutation>
    )}

};

export default CreateComponent