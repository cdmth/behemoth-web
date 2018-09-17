import * as React from 'react'
import { IWrapComponentProps, IWrapComponentState } from './control-interfaces'

import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'

class WrapComponent extends React.Component<IWrapComponentProps, IWrapComponentState> {
  public state = {
    selectedItemId: 'close'
  }

  public selectedItemHandler = (state : string) => {
    this.setState({
      selectedItemId: state
    })
  }

  public render() {
    return (
      <div className="columns">
        <LeftContainer 
          selectedItemHandler={this.selectedItemHandler}
          moduleName={this.props.moduleName}
          addItemText={this.props.addItemText}
          queryAll={this.props.queryAll}
          subscription={this.props.subscription}
          modulePrefix={this.props.modulePrefix}
        />
        {this.state.selectedItemId === 'close' ? '' :     
        <RightContainer 
          selectedItemHandler={this.selectedItemHandler}
          selectedItemId={this.state.selectedItemId}
          addItemText={this.props.addItemText}
          modulePrefix={this.props.modulePrefix}
          addMutation={this.props.addMutation}
          deleteMutation={this.props.deleteMutation}
          queryOne={this.props.queryOne}
          updateMutation={this.props.updateMutation}
        />
        }
      </div>
    )
  }
}

export default WrapComponent