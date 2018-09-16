import * as React from 'react'

import { IListProjectState } from '../../interfaces'

import SingleProject from './SingleProject'
import CreateProject from './CreateProject'
import GetProjects from './GetProjects'

class ListProject extends React.Component<{}, IListProjectState> {
  constructor(props: any) {
    super(props)

    this.state = {
      selectedProjectId: "close"
    }
  }

  public addProjectHandler = (state : string) => {
    this.setState({
      selectedProjectId: state
    })
  }

  public render() {
    return (
      <div className="columns">
        <div className="column is-6 left-side">
          <div className="spacer-30">
            <p className="title title-text">Projects</p>

            <div className="buttons">
              <a className="button is-primary top-margin-20" onClick={() => this.addProjectHandler('add')}>Add Project</a>
            </div>

            <GetProjects openProject={this.openProject}/>
          </div>
        </div>

        {this.state.selectedProjectId === 'close' ? '' :     
        <div className="column">
          <div className="box top-margin-20">
          <a className="delete close-tab is-medium" onClick={() => this.addProjectHandler('close')} />
            {this.state.selectedProjectId === 'add' ?
              <CreateProject addProjectHandler={this.addProjectHandler} /> :
              <SingleProject selectedProjectId={this.state.selectedProjectId} /> }
          </div>
        </div> }
      </div>
    )
  }

  public openProject = (id: string) => {
    this.setState({
      selectedProjectId: id
    })
  }

}

export default ListProject