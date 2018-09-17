import { IUpdateWorkerProps } from '../../interfaces'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const updateWorker = gql`
  mutation updateWorker($_id: String!, $name: String) {
    updateWorker(_id: $_id, name: $name) {
      name
    }
  }
`

export const UpdateWorker : React.SFC<IUpdateWorkerProps> = (props) => {
  let nameInput : any

  return (
    <Mutation mutation={updateWorker}>
      {update => (
        <div>
          <form
            onSubmit={event => {
              event.preventDefault()
              try {
                update({ 
                  variables: {_id: props.selectedWorkerId, name: nameInput.value}})
              } catch (error) {
                console.log(error)
              }
            }}
          >
            <div className="field">
              <input className="input" ref={node => {nameInput=node}}/>
            </div>
            <div className="field">
              <button className="button is-primary" type="submit">Update Worker</button>
            </div>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default UpdateWorker