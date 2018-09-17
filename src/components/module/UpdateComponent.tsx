import { IUpdateComponent } from '../control-interfaces'
import * as React from 'react'
import { Mutation } from 'react-apollo'

export const UpdateCustomer : React.SFC<IUpdateComponent> = (props) => {
  let nameInput : any

  return (
    <Mutation mutation={props.updateMutation}>
      {update => (
        <div>
          <form
            onSubmit={event => {
              event.preventDefault()
              try {
                update({ 
                  variables: {_id: props.selectedItemId, name: nameInput.value}})
              } catch (error) {
                console.log(error)
              }
            }}
          >
            <div className="field">
              <input className="input" ref={node => {nameInput=node}}/>
            </div>
            <div className="field">
              <button className="button is-primary" type="submit">Update</button>
            </div>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default UpdateCustomer