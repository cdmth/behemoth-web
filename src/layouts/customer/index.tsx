import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import CustomerSingle from './CustomerSingle'
import { ICustomerState } from '../../interfaces'

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

class Customer extends React.Component<{}, ICustomerState> {
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
      <CustomerSingle selectedCustomerId={this.state.selectedCustomerId} />
    </div>
    )
  }

  private openCustomer = (id: string) => {
    this.setState({
      selectedCustomerId: id
    })
  }

}

export default Customer