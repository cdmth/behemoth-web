import * as React from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'
import CustomerSingle from './CustomerSingle'
import { ICustomerState } from '../../interfaces'

const customers = gql`
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
      <Subscription subscription={customers}>
        {({ loading, error, data }) => {
          if (loading) {
            console.log("loading")
            return 'Loading...'
          }
  
          if (error) {
            return `Error! ${error}`
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
      </Subscription>
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