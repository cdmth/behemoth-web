import * as React from 'react'

import ControlsComponent from '../actionbuttons/ControlsComponent'
import TitleComponent from '../module/TitleComponent'

interface ILeftContainerProps {
  moduleName: string
  modulePrefix: string
  addItemText: string
  queryAll: any
  subscription: any
  selectedItemHandler(id : string): any
}


export const LeftContainer : React.SFC<ILeftContainerProps> = (props) => {

  return (
    <div className="column is-6 left-side">
      <div className="spacer-30">
        <TitleComponent moduleName={props.moduleName}/>
        <ControlsComponent 
          selectedItemHandler={props.selectedItemHandler}
          addItemText={props.addItemText} 
        />
        {React.cloneElement(props.queryAll, {
          modulePrefix: props.modulePrefix, 
          subscription: props.subscription, 
          selectedItemHandler: props.selectedItemHandler
        })}
      </div>
    </div>
  )
}

export default LeftContainer