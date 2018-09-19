import * as React from 'react'
import * as moment from 'moment'
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
              <div className="notification is-dark" key={entry._id}>
                <p className='is-size-7'>{entry.name}</p>
                <p className='is-size-7'>{moment(entry.start).format('DD.MM.YYYY HH:mm')} - {moment(entry.end).format('DD.MM.YYYY HH:mm')}</p>
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