import * as React from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { IGetProjectProps } from '../../interfaces'

const getProjectsByCustomer = gql`
  {
    customersWithProjects {
      _id
      name
      projects {
        _id
        name
      }
    }
  }
`

const customersSubscription = gql`
  subscription {
    customersWithProjects {
      _id
      name
      projects {
        _id
        name
      }
    }
  }
`

let unsubscribe: any = null

export const getProject : React.SFC<IGetProjectProps> = (props) => {
  return (
    <Query query={getProjectsByCustomer}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) {
        return 'Loading...'
      }

      if (error) {
        return `Error! ${error}`
      }

      if (!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: customersSubscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) {
              return prev
            }
            return {
              customersWithProjects: subscriptionData.data.customersWithProjects
            }
          }
        })
      }

      return (
        <div>
          {data.customersWithProjects.map((customer:any) => (
            <div key={customer._id} className="company-project">
              <p className="title is-size-5">
                {customer.name}
              </p>
              <p className="subtitle is-size-6">
                {customer._id}
              </p>
              <nav className="panel top-padding-20 column is-10 is-offset-1">
                {customer.projects.map((project: any) => (
                  <a className="panel-block" key={project._id} onClick={() => props.openProject(project._id)}>
                    {project.name}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
      )
    }}
  </Query>
  );  
};

export default getProject