import * as React from 'react'
import { ITitleProps } from '../control-interfaces'

export const TitleComponent : React.SFC<ITitleProps> = (props) => (
  <p className="title title-text">{props.moduleName}</p>
)

export default TitleComponent