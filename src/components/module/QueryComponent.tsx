import * as React from 'react'
import { Query } from 'react-apollo';
import { INavContainerProps } from '../control-interfaces'

import Loading from '../Loading'

let unsubscribe: any = null

export const QueryComponent : React.SFC<INavContainerProps> = (props) => {
  return (
    <Query query={props.queryAll}>
    {({ loading, error, data, subscribeToMore, refetch }) => {
      if (loading) { return <Loading /> }

      if (error) { return `Error! ${error}` }

      if (!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: props.subscription,
          updateQuery: () => {
            refetch().then(data => data)
          }
        })
      }

      const shortenedData = data[Object.keys(data)[0]]

      return (
        <div>
          {props.modulePrefix === 'projects' ? (
            shortenedData.filter((item : any) => item.projects.length > 0 ).map((item : any) => (
              <div key={item._id} className="company-project">
                <p className="is-size-4">{item.name}</p>
                <nav className="panel top-padding-20 column is-10 is-offset-1">
                  {item.projects.map((project : any) => (
                    <a className={`panel-block ${props.modulePrefix}`} key={project._id} onClick={() => props.selectedItemHandler(project._id)}>
                      {project.name}
                    </a>
                  ))}
                </nav>
              </div>
            ))) : (
            <nav className="panel top-padding-20 column is-10 is-offset-1">
              {shortenedData.map((item : any) => (
              <a  key={item._id} className={`panel-block ${props.modulePrefix}`} onClick={() => props.selectedItemHandler(item._id)}>
                {item.name}
              </a>
              ))}
            </nav>
            )}
        </div>
      )
    }}
  </Query>
  );
};

export default QueryComponent