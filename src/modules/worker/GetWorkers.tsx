import * as React from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { IGetWorkersProps } from '../../interfaces'

const getWorkers = gql`
  {
    workers {
      _id
      name
    }
  }
`

const workersSubscription = gql`
  subscription {
    workers {
      _id
      name
    }
  }
`

let unsubscribe: any = null

export const getWorker : React.SFC<IGetWorkersProps> = (props) => {
  return (
    <Query query={getWorkers}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) {
        return 'Loading...'
      }

      if (error) {
        return `Error! ${error}`
      }

      if (!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: workersSubscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) {
              return prev
            }
            return {
              workers: subscriptionData.data.workers
            }
          }
        })
      }

      return (
        <div>
          {data.workers.map((worker:any) => (
            <a className="panel-block" key={worker._id} onClick={() => props.openWorker(worker._id)}>
              {worker.name}
            </a>
          ))}
        </div>
      )
    }}
  </Query>
  );
};

export default getWorker