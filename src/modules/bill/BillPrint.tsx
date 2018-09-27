import * as React from 'react'
import * as moment from 'moment'

class BillPrint extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  public render() {
    const { _id, projectId, customerId, billingPeriodStart, billingPeriodEnd, hours, price, status } = this.props
    return (
      <div className="showBill">
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
      </div>
    )
  }
}

export default BillPrint