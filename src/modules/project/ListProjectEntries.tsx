import * as React from 'react'
import * as moment from 'moment'
import { Query } from 'react-apollo';
import { entriesByProjectId } from '../../graphql/queries/queries'
import Loading from '../../components/Loading'
import CalendarWrapper from './ProjectCalendarWrapper'
import Entry from '../../components/partials/Entry'

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
              <div className="column is-3">
                {data.entriesByProjectId.map((entry:any) => (
                  <Entry key={entry._id} entry={entry} />
                ))}
            </div>
            <div className="column is-9">
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