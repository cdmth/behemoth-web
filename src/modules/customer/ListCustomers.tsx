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
      selectedCustomerId: ""
    }
  }

  public render() {
    return (
    <div>
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
              <ul>
                {data.customers.map((customer:any) => (
                  <li key={customer._id} value={customer.name} onClick={() => this.openCustomer(customer._id)}>
                    {customer.name}
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      </Query>
      <SingleCustomer selectedCustomerId={this.state.selectedCustomerId} />
      <CreateCustomer />
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