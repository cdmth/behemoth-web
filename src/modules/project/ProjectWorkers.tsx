import { IProjectWorkersProps } from '../../components/module/control-interfaces'
import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const getProjectWorkers = gql`
  query getWorkersByProjectId($projectId: String!) {
    getWorkersByProjectId(projectId: $projectId) {
      workers {
      workerId
      name
      }
    }
  }
`

const deleteWorker = gql`
  mutation removeWorkerFromProject($workerId: String!, $projectId: String!) {
    removeWorkerFromProject(workerId: $workerId, projectId: $projectId) {
      message
    }
  }
`

const projectWorkersSubscription = gql`
  subscription {
    projectWorkers {
      projectId
    }
  }
`

let unsubscribe: any = null

const ProjectWorkers : React.SFC<IProjectWorkersProps> = (props) => {
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
                refetch().then(data => data)
              }
            })
          }

          return (
            <div>
              <ul>
              {data.getWorkersByProjectId.workers.map((worker: any) => (
                <li key={worker.workerId}>
                  <figure className="image is-64x64">
                    <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                  </figure>
                  {worker.name} {" "}
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
                            <button className="button is-danger top-margin-10" type="submit">Delete worker</button>
                          </div>
                        </form>
                      </div>
                    )}
                  </Mutation>
                </li>
              ))}
              </ul>
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default ProjectWorkers