import * as React from 'react'
import { Query } from 'react-apollo'

import ToggleEdit from '../actionbuttons/ToggleEdit'
import UpdateComponent from './UpdateComponent'
import DeleteComponent from './DeleteComponent'
import Loading from '../Loading'

class SingleCustomer extends React.Component<any, any> {
  constructor(props : any ) {
    super(props)
    this.state = {
      edit: false
    }
  }

  public editComponent = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  public render() {
    return (
      <div>
        <ToggleEdit edit={this.state.edit} editComponent={this.editComponent}/>
        <Query query={this.props.queryOne} variables={{_id: this.props.selectedItemId}}>
          {({ loading, error, data}) => {
            if (loading) { return <Loading /> }

            if (error) { return `Error! ${error.message}` }

            return (
              <div className="content">
                <p className="title">{data[Object.keys(data)[0]].name}</p>
                {this.state.edit ? 
                <div>
                  <UpdateComponent 
                    selectedItemId={this.props.selectedItemId} 
                    name={data[Object.keys(data)[0]].name}
                    updateMutation={this.props.updateMutation}
                  />
                  <DeleteComponent 
                    deleteMutation={this.props.deleteMutation}
                    selectedItemId={this.props.selectedItemId}
                    selectedItemHandler={this.props.selectedItemHandler} />
                </div> : ''}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default SingleCustomer