import * as React from 'react'
import { Query } from 'react-apollo'
import { getEntries, entriesSubscription } from '../../graphql/queries/queries'
import DashboardCreate from './DashboardCreate'
import DashboardList from './DashboardList'
import LastDayChart from '../charts/LastDayChart'



class Dashboard extends React.Component {

  public render() {

    let unsubscribe: any = null

    return (
      <div style={{height: '800px'}}>
        <Query query={getEntries} onCompleted={() => this.setState({creating:false})}>
          {({ loading, error, data, subscribeToMore, refetch}) => {
            if (loading) { 
              return "Loading"
            }

            if (error) { return `Error! ${error.message}` }

            if (!unsubscribe) {
              unsubscribe = subscribeToMore({
                document: entriesSubscription,
                updateQuery: () => { 
                  refetch().then((data : any) => data) 
                }
              })
            }

            return (
            <div className="columns">
              <div className="column is-3">
                <DashboardCreate />
                <DashboardList entries={data.entries}/>
              </div>
              <div className="column is-3">
                <LastDayChart data={data.entries}/>
              </div>
            </div>)
          }}
        </Query>
      </div>
    );
  }
}

export default Dashboard;