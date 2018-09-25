import * as React from 'react'
import { Route } from 'react-router-dom'

import CreateBill from './CreateBill'
import ListBills from './ListBills'
import ShowBill from './ShowBill'
import CreateBillFromEntries from './CreateBillFromEntries'

const BillLayout = () => {
  return (
    <div>
      <div className="columns">
        <div className="column is-6">
          <CreateBill />
          <ListBills />
        </div>
        <div className="column is-6">
          <Route path="/bills/:id" component={ShowBill} />
        </div>
      </div>
      <div className="columns">
        <div className="column is-6">
          <CreateBillFromEntries />
        </div>
      </div>
    </div>
  )
}

export default BillLayout