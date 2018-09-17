import * as React from 'react'
import WrapComponent from '../../components/containers/WrapComponent'
import { 
  queryAllCustomers,
  customersSubscription ,
  queryCustomer
} from '../../graphql/queries/queries'

import { 
  addCustomer,
  deleteCustomer,
  updateCustomer
} from '../../graphql/mutations/mutations'


export const Customers = () => (
  <WrapComponent 
    moduleName='Customers'
    modulePrefix='customers'
    addItemText='Add customer'
    queryAll={queryAllCustomers}
    queryOne={queryCustomer}
    subscription={customersSubscription}
    addMutation={addCustomer}
    deleteMutation={deleteCustomer}
    updateMutation={updateCustomer}
  />
)

export default Customers