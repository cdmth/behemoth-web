import { IDeleteWorkerProps } from '../../interfaces'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const deleteWorker = gql`
mutation deleteWorker($_id: String!) {
  deleteWorker(_id: $_id) {
    message
  }
}
`

export const DeleteWorker : React.SFC<IDeleteWorkerProps> = (props) => {
  return (
    <Mutation mutation={deleteWorker}>
      {(deleteC) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              deleteC({ variables: { _id: props.selectedWorkerId } });
            }}
          >
            <div className="field">
              <button className="button is-danger top-margin-10" type="submit">Delete Worker</button>
            </div>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default DeleteWorker