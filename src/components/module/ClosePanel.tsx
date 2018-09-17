import { ISelectedItemHandler } from './control-interfaces'
import * as React from 'react'

export const LeftContainer : React.SFC<ISelectedItemHandler> = (props) => (
  <a 
    className="delete close-tab is-medium" 
    onClick={() => props.selectedItemHandler('close')} 
  />
)

export default LeftContainer