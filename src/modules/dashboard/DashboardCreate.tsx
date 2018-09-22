import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import { TimePicker, DatePicker } from 'antd'
import { getProjects, getProjectWorkers, createEntry } from '../../graphql/queries/queries'
import { updateEntry, deleteEntry } from '../../graphql/mutations/mutations'
import { countHours } from '../../helpers/timeHelper'
import * as moment from 'moment'

import Loading from '../../components/Loading'

import '../entry/timepicker.css'

export default class DashboardCreate extends React.Component<{}, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      _id: '',
      projectId: '',
      workerId: '',
      start: moment(),
      end: moment(),
      description: '',
      entry: {},
      edit: false,
      initTime: true,
      creating: false
    }
  }

  public changeDate(date) {

    const start = this.state.start.year(date.year()).month(date.month()).date(date.date())
    const end = this.state.end.year(date.year()).month(date.month()).date(date.date())

    this.setState({start, end})
  }

  public handleEntryClick(entry : any) {
    entry.start = moment(entry.start)
    entry.end = moment(entry.end)

    this.setState({...entry, edit: entry._id !== '' ? true : false, initTime: false})
  }

  public handleCreateClick(times : any) {
    times.start = moment(times.start)
    times.end = moment(times.end)

    const {start, end} = times

    this.setState({ start, end, edit: false, _id: '', initTime: false})
  }


  public getNameObject(id, data = this.state.workers) {
    const index = data.findIndex((i) => i.workerId === id)
    return data[index].name || 'No name found on entry'
  }

  public render() {

    return (
      <div className="">
        <Mutation mutation={this.state.edit ? updateEntry : createEntry} onCompleted={() => this.setState({edit: false, initTime: true})}>
        {(create, { loading }) => {
          if(loading) { return <Loading /> }

          const entry = () => {
            const { _id, start, end, description, projectId, workerId } = this.state
            return { _id, start, end, name: this.getNameObject(workerId), description, projectId, workerId }
          }

          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                this.setState({creating: true})
                create({ variables: entry() })
              }}
            >
            <div className="field add-bar">
              <div className="">
                <Query
                  query={getProjects} 
                  fetchPolicy={"cache-and-network"}
                  onCompleted={(data : any) => this.setState({projectId: data.projects[0]._id})}>
                  {({ loading, error, data}) => {
                    if (loading) { return <Loading /> }
                    if (error) { return `Error! ${error}`}

                    return (
                      <div className="field">
                        <div className="select is-fullwidth">
                          <select 
                            className="input" 
                            onChange={(event : any) => this.setState({projectId: event.target.value})}
                            value={this.state.projectId}
                            disabled={!!this.state.edit}
                            >
                            {data.projects.map((project:any) => (
                              <option key={project._id} value={project._id}>{project.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      )
                    }}
                </Query>

                <Query 
                  query={getProjectWorkers}
                  variables={{projectId: this.state.projectId}}
                  onCompleted={(data : any) => this.setState({
                        workers: data.project.workers,
                        workerId: data.project.workers[0].workerId, 
                        name: this.getNameObject(data.project.workers[0].workerId, data.project.workers)
                      })
                    }>
                  {({ loading, error, data }) => {
                    if (loading) { return <Loading /> }
                    if (error) { return `Error! ${error}`}
                  
                    return (
                      <div className="field">
                        <div className="select is-fullwidth">
                          <select
                            className="input is-fullwidth"
                            onChange={(event : any) => this.setState({
                              workerId: event.target.value, 
                              name: this.getNameObject(event.target.value)
                            })}
                            value={this.state.workerId}
                            >
                            {data.project.workers.map((worker: any) => 
                              <option label={worker.name} key={worker._id} value={worker._id} />
                            )}
                          </select>
                        </div>
                      </div>
                    )
                  }}
                </Query>

                <div className="field">
                  <textarea 
                    className="input task-text is-fullwidth" 
                    name="description"
                    placeholder="Add description"
                    onChange={(event : any) => this.setState({description: event.target.value})}
                    value={this.state.description}
                    />
                  </div>
                <div className="field">
                  <DatePicker
                    onChange={(date : any) => this.changeDate(date)}
                    value={this.state.start}
                  />
                </div>
                <div className="field-body">
                  <div className="field is-fullwidth">
                    <TimePicker  
                      format={'HH:mm'}
                      onChange={(start : any) => this.setState({start})}
                      value={this.state.start}
                      />
                  </div>
                  <div className="field is-fullwidth">
                    <p className="is-size-7 show-hours">
                      <strong>
                      {countHours(this.state.start, this.state.end)}
                      </strong>
                    </p>
                  </div>
                  <div className="field is-fullwidth">
                    <TimePicker 
                      format={'HH:mm'}
                      onChange={(end : any) => this.setState({end})}
                      value={this.state.end}
                      />
                  </div>
                </div>
                <button 
                  className="button is-medium is-fullwidth top-margin-20 is-primary is-outlined" 
                  type="submit">
                  {this.state.edit ? 'Update entry' : 'Create entry'}
                </button>
              </div>
              {this.state.edit ? 
              <Mutation mutation={deleteEntry}>
                {(deleteC) => (
                  <button
                    className="button is-medium top-margin-20 is-danger is-outlined"
                    onClick={(e) => { 
                      e.preventDefault();
                      deleteC({ variables: { _id: this.state._id } 
                      });
                    }}>
                    Delete
                  </button>)}
              </Mutation>
              : '' }
              </div>
            </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}