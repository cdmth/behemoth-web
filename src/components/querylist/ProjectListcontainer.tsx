import * as React from 'react'
import ListContainer from './ListContainer'

const ProjectListContainer : React.SFC<any> = (props) => (
  <div key={props.data._id} className="company-project">
    <p className="is-size-4">{props.data.name}</p>
    <ListContainer
      selectedItemHandler={props.selectedItemHandler}
      modulePrefix={props.modulePrefix}
      data={props.data.projects}
      selectedItemId={props.selectedItemId}
    />
  </div>
)

export default ProjectListContainer