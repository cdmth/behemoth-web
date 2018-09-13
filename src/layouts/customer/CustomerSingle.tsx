import * as React from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const getCustomer = (id: String) => gql`
  {
    customer(_id:${id}){
      name
    }
  }
`

const CustomerSingle = (props:any) => {
  <Query query={getCustomer(props.id)}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'Loading...'
      }

      if (error) {
        return `Error! ${error.message}`
      }

      return (
        <span>{data.name}</span>
      )
    }}
  </Query>
}

export default CustomerSingle