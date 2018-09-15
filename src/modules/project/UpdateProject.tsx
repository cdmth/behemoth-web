import { IUpdateProjectProps } from '../../interfaces'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const updateProject = gql`
  mutation updateProject($_id: String!, $name: String!) {
    updateProject(_id: $_id, name: $name) {
      name
    }
  }
`

export const UpdateProject : React.SFC<IUpdateProjectProps> = (props) => {
  let nameInput : any

  return (
    <Mutation mutation={updateProject}>
      {update => (
        <div>
          <form
            onSubmit={event => {
              event.preventDefault()
              try {
                update({ 
                  variables: {_id: props.selectedProjectId, name: nameInput.value}})
              } catch (error) {
                console.log(error)
              }
            }}
          >
            <div className="field">
              <input className="input" ref={node => {nameInput=node}}/>
            </div>
            <div className="field">
              <button className="button is-primary" type="submit">Update Project</button>
            </div>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default UpdateProject