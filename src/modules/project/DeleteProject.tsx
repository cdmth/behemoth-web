import { IDeleteProjectProps } from '../../interfaces'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const deleteProject = gql`
mutation deleteProject($_id: String!) {
  deleteProject(_id: $_id) {
    message
  }
}
`

export const DeleteProject : React.SFC<IDeleteProjectProps> = (props) => {
  return (
    <Mutation mutation={deleteProject}>
      {(deleteC) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              deleteC({ variables: { _id: props.selectedProjectId } });
            }}
          >
            <div className="field">
              <button className="button is-danger top-margin-10" type="submit">Delete project</button>
            </div>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default DeleteProject