import * as React from 'react'
import ListItem from './ListItem'

export const ListContainer : React.SFC<any> = (props) => (
  <nav className="panel top-padding-20 column is-10 is-offset-1">
    {props.data.map((item : any) => (
      <ListItem
        key={`${item._id}-item`}
        selectedItemHandler={props.selectedItemHandler}
        item={item}
        selectedItemId={props.selectedItemId}
        modulePrefix={props.modulePrefix}
      />
    ))}
</nav>
)

export default ListContainer