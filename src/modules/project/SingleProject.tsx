import { ISingleProjectProps, ISingleProjectState } from '../../interfaces'
import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import UpdateProject from './UpdateProject'
import DeleteProject from './DeleteProject'
import ProjectWorkers from './ProjectWorkers';
import CreateProjectWorker from '../projectworker/CreateProjectWorker';

const getProject = gql`
    query project($_id: String!) {
      project(_id: $_id) {
        name
      }
    }
`

class SingleProject extends React.Component<ISingleProjectProps, ISingleProjectState> {
  constructor(props : any ) {
    super(props)
    this.state = {
      edit: false
    }
    console.log(this.props)
  }

  public edit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  public render() {
    return (
      <div>
        <button className={`button ${this.state.edit ? "is-danger" : "is-primary"} is-pulled-right`} onClick={() => this.edit()}>{this.state.edit ? "Cancel" : "Edit"}</button>
        <Query query={getProject} variables={{_id: this.props.selectedProjectId }}>
          {({ loading, error, data}) => {
            if (loading) {
              return "Loading"
            }

            if (error) {
              return `Error! ${error.message}`
            }

            return (
              <div>
                <p className="title">{data.project.name}</p>
                {this.state.edit ? 
                <div>
                  <UpdateProject selectedProjectId={this.props.selectedProjectId} name={data.project.name}/>
                  <DeleteProject selectedProjectId={this.props.selectedProjectId} />
                </div> : ''}
                <ProjectWorkers selectedProjectId={this.props.selectedProjectId} />
                {this.state.edit ?
                  <CreateProjectWorker selectedProjectId={this.props.selectedProjectId} />
                : "" }
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default SingleProject