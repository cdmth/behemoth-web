import * as React from 'react'
import { Query } from 'react-apollo'
import * as moment from 'moment'

import { getBill } from '../../graphql/queries/queries'
 
const ShowBill = (props) => {
  console.log(props.match.params.id)
  return (
    <Query query={getBill} variables={{billId: props.match.params.id}}>
      {({loading, error, data}) => {
        if(loading) { return "Loadiiiing"}
        if(error) { return error}

        const { _id, projectId, customerId, billingPeriodStart, billingPeriodEnd, hours, price, status } = data.bill

        return (
          <div>
            <p>{_id}</p>
            <p>{projectId}</p>
            <p>{customerId}</p>
            <p>{moment(billingPeriodStart).format('DD.MM.YYYY')}</p>
            <p>{moment(billingPeriodEnd).format('DD.MM.YYYY')}</p>
            <p>{hours}</p>
            <p>{price}</p>
            <p>{status}</p>
          </div>
        )
      }}
    </Query>)
}

export default ShowBill