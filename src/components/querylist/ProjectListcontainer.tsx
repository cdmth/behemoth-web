import * as React from 'react'
import ListContainer from './ListContainer'

interface IProjectListContainer {
  modulePrefix: string
  data: any
  selectedItemHandler(id : string): void
}

const ProjectListContainer : React.SFC<IProjectListContainer> = (props) => (
  <div key={props.data._id} className="company-project">
    <p className="is-size-4">{props.data.name}</p>
    <ListContainer
      selectedItemHandler={props.selectedItemHandler}
      modulePrefix={props.modulePrefix}
      data={props.data.projects}
    />
  </div>
)

export default ProjectListContainer