import { ICustomerSingleProps, ICustomerSingleState } from '../../interfaces'
import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const getCustomer = gql`
  query Customer($_id: String!) {
    customer(_id: $_id) {
      name
    }
  }
`

const updateCustomer = gql`
  mutation updateCustomer($_id: String!, $name: String!) {
    updateCustomer(_id: $_id, name: $name) {
      name
    }
  }
`

class CustomerSingle extends React.Component<ICustomerSingleProps, ICustomerSingleState> {

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
          
          let nameInput : any

          return (
            <Mutation mutation={updateCustomer}>
              {update => (
                <div>
                  <p>{data.customer.name}</p>
                  <form
                    onSubmit={event => {
                      event.preventDefault()
                      update({ 
                        variables: {_id: this.props.selectedCustomerId, name: nameInput.value}})
                    }}
                  >
                    <input ref={node => {nameInput=node}}/>
                    <button type="submit">Update customer</button>
                  </form>
                </div>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default CustomerSingle