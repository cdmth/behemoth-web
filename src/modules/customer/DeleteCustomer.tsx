import { IDeleteCustomerProps } from '../../interfaces'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const deleteCustomer = gql`
mutation deleteCustomer($_id: String!) {
  deleteCustomer(_id: $_id) {
    message
  }
}
`

export const DeleteCustomer : React.SFC<IDeleteCustomerProps> = (props) => {
  return (
    <Mutation mutation={deleteCustomer}>
      {(deleteC) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              deleteC({ variables: { _id: props.selectedCustomerId } });
            }}
          >
            <div className="field">
              <button className="button is-danger top-margin-10" type="submit">Delete Customer</button>
            </div>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default DeleteCustomer