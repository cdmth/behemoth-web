import * as React from 'react'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { IGetProjectProps } from '../../interfaces'

const getProjects = gql`
  {
    projects {
      _id
      name
    }
  }
`

const ProjectsSubscription = gql`
  subscription {
    projects {
      _id
      name
    }
  }
`

let unsubscribe: any = null

export const getProject : React.SFC<IGetProjectProps> = (props) => {
  return (
    <Query query={getProjects}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) {
        return 'Loading...'
      }

      if (error) {
        return `Error! ${error}`
      }

      if (!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: ProjectsSubscription,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) {
              return prev
            }
            return {
              projects: subscriptionData.data.projects
            }
          }
        })
      }

      return (
        <div>
          {data.projects.map((project:any) => (
            <a className="panel-block" key={project._id} onClick={() => props.openProject(project._id)}>
              {project.name}
            </a>
          ))}
        </div>
      )
    }}
  </Query>
  );  
};

export default getProject