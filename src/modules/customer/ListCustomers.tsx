import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import SingleCustomer from './SingleCustomer'
import { IListCustomerState } from '../../interfaces'

import CreateCustomer from './CreateCustomer'

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

class ListCustomer extends React.Component<{}, IListCustomerState> {
  constructor(props: any) {
    super(props)

    this.state = {
      selectedCustomerId: "add"
    }
  }

  public addCustomerHandler = () => {
    this.setState({
      selectedCustomerId: "add"
    })
  }

  public render() {
    return (
    <div className="is-spaced">
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Customers
            </h1>
            <h2 className="subtitle">
              The ones who pay the beer
            </h2>
          </div>
        </div>
      </section>
      <div className="columns">
        <div className="column customers-panel is-narrow">

        <div className="is-clearfix">
          <a className="button is-primary top-margin-20 is-pulled-right" onClick={() => this.addCustomerHandler()}>Add customer</a>
        </div>

          <nav className="panel top-padding-20">
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
                      <a className="panel-block" key={customer._id} onClick={() => this.openCustomer(customer._id)}>
                        {customer.name}
                      </a>
                    ))}
                  </div>
                )
              }}
            </Query>
          </nav>
        </div>
        <div className="column is-5">
          <div>
            <div className="box top-margin-20">
              {this.state.selectedCustomerId === 'add' ?
                <CreateCustomer /> :
                  <SingleCustomer selectedCustomerId={this.state.selectedCustomerId} /> }
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  private openCustomer = (id: string) => {
    this.setState({
      selectedCustomerId: id
    })
  }

}

export default ListCustomer