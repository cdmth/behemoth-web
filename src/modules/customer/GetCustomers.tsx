import * as React from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { IGetCustomerProps } from '../../interfaces'

const getCustomers = gql`
  {
    customers {
      _id
      name
    }
  }
`

const customersSubscription = gql`
  subscription {
    customers {
      _id
      name
    }
  }
`

let unsubscribe: any = null

export const getCustomer : React.SFC<IGetCustomerProps> = (props) => {
  return (
    <Query query={getCustomers}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) {
        return 'Loading...'
      }

      if (error) {
        return `Error! ${error}`
      }

      if (!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: customersSubscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) {
              return prev
            }
            return {
              customers: subscriptionData.data.customers
            }
          }
        })
      }

      return (
        <div>
          {data.customers.map((customer:any) => (
            <a className="panel-block" key={customer._id} onClick={() => props.openCustomer(customer._id)}>
              {customer.name}
            </a>
          ))}
        </div>
      )
    }}
  </Query>
  );
};

export default getCustomer