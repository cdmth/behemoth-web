import * as React from 'react'
import { Query } from 'react-apollo'
import { getEntries, entriesSubscription } from '../../graphql/queries/queries'
import DashboardCreate from './DashboardCreate'
import DashboardList from './DashboardList'
import LastDayChart from '../charts/LastDayChart'
import NumberCharts from '../charts/NumberCharts'


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
              <div className="column is-3">
                <NumberCharts data={data.entries}/>
              </div>
              <div className="column is-3">
                <nav className="level">
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Hours</p>
                      <p className="title">50</p>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">To be Billed</p>
                      <p className="title">8600€</p>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Followers</p>
                      <p className="title">456K</p>
                    </div>
                  </div>
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">On target</p>
                      <p className="title">65%</p>
                    </div>
                  </div>
                </nav>
              </div>
            </div>)
          }}
        </Query>
      </div>
    );
  }
}

export default Dashboard;