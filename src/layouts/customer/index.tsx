import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import CustomerSingle from './CustomerSingle'

const getCustomers = gql`
  {
    customers {
      _id
      name
    }
  }
`
class Customer extends React.Component {
  constructor(props: any) {
    super(props)

    this.state = {
      selectedCustomerId: ''
    }
  }

  openCustomer = (id: string) => {
    this.setState({
      selectedCustomerId: id
    })
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
      {'@ts-ignore'}
      <CustomerSingle id={this.state.selectedCustomerId}/>
    </div>
    )
  }
}

export default Customer