import * as React from 'react'
import { graphql } from 'react-apollo';
import { workersSubscription, queryAllWorkers } from '../../graphql/queries/queries'
import Loading from '../../components/Loading'
import ListContainer from '../../components/querylist/ListContainer'

class QueryComponent extends React.Component<any, {}> {

  public componentWillMount() {
    const { subscribeToMore, refetch } = this.props.data;
    subscribeToMore({
      document: workersSubscription,
      updateQuery: () => { 
        refetch().then((data : any) => data) 
      }
    });
  }

  public render() {
    const { loading, error } = this.props.data
    if (loading) { return <Loading /> }
    if (error) { return `Error! ${error}` }

    return (
      <ListContainer 
        selectedItemHandler={this.props.selectedItemHandler}
        modulePrefix={this.props.modulePrefix}
        data={this.props.data[this.props.modulePrefix]}
        selectedItemId={this.props.selectedItemId}
      />
    )
  }
}

export default graphql<any>(queryAllWorkers)(QueryComponent)