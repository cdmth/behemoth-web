import * as React from 'react'
import { Mutation, Query } from "react-apollo"
import { ICreateProjectWorkerProps, ICreateProjectWorkerState } from '../../components/control-interfaces'
import { addProjectWorker, queryAllWorkers } from '../../graphql/queries/queries'

class CreateProjectWorker extends React.Component<ICreateProjectWorkerProps, ICreateProjectWorkerState> {
  constructor(props: any) {
    super(props)
    this.state = {
      workerName: '',
      workerId: '',
      rate: 0
    }
  }

  public handleWorkerChange = (e: any) => {
    const index:any = e.nativeEvent.target.selectedIndex;

    this.setState({
      workerName: e.nativeEvent.target[index].text,
      workerId: e.target.value
    })
  }

  public handleRateChange = (e: any) => {
    this.setState({
      rate: parseFloat(e.target.value)
    })
  }

  public completed = (val : any) => {
    if (val.workers.length > 0) {
      const { name, _id } = val.workers[0]

      this.setState({
        workerName: name,
        workerId: _id
      })
    }
  }

  public render() {
    return (
      <Mutation mutation={addProjectWorker}>
        {(create, { loading }) => {

          if(loading) {
            return "Loading"
          }

          return (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  create({ variables: { 
                    workerId: this.state.workerId,
                    projectId: this.props.selectedItemId,
                    rate: this.state.rate
                  }});
                }}
              >  
                <Query query={queryAllWorkers} onCompleted={(val) => this.completed(val)}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return 'Loading...'
                  }

                  if (error) {
                    return `Error! ${error}`
                  }

                  return (
                    <div> 
                      <div className="field">
                        <label className="label">Select worker</label>
                        <div className="select">
                          <select onChange={e => this.handleWorkerChange(e)} defaultValue={this.state.workerId}>
                            {data.workers.map((worker : any) => (
                              <option key={worker._id} value={worker._id}>{worker.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Rate</label>
                        <input onChange={e => this.handleRateChange(e)} type="number" className="input" placeholder="Rate"/>
                      </div>
                    </div>
                  )
                }}
                </Query>
                <button className="button is-primary is-small" type="submit">Add worker to project</button>
              </form>
          </div>
        )}}
      </Mutation>
    )
  }
};

export default CreateProjectWorker