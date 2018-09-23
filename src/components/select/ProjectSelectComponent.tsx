import * as React from 'react'
import { Query } from "react-apollo"
import { queryAllProjects } from '../../graphql/queries/queries'
import Loading from '../../components/Loading'

const ProjectsSelectComponent : React.SFC<any> = (props) => (
  <Query query={queryAllProjects} fetchPolicy={"cache-and-network"}>
    {({ loading, error, data}) => {
      if (loading) { return <Loading /> }
      if (error) { return `Error! ${error}`}
      
      const selectedCustomerIndex = data.customers.findIndex(customer => {
        return customer._id === props.customerId
      })

      return (
        <div>
          <div className="field">
          <label className="label">Select customer</label>
            <div className="select is-fullwidth">
              <select name="customerId" className="input" onChange={e => props.onChange(e)}>
                {data.customers.map((customer:any) => (
                  <option key={customer._id} value={customer._id}>{customer.name}</option>
                ))}
              </select>
            </div>
          </div>
          {props.customerId !== '' ? 
          <div className="field">
            <label className="label">Select project</label>
            <div className="select is-fullwidth">
              <select name="projectId" className="input" onChange={e => props.onChange(e)}>
                {data.customers[selectedCustomerIndex].projects.map((project:any) => (
                  <option key={project._id} value={project._id}>{project.name}</option>
                ))}
              </select>
            </div>
          </div> : ''}
        </div>
        )
      }}
  </Query>
)

export default ProjectsSelectComponent