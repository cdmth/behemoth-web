import * as React from 'react'
import WrapComponent from '../../components/containers/WrapComponent'
import { 
  queryAllWorkers,
  workersSubscription ,
  queryWorker
} from '../../graphql/queries/queries'

import { 
  addWorker,
  deleteWorker,
  updateWorker
} from '../../graphql/mutations/mutations'


export const Workers = () => (
  <WrapComponent 
    moduleName='Workers'
    modulePrefix='workers'
    addItemText='Add worker'
    queryAll={queryAllWorkers}
    queryOne={queryWorker}
    subscription={workersSubscription}
    addMutation={addWorker}
    deleteMutation={deleteWorker}
    updateMutation={updateWorker}
  />
)

export default Workers