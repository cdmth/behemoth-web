import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import { getProjectWorkers, deleteWorker, projectWorkersSubscription } from '../../graphql/queries/queries'

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
              {data.project.workers.map((worker: any) => (
                <div className="card user-card" key={worker._id}>
                  <figure className="image is-64x64">
                    <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                  </figure>
                  <p className='is-size-7'>{worker.name}</p>
                  {props.edit ?
                  <Mutation mutation={deleteWorker}>
                    {(deleteWrkr) => (
                      <div>
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            deleteWrkr({ variables: { workerId: worker._id, projectId: props.selectedItemId}});
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