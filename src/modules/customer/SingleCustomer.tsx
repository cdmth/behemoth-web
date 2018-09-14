import { ISingleCustomerProps, ISingleCustomerState } from '../../interfaces'
import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import UpdateCustomer from './UpdateCustomer'
import DeleteCustomer from './DeleteCustomer'

const getCustomer = gql`
  query Customer($_id: String!) {
    customer(_id: $_id) {
      name
    }
  }
`

class CustomerSingle extends React.Component<ISingleCustomerProps, ISingleCustomerState> {
  
  public render() {
    if (this.props.selectedCustomerId === '') {
      return 'valitse homo'
    }

    return (
      <Query query={getCustomer} variables={{_id: this.props.selectedCustomerId}}>
        {({ loading, error, data}) => {
          if (loading) {
            return 'Loading...'
          }

          if (error) {
            return `Error! ${error.message}`
          }

          return (
            <div>
              <UpdateCustomer selectedCustomerId={this.props.selectedCustomerId} name={data.customer.name}/>
              <DeleteCustomer selectedCustomerId={this.props.selectedCustomerId} />
            </div>
          )
        }}
      </Query>
    )
  }
}

export default CustomerSingle