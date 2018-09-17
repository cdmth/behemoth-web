import * as React from 'react'

import { IListWorkerState } from '../../interfaces'


import SingleWorker from './SingleWorker'
import CreateWorker from './CreateWorker'
import GetWorkers from './GetWorkers'

class ListWorker extends React.Component<{}, IListWorkerState> {
  constructor(props: any) {
    super(props)

    this.state = {
      selectedWorkerId: "close"
    }
  }

  public addWorkerHandler = (state : string) => {
    this.setState({
      selectedWorkerId: state
    })
  }

  public render() {
    return (
      <div className="columns">
        <div className="column is-6 left-side">
          <div className="spacer-30">
            <p className="title title-text">Workers</p>

            <div className="buttons">
              <a className="button is-primary top-margin-20" onClick={() => this.addWorkerHandler('add')}>Add Worker</a>
            </div>

            <nav className="panel top-padding-20 column is-10 is-offset-1">
              <GetWorkers openWorker={this.openWorker}/>
            </nav>
          </div>
        </div>

        {this.state.selectedWorkerId === 'close' ? '' :     
        <div className="column">
          <div className="box top-margin-20">
          <a className="delete close-tab is-medium" onClick={() => this.addWorkerHandler('close')} />
            {this.state.selectedWorkerId === 'add' ?
              <CreateWorker addWorkerHandler={this.addWorkerHandler} /> :
              <SingleWorker selectedWorkerId={this.state.selectedWorkerId} /> }
          </div>
        </div> }
      </div>
    )
  }

  public openWorker = (id: string) => {
    this.setState({
      selectedWorkerId: id
    })
  }

}

export default ListWorker