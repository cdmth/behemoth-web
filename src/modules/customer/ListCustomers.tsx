import * as React from 'react'

import { IListCustomerState } from '../../interfaces'


import SingleCustomer from './SingleCustomer'
import CreateCustomer from './CreateCustomer'
import GetCustomers from './GetCustomers'

class ListCustomer extends React.Component<{}, IListCustomerState> {
  constructor(props: any) {
    super(props)

    this.state = {
      selectedCustomerId: "close"
    }
  }

  public addCustomerHandler = (state : string) => {
    this.setState({
      selectedCustomerId: state
    })
  }

  public render() {
    return (
      <div className="columns">
        <div className="column is-6 left-side">
          <div className="spacer-30">
            <p className="title title-text">Customers</p>

            <div className="buttons">
              <a className="button is-primary top-margin-20" onClick={() => this.addCustomerHandler('add')}>Add customer</a>
            </div>

            <nav className="panel top-padding-20 column is-10 is-offset-1">
              <GetCustomers openCustomer={this.openCustomer}/>
            </nav>
          </div>
        </div>

        {this.state.selectedCustomerId === 'close' ? '' :     
        <div className="column">
          <div className="box top-margin-20">
          <a className="delete close-tab is-medium" onClick={() => this.addCustomerHandler('close')} />
            {this.state.selectedCustomerId === 'add' ?
              <CreateCustomer addCustomerHandler={this.addCustomerHandler} /> :
              <SingleCustomer selectedCustomerId={this.state.selectedCustomerId} /> }
          </div>
        </div> }
      </div>
    )
  }

  public openCustomer = (id: string) => {
    this.setState({
      selectedCustomerId: id
    })
  }

}

export default ListCustomer