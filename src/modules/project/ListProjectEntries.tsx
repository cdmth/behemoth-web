import * as React from 'react'
import { Query } from 'react-apollo';
import { entriesByProjectId } from '../../graphql/queries/queries'
import Loading from '../../components/Loading'

class QueryComponent extends React.Component<any, any> {
  
  public render() {
    return (
      <Query query={entriesByProjectId} variables={{projectId: this.props.selectedItemId}}>
        {({ loading, error, data}) => {
          if (loading) { return <Loading /> }
          if (error) { return `Error! ${error.message}`}

          console.log(data)

          return (
            <div>
            {data.entriesByProjectId.map((entry:any) => (
              <div className="notification is-dark">
                <p className='is-size-7'>{entry.name}</p>
                <p className='is-size-7'>{entry.start} - {entry.end}</p>
                <p className='is-size-9'>{entry.description}</p>                  
              </div>
            ))}
          </div>
          )}}
      </Query>
    )
  }
}

export default QueryComponent