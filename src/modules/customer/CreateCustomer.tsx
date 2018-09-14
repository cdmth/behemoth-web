import * as React from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { ICreateCustomerProps } from '../../interfaces'

const addCustomer = gql`
  mutation CreateCustomer($name: String) {
    createCustomer(name: $name) {
      _id
      name
    }
  }
`;

const createCustomer : React.SFC<ICreateCustomerProps> = (props) => {
  let input: any

  return (
    <Mutation mutation={addCustomer} >
      {(create, {loading,  data }) => {

        if(loading) {
          return "Loading"
        }

        if(data) {
          props.addCustomerHandler('close')
          console.log(data.createCustomer._id)
          return "Moving away"
        }

        return (
        <div>
          <p className="title">Create new customer</p>
          <form
            onSubmit={e => {
              e.preventDefault();
              create({ variables: { name: input.value } });
              input.value = "";
            }}
          > 
            <div className="field">
              <input className="input"
                ref={node => {
                  input = node;
                }}
              />
            </div>
            <button className="button is-primary" type="submit">Add Customer</button>
          </form>
        </div>
        )
      }}
    </Mutation>
  );
};

export default createCustomer