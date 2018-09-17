import * as React from 'react'
import { INavContainerProps } from './control-interfaces'

import QueryComponent from './QueryComponent'

export const NavContainer : React.SFC<INavContainerProps>  = (props) => (
    <QueryComponent 
      selectedItemHandler={props.selectedItemHandler}
      queryAll={props.queryAll}
      subscription={props.subscription}
      modulePrefix={props.modulePrefix}
    />
)

export default NavContainer