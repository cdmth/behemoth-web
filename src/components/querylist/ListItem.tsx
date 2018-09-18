import * as React from 'react'

interface IListItem {
  modulePrefix: string
  item: any
  selectedItemHandler(id : string): void
}

export const ListItem : React.SFC<IListItem> = (props) => (
  <a className={`panel-block ${props.modulePrefix}`} onClick={() => props.selectedItemHandler(props.item._id)}>
    {props.item.name}
  </a>
)

export default ListItem