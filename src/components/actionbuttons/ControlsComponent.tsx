import { IControlsProps } from '../control-interfaces'
import * as React from 'react'

export const ControlsComponent : React.SFC<IControlsProps> = (props) => (
  <div className="buttons">
    <a className="button is-primary top-margin-20" onClick={() => props.selectedItemHandler('add')}>{props.addItemText}</a>
  </div>
)

export default ControlsComponent