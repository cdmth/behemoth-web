import { IDeleteComponent } from '../control-interfaces'
import * as React from 'react'
import { Mutation } from 'react-apollo'

export const DeleteComponent : React.SFC<IDeleteComponent> = (props) => {
  return (
    <Mutation mutation={props.deleteMutation} onCompleted={() => props.selectedItemHandler('close')}>
      {(deleteC) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              deleteC({ variables: { _id: props.selectedItemId } });
            }}
          >
            <div className="field">
              <button className="button is-danger top-margin-10" type="submit">Delete Customer</button>
            </div>
          </form>
        </div>
      )}
    </Mutation>
  )
}

export default DeleteComponent