import * as React from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const getCustomers = gql`
  {
    customers {
      _id
      name
    }
  }
`;

const Test = () => (
  <Query query={getCustomers}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'Loading...';
      }

      if (error) {
        return `Error! ${error.message}`;
      }

      return (
        <ul>
          {data.customers.map((customer:any) => (
            <li key={customer._id} value={customer.name}>
              {customer.name}
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default Test