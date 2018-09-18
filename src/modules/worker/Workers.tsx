import * as React from 'react'
import WrapComponent from '../../components/containers/WrapComponent'
import {
  workersSubscription ,
  queryWorker
} from '../../graphql/queries/queries'

import { 
  addWorker,
  deleteWorker,
  updateWorker
} from '../../graphql/mutations/mutations'

import ListWorkers from './ListWorkers'
import CreateComponent from '../../components/module/CreateComponent'
import OpenSingleWorker from './OpenSingleWorker'


export const Workers = () => (
  <WrapComponent 
    moduleName='Workers'
    modulePrefix='workers'
    addItemText='Add worker'
    queryAll={<ListWorkers />}
    createComponent={<CreateComponent />}
    showComponent={<OpenSingleWorker />}
    queryOne={queryWorker}
    subscription={workersSubscription}
    addMutation={addWorker}
    deleteMutation={deleteWorker}
    updateMutation={updateWorker}
  />
)

export default Workers