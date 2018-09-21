import * as React from 'react'

import ControlsComponent from '../actionbuttons/ControlsComponent'
import TitleComponent from '../module/TitleComponent'

export const LeftContainer : React.SFC<any> = (props) => {

  return (
    <div className="column is-4 left-side">
      <div className="spacer-30">
        <TitleComponent moduleName={props.moduleName}/>
        <ControlsComponent 
          selectedItemHandler={props.selectedItemHandler}
          addItemText={props.addItemText} 
        />
        {React.cloneElement(props.queryAll, {
          modulePrefix: props.modulePrefix, 
          subscription: props.subscription, 
          selectedItemHandler: props.selectedItemHandler,
          selectedItemId: props.selectedItemId
        })}
      </div>
    </div>
  )
}

export default LeftContainer