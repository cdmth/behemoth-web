import { ICustomerSingleProps } from '../../interfaces'
import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const getCustomer = gql`
  query Customer($_id: String!) {
    customer(_id: $_id) {
      name
    }
  }
`

class CustomerSingle extends React.Component<ICustomerSingleProps, {}> {
  public render() {
    if (this.props.selectedCustomerId === '') {
      return 'valitse homo'
    }

    return (
      <Query query={getCustomer} variables={{_id: this.props.selectedCustomerId}}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading...'
          }
  
          if (error) {
            return `Error! ${error.message}`
          }

          return (
            <div>
              {data.customer.name}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default CustomerSingle