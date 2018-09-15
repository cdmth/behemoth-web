import * as React from 'react'
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { ICreateProjectProps } from '../../interfaces'

const getCustomers = gql`
  {
    customers {
      _id
      name
    }
  }
`

const addProject = gql`
  mutation CreateProject($name: String, $customerId: String!) {
    createProject(name: $name, customerId: $customerId) {
      _id
      name
      customerId
    }
  }
`

const createProject : React.SFC<ICreateProjectProps> = (props) => {
  let projectName: any
  let customerId: any

  return (
    <Mutation mutation={addProject} >
      {(create, { loading }) => {

        if(loading) {
          return "Loading"
        }

        return (
        <div>
          <p className="title">Create new project</p>
          <form
            onSubmit={e => {
              e.preventDefault();
              create({ variables: { name: projectName.value, customerId: customerId.value}});
              projectName.value = "";
            }}
          >  
            <Query query={getCustomers}>
            {({ loading, error, data }) => {
              if (loading) {
                return 'Loading...'
              }

              if (error) {
                return `Error! ${error}`
              }

              return (
                <div className="field">
                  <label className="label">Select customer</label>
                  <div className="select">
                    <select ref={node => {customerId = node}}>
                      {data.customers.map((customer:any) => (
                        <option key={customer._id} value={customer._id}>{customer.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )
            }}
            </Query>
              
            <div className="field">
              <label className="label">Project name</label>
              <input ref={node => {projectName = node}} className="input" placeholder="Ex. Homon Kulli -projekti" />
            </div>
            <button className="button is-primary" type="submit">Add Project</button>
          </form>
        </div>
        )
      }}
    </Mutation>
  );
};

export default createProject