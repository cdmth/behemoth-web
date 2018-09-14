import { IUpdateCustomerProps } from '../../interfaces'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const updateCustomer = gql`
  mutation updateCustomer($_id: String!, $name: String!) {
    updateCustomer(_id: $_id, name: $name) {
      name
    }
  }
`

export const UpdateCustomer : React.SFC<IUpdateCustomerProps> = (props) => {
  let nameInput : any

  return (
    <Mutation mutation={updateCustomer}>
    {update => (
      <div>
        <p>{props.name}</p>
        <form
          onSubmit={event => {
            event.preventDefault()
            try {
              update({ 
                variables: {_id: props.selectedCustomerId, name: nameInput.value}})
            } catch (error) {
              console.log(error)
            }
          }}
        >
          <input ref={node => {nameInput=node}}/>
          <button type="submit">Update customer</button>
        </form>
      </div>
    )}
  </Mutation>
  )
}

export default UpdateCustomer