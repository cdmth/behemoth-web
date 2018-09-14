import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import SingleCustomer from './SingleCustomer'
import { IListCustomerState } from '../../interfaces'

import CreateCustomer from './CreateCustomer'

const getCustomers = gql`
  {
    customers {
      _id
      name
    }
  }
`

const customersSubscription = gql`
  subscription {
    customers {
      _id
      name
    }
  }
`

let unsubscribe: any = null

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
              <Query query={getCustomers}>
                {({ loading, error, data, subscribeToMore }) => {
                  if (loading) {
                    return 'Loading...'
                  }
          
                  if (error) {
                    return `Error! ${error}`
                  }

                  if (!unsubscribe) {
                    unsubscribe = subscribeToMore({
                      document: customersSubscription,
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData) {
                          return prev
                        }
                        return {
                          customers: subscriptionData.data.customers
                        }
                      }
                    })
                  }

                  return (
                    <div>
                      {data.customers.map((customer:any) => (
                        <a className="panel-block" key={customer._id} onClick={() => this.openCustomer(customer._id)}>
                          {customer.name}
                        </a>
                      ))}
                    </div>
                  )
                }}
              </Query>
            </nav>
          </div>
        </div>

        {this.state.selectedCustomerId === 'close' ? '' :     
        <div className="column">
          <div className="box top-margin-20">
          <a className="delete close-tab is-medium" onClick={() => this.addCustomerHandler('close')} />
            {this.state.selectedCustomerId === 'add' ?
              <CreateCustomer /> :
              <SingleCustomer selectedCustomerId={this.state.selectedCustomerId} /> }
          </div>
        </div> }
      </div>
    )
  }

  private openCustomer = (id: string) => {
    this.setState({
      selectedCustomerId: id
    })
  }

}

export default ListCustomer