import { IRightContainerProps } from './control-interfaces'
import * as React from 'react'

import ClosePanel from './ClosePanel'
import CreateComponent from './CreateComponent'
import OpenSingleComponent from './OpenSingleComponent'

export const RightContainer : React.SFC<IRightContainerProps> = (props) => (
  <div className="column">
    <div className="box top-margin-20">
      <ClosePanel selectedItemHandler={props.selectedItemHandler}/>
      {props.selectedItemId === 'add' ?
        <CreateComponent 
          selectedItemHandler={props.selectedItemHandler}
          addMutation={props.addMutation}
          addItemText={props.addItemText}
          modulePrefix={props.modulePrefix}
          deleteMutation={props.deleteMutation}
        /> :
        <OpenSingleComponent
          deleteMutation={props.deleteMutation}
          selectedItemId={props.selectedItemId}
          selectedItemHandler={props.selectedItemHandler}
          queryOne={props.queryOne}
          updateMutation={props.updateMutation}
        /> }
    </div>
  </div>
)

export default RightContainer