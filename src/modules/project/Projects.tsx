import * as React from 'react'
import WrapComponent from '../../components/containers/WrapComponent'
import { 
  queryAllProjects,
  projectsSubscription ,
  queryProject
} from '../../graphql/queries/queries'

import { 
  addProject,
  deleteProject,
  updateProject
} from '../../graphql/mutations/mutations'


export const Projects = () => (
  <WrapComponent 
    moduleName='Projects'
    modulePrefix='projects'
    addItemText='Add project'
    queryAll={queryAllProjects}
    queryOne={queryProject}
    subscription={projectsSubscription}
    addMutation={addProject}
    deleteMutation={deleteProject}
    updateMutation={updateProject}
  />
)

export default Projects