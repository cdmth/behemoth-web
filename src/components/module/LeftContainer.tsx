import { ILeftContainerProps } from './control-interfaces'
import * as React from 'react'

import ControlsComponent from './ControlsComponent'
import NavContainer from './NavContainer'
import TitleComponent from './TitleComponent';

export const LeftContainer : React.SFC<ILeftContainerProps> = (props) => (
  <div className="column is-6 left-side">
    <div className="spacer-30">
      <TitleComponent moduleName={props.moduleName}/>
      <ControlsComponent 
        selectedItemHandler={props.selectedItemHandler}
        addItemText={props.addItemText} 
      />
      <NavContainer 
        selectedItemHandler={props.selectedItemHandler}
        queryAll={props.queryAll}
        subscription={props.subscription}  
        modulePrefix={props.modulePrefix}
      />
    </div>
  </div>
)

export default LeftContainer