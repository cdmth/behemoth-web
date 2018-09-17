import { ISingleWorkerProps, ISingleWorkerState } from '../../interfaces'
import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import UpdateWorker from './UpdateWorker'
import DeleteWorker from './DeleteWorker'

const getWorker = gql`
  query worker($_id: String!) {
    worker(_id: $_id) {
      name
    }
  }
`

class SingleWorker extends React.Component<ISingleWorkerProps, ISingleWorkerState> {
  constructor(props : any ) {
    super(props)
    this.state = {
      edit: false
    }
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
        <Query query={getWorker} variables={{_id: this.props.selectedWorkerId}}>
          {({ loading, error, data}) => {
            if (loading) {
              return "Loading"
            }

            if (error) {
              return `Error! ${error.message}`
            }

            return (
              <div>
                <p className="title">{data.worker.name}</p>
                {this.state.edit ? 
                <div>
                  <UpdateWorker selectedWorkerId={this.props.selectedWorkerId} name={data.worker.name}/>
                  <DeleteWorker selectedWorkerId={this.props.selectedWorkerId} />
                </div> : ''}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default SingleWorker