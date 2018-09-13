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
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading...'
          }
  
          if (error) {
            return `Error! ${error.message}`
          }
  
          return (
            <ul>
              {data.customers.map((customer:any) => (
                <li key={customer._id} value={customer.name} onClick={() => this.openCustomer(customer._id)}>
                  {customer.name}
                </li>
              ))}
            </ul>
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