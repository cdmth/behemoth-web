import * as React from 'react'

export const ListItem : React.SFC<any> = (props) => (
  <a 
    className={`panel-block ${props.modulePrefix} fancy-list-item ${props.selectedItemId === props.item._id ? 'is-active' : ''}`} 
    onClick={() => props.selectedItemHandler(props.item._id)}>
    {props.item.name}
  </a>
)

export default ListItem