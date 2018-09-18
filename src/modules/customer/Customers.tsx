import * as React from 'react'
import WrapComponent from '../../components/containers/WrapComponent'
import { 
  customersSubscription ,
  queryCustomer
} from '../../graphql/queries/queries'

import { 
  addCustomer,
  deleteCustomer,
  updateCustomer
} from '../../graphql/mutations/mutations'

import ListCustomers from './ListCustomers'
import CreateComponent from '../../components/module/CreateComponent'
import OpenSingleComponent from '../../components/module/OpenSingleComponent'


export const Customers = () => (
  <WrapComponent 
    moduleName='Customers'
    modulePrefix='customers'
    addItemText='Add customer'
    queryAll={<ListCustomers />}
    createComponent={<CreateComponent />}
    showComponent={<OpenSingleComponent />}
    queryOne={queryCustomer}
    subscription={customersSubscription}
    addMutation={addCustomer}
    deleteMutation={deleteCustomer}
    updateMutation={updateCustomer}
  />
)

export default Customers