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
import OpenSingleComponent from '../../components/module/OpenSingleComponent'


export const Workers = () => (
  <WrapComponent 
    moduleName='Workers'
    modulePrefix='workers'
    addItemText='Add worker'
    queryAll={<ListWorkers />}
    createComponent={<CreateComponent />}
    showComponent={<OpenSingleComponent />}
    queryOne={queryWorker}
    subscription={workersSubscription}
    addMutation={addWorker}
    deleteMutation={deleteWorker}
    updateMutation={updateWorker}
  />
)

export default Workers