import * as React from 'react'
import WrapComponent from '../../components/containers/WrapComponent'
import {
  projectsSubscription ,
  queryProject
} from '../../graphql/queries/queries'

import { 
  addProject,
  deleteProject,
  updateProject
} from '../../graphql/mutations/mutations'

import ListProjects from './ListProjects'
import CreateProject from './CreateProject'
import OpenSingleProject from './OpenSingleProject'


export const Projects = () => (
  <WrapComponent 
    moduleName='Projects'
    modulePrefix='projects'
    addItemText='Add project'
    queryAll={<ListProjects />}
    createComponent={<CreateProject />}
    showComponent={<OpenSingleProject />}
    queryOne={queryProject}
    subscription={projectsSubscription}
    addMutation={addProject}
    deleteMutation={deleteProject}
    updateMutation={updateProject}
  />
)

export default Projects