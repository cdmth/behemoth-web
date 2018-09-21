import * as React from 'react'
import * as moment from 'moment'
import { Query } from 'react-apollo';
import { entriesByProjectId } from '../../graphql/queries/queries'
import Loading from '../../components/Loading'
import { countHours } from '../../helpers/timeHelper'
import CalendarWrapper from './ProjectCalendarWrapper'

class QueryComponent extends React.Component<any, any> {
  
  public render() {
    return (
      <Query query={entriesByProjectId} variables={{projectId: this.props.selectedItemId}}>
        {({ loading, error, data}) => {
          if (loading) { return <Loading /> }
          if (error) { return `Error! ${error.message}`}

          const entries = data.entriesByProjectId.map((entry) => {
            return {
              ...entry,
              start: moment(entry.start).toDate(), 
              end: moment(entry.end).toDate()}
          })

          return (
            <div className="columns">
              <div className="column is-4">
                {data.entriesByProjectId.map((entry:any) => (
                  <div className="notification is-dark project-entry" key={entry._id}>
                    <p className='is-size-7'>{entry.name}</p>
                    <p className='is-size-7'>{moment(entry.start).format('DD.MM.YYYY HH:mm')} - {moment(entry.end).format('DD.MM.YYYY HH:mm')}</p>
                    <p className="is-size-5"><strong className="strong-alter">{countHours(entry.start, entry.end)}</strong></p>
                    <p className='is-size-9'>{entry.description}</p>                  
                  </div>
                ))}
            </div>
            <div className="column is-8">
              <CalendarWrapper
                events={entries} 
              />
            </div>
          </div>
          )}}
      </Query>
    )
  }
}

export default QueryComponent