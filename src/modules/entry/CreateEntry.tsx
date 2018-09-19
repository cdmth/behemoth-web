import * as React from 'react'
import gql from "graphql-tag"
import { Query, Mutation } from 'react-apollo'
import CalendarWrapper from './CalendarWrapper'
import { TimePicker } from 'antd'
import * as moment from 'moment'
import './timepicker.css'

const getProjects = gql`
  {
    projects {
      _id
      name
    }
  }
`

const getEntries = gql`
  {
    entries {
      _id
      projectId
      workerId
      name
      start
      end
      description
    }
  }
`

const getProjectWorkers = gql`
  query getWorkersByProjectId($projectId: String!) {
    getWorkersByProjectId(projectId: $projectId) {
      workers {
        workerId
        name
      }
    }
  }
`

const createEntry = gql`
  mutation CreateEntry($projectId: String!, $workerId: String!, $name: String, $start: String, $end: String, $description: String) {
    createEntry(projectId: $projectId, workerId: $workerId, name: $name, start: $start, end: $end, description: $description) {
      projectId
      workerId
      name
      start
      end
      description
    }
  }
`

export default class CreateEntry extends React.Component<{}, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      projectId: '',
      workerId: '',
      start: moment(), 
      end: moment(),
      description: '',
      pickerOpen: false
    }
  }

  public handleStartChange(start: any) {
    this.setState({
      start
    })
  }

  public handleEndChange(end: any) {
    this.setState({
      end
    })
  }

  public onChange(e:any) {
    // @ts-ignore
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  public mapper(e:any, data: any) {
    const index = data.findIndex((x:any) => x.workerId === e.target.value)
    return data[index].name
  }

  public onChangeSelect(e:any, data: any) {
    // @ts-ignore
    this.setState({
      [e.target.name]: e.target.value,
      name: this.mapper(e, data)
    })
  }

  public onChangeNumber(e:any) {
    const n = parseInt(e.target.value, 0)
    // @ts-ignore
    this.setState({
      [e.target.name]: isNaN(n) ? 0 : n
    })
  }

  public setDefaultProject(val:any) {
    this.setState({
      projectId: val.projects[0]._id
    })
  } 

  public setDefaultProjectWorker(val:any) {
    if (val.getWorkersByProjectId.workers.length) {
      this.setState({
        workerId: val.getWorkersByProjectId.workers[0].workerId
      })
    }
  }

  public togglePicker(x) {
    this.setState({
      pickerOpen: x
    })
  }

  public render() {
    return (
      <div>
      <Mutation mutation={createEntry}>
        {(create, { loading }) => {

          if(loading) {
            return "Loading"
            console.log(moment())
          }

          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                create({ variables: this.state })
              }}
            >
            <div className="field is-horizontal add-bar">
              <div className="field-label is-normal">
                <label className="label">From</label>
              </div>
              <div className="field-body">
              <Query query={getProjects} onCompleted={(val) => this.setDefaultProject(val)}>
              {({ loading, error, data }) => {
                if (loading) {
                  return 'Loading...'
                }
                console.log(data)
                if (error) {
                  return `Error! ${error}`
                }

                return (
                  <div className="field">
                    <div className="select">
                      <select className="input is-small" name="projectId" onChange={(e) => this.onChange(e)}>
                        {data.projects.map((project:any) => (
                          <option key={project._id} value={project._id}>{project.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  )
                }}
              </Query>

              <Query query={getProjectWorkers} 
                variables={{projectId: this.state.projectId}}>
              {({ loading, error, data}) => {
                if (loading) {
                  return "Loading"
                }

                if (error) {
                  return `Error! ${error.message}`
                }

                console.log(this.state)
                
                return (
                  <div className="field">
                    <div className="select">
                      <select className="input is-small" name="workerId" onChange={(e:any) => this.onChangeSelect(e, data.getWorkersByProjectId.workers)}>
                      {data.getWorkersByProjectId.workers.map((worker: any) => 
                        <option key={worker.workerId} value={worker.workerId}>{worker.name}</option>
                      )}
                      </select>
                    </div>
                  </div>
                  )
                }}
              </Query>
              <div className="field">
                <input 
                  className="input is-small" 
                  name="description" 
                  placeholder="Add description"
                  value={this.state.description} 
                  onChange={e => this.onChange(e)}/>
              </div>
              <div className="field">
                <TimePicker  
                  format={'HH:mm'}
                  onChange={(start: any) => this.handleStartChange(start)}
                  onOpenChange={(x: boolean) => this.togglePicker(x)}
                  value={this.state.start}
                  />
              </div>
              <div className="field">
                <TimePicker 
                  format={'HH:mm'} 
                  onChange={(end: any) => this.handleEndChange(end)}
                  onOpenChange={(x: boolean) => this.togglePicker(x)}
                  value={this.state.end}
                  />
              </div>
              <div className="field">
                <button 
                  className="button is-primary is-small" 
                  type="submit">Save</button>
              </div>
              </div>
              </div>
            </form>
            )
          }}
        </Mutation>
        <Query query={getEntries}>
          {({ loading, error, data}) => {
            if (loading) {
              return "Loading"
            }

            if (error) {
              return `Error! ${error.message}`
            }

            const entries  = data.entries.map((item: any) => {
              return {
                workerId: item._id,
                title: `${item.name}: ${item.description}`,
                start: moment(item.start).toDate(),
                end: moment(item.end).toDate(),
              }
            })

            const addStateToEntires = () => {
              const onGoing = {
                id: this.state.workerId,
                title: `Draft! ${this.state.name}: ${this.state.description}`,
                start: moment(this.state.start).toDate(),
                end: moment(this.state.end).toDate(),
              }

              entries.push(onGoing)
            }

            addStateToEntires()

            return (
            <CalendarWrapper 
              handleStartChange={(start:any)  => this.handleStartChange(start)} 
              handleEndChange={(end:any)  => this.handleEndChange(end)} 
              selectable={!this.state.pickerOpen}
              events={entries}
              />
            )
          }}
        </Query>>
      </div>
    )
  }
}