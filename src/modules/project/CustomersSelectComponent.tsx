import * as React from 'react'
import { Query } from "react-apollo";
// import { ICustomerSelectComponent } from '../../components/control-interfaces'
import { queryAllCustomers } from '../../graphql/queries/queries'
import Loading from '../../components/Loading'

const CustomersSelectComponent : React.SFC<any> = (props) => (
  <Query query={queryAllCustomers}>
    {({ loading, error, data }) => {
      if (loading) { return <Loading /> }

      if (error) { return `Error! ${error}` }

      return (
        <div className="field">
          <label className="label">Select customer</label>
          <div className="select">
            <select name="id" onChange={e => props.onChange(e)}>
              {data.customers.map((customer:any) => (
                <option key={customer._id} value={customer._id}>{customer.name}</option>
              ))}
            </select>
          </div>
        </div>
      )
    }}
  </Query>
)

export default CustomersSelectComponent