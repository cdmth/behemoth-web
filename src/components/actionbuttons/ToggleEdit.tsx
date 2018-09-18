import { IToggleEdit } from '../control-interfaces'
import * as React from 'react'

export const LeftContainer : React.SFC<IToggleEdit> = (props) => (
  <button 
    className={`button is-small ${props.edit ? "is-danger" : "is-primary"} is-pulled-right`} 
    onClick={() => props.editComponent()}>{props.edit ? "Cancel" : "Edit"}
</button>
)

export default LeftContainer