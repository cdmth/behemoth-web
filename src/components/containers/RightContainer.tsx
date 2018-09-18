import * as React from 'react'

import ClosePanel from '../actionbuttons/ClosePanel'

export const RightContainer : React.SFC<any> = (props) => (
  <div className="column">
    <div className="box top-margin-20">
      <ClosePanel selectedItemHandler={props.selectedItemHandler}/>
      {props.selectedItemId === 'add' ? (
        React.cloneElement(props.createComponent, {
          selectedItemHandler: props.selectedItemHandler,
          addMutation: props.addMutation,
          addItemText: props.addItemText,
          modulePrefix: props.modulePrefix,
          deleteMutation: props.deleteMutation
        })) :

        React.cloneElement(props.showComponent, {
          selectedItemHandler: props.selectedItemHandler,
          deleteMutation: props.deleteMutation,
          selectedItemId: props.selectedItemId,
          queryOne: props.queryOne,
          updateMutation: props.updateMutation
        }) }
    </div>
  </div>
)

export default RightContainer