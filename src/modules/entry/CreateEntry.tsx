import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import CalendarWrapper from './CalendarWrapper'
import { TimePicker, DatePicker } from 'antd'
import { getProjects, getEntries, getProjectWorkers, createEntry } from '../../graphql/queries/queries'
import { updateEntry } from '../../graphql/mutations/mutations'
import * as moment from 'moment'

import Loading from '../../components/Loading'

import './timepicker.css'

export default class CreateEntry extends React.Component<{}, any> {
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
      initTime: true
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
      <div className="columns">
        <div className="column is-2">
          <Mutation mutation={this.state.edit ? updateEntry : createEntry}>
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
                  create({ variables: entry() })
                }}
              >
              <div className="field add-bar">
                <div className="">
                  <Query 
                    query={getProjects} 
                    onCompleted={(data : any) => this.setState({projectId: data.projects[0]._id})}>
                    {({ loading, error, data }) => {
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
                          workers: data.getWorkersByProjectId,
                          workerId: data.getWorkersByProjectId[0].workerId, 
                          name: this.getNameObject(data.getWorkersByProjectId[0].workerId, data.getWorkersByProjectId)
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
                              {data.getWorkersByProjectId.map((worker: any) => 
                                <option label={worker.name} key={worker.workerId} value={worker.workerId} />
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
                      <TimePicker 
                        format={'HH:mm'}
                        onChange={(end : any) => this.setState({end})}
                        value={this.state.end}
                        />
                    </div>
                  </div>
                  <button 
                    className="button is-large is-fullwidth top-margin-20 is-link" 
                    type="submit">
                    {this.state.edit ? 'Update entry' : 'Create entry'}
                  </button>
                </div>
                </div>
              </form>
              )
            }}
          </Mutation>
        </div>
        <div className="column">
          <Query query={getEntries}>
            {({ loading, error, data}) => {
              if (loading) { return "Loading" }

              if (error) { return `Error! ${error.message}` }

              const entries  = data.entries.map((item: any) => {
                return {
                  workerId: item.workerId,
                  title: `${item.name}: ${item.description}`,
                  start: moment(item.start).toDate(),
                  end: moment(item.end).toDate(),
                  name: item.name,
                  projectId: item.projectId,
                  _id: item._id,
                  description: item.description
                }
              })

              const addDraft = () => {
                entries.push({
                  workerId: this.state.workerId,
                  title: `${this.state.name}: ${this.state.description}`,
                  start: moment(this.state.start).toDate(),
                  end: moment(this.state.end).toDate(),
                  name: this.state.name,
                  projectId: this.state.projectId,
                  _id: this.state._id,
                  description: this.state.description
                })
              }

              if(!this.state.edit && !this.state.initTime) { addDraft() }

              return (
                <CalendarWrapper 
                  handleCreateClick={(times : any) => this.handleCreateClick(times)}
                  selectable={true}
                  events={entries}
                  handleEntryClick={(entry : any) => this.handleEntryClick(entry)}
                  />
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}