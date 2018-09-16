import * as React from 'react'
import gql from "graphql-tag"
import { Query, Mutation } from 'react-apollo'
import { ICreateEntryState } from '../../interfaces'

const getProjects = gql`
  {
    projects {
      _id
      name
    }
  }
`

const createEntry = gql`
  mutation CreateEntry($projectId: String!, $start: Int, $end: Int, $description: String) {
    createEntry(projectId: $projectId, start: $start, end: $end, description: $description) {
      projectId
      start
      end
      description
    }
  }
`

export default class CreateEntry extends React.Component<{}, ICreateEntryState> {
  constructor(props: any) {
    super(props)

    this.state = {
      projectId: '',
      start: 0, 
      end: 0,
      description: ''
    }
  }

  public onChange(e:any) {
    // @ts-ignore
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  public onChangeNumber(e:any) {
    const n = parseInt(e.target.value, 0)
    // @ts-ignore
    this.setState({
      [e.target.name]: isNaN(n) ? 0 : n
    })
  }

  public render() {
    return (
      <Mutation mutation={createEntry}>
        {(create, { loading }) => {

          if(loading) {
            return "Loading"
          }

          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                create({ variables: this.state })
              }}
            >
              <Query query={getProjects}>
              {({ loading, error, data }) => {
                if (loading) {
                  return 'Loading...'
                }

                if (error) {
                  return `Error! ${error}`
                }

                return (
                  <div>
                    <label className="label">Select project</label>
                    <div className="select">
                      <select className="input" name="projectId" onChange={e => this.onChange(e)}>
                        {data.projects.map((project:any) => (
                          <option key={project._id} value={project._id}>{project.name}</option>
                        ))}
                      </select>
                    </div>  
                  </div>
                  )
                }}
              </Query>

              <label className="label">Description</label>
              <input className="input" name="description" value={this.state.description} onChange={e => this.onChange(e)}/> 

              <label className="label">Start at</label>
              <input className="input" type="number" name="start" value={this.state.start} onChange={e => this.onChangeNumber(e)}/>
              
              <label className="label">End at</label>
              <input className="input" type="number" name="end" value={this.state.end} onChange={e => this.onChangeNumber(e)}/>
              
              <button className="button is-primary" type="submit">Save</button>
            </form>
            )
          }}
      </Mutation>
    )
  }
}