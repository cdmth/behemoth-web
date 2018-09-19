import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const getProjectWorkers = gql`
  query getWorkersByProjectId($projectId: String!) {
    getWorkersByProjectId(projectId: $projectId) {
      workerId
      name
    }
  }
`

const deleteWorker = gql`
  mutation deleteWorkerFromProject($workerId: String!, $projectId: String!) {
    deleteWorkerFromProject(workerId: $workerId, projectId: $projectId) {
      message
    }
  }
`

const projectWorkersSubscription = gql`
  subscription {
    projectWorkers {
      workerId
      name
    }
  }
`

let unsubscribe: any = null

const ProjectWorkers : React.SFC<any> = (props) => {
  return (
    <div>
      <Query query={getProjectWorkers} variables={{projectId: props.selectedItemId}}>
        {({ loading, error, data, subscribeToMore, refetch}) => {
          if (loading) {
            return "Loading"
          }

          if (error) {
            return `Error! ${error.message}`
          }
          
          if (!unsubscribe) {
            unsubscribe = subscribeToMore({
              document: projectWorkersSubscription,
              updateQuery: () => { 
                refetch().then((data : any) => data) 
              }
            })
          }

          return (
            <div>
              {data.getWorkersByProjectId.map((worker: any) => (
                <div className="card user-card" key={worker.workerId}>
                  <figure className="image is-64x64">
                    <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                  </figure>
                  <p className='is-size-6'>{worker.name}</p>
                  {props.edit ?
                  <Mutation mutation={deleteWorker}>
                    {(deleteWrkr) => (
                      <div>
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            deleteWrkr({ variables: { workerId: worker.workerId, projectId: props.selectedItemId}});
                          }}
                        >
                          <div className="field">
                            <button className="button is-danger top-margin-10 is-small" type="submit">Delete worker</button>
                          </div>
                        </form>
                      </div>
                    )}
                  </Mutation>
                  : '' }
                </div>
              ))}
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default ProjectWorkers