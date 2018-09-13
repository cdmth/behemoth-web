import * as React from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const addCustomer = gql`
  mutation CreateCustomer($name: String) {
    createCustomer(name: $name) {
      name
    }
  }
`;

const createCustomer = () => {
  let input: any

  return (
    <Mutation mutation={addCustomer}>
      {(create, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              create({ variables: { name: input.value } });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Customer</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default createCustomer