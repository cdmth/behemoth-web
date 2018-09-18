import * as React from 'react'
import { graphql } from 'react-apollo';
import { queryAllCustomers, customersSubscription } from '../../graphql/queries/queries'
import Loading from '../../components/Loading'
import ListContainer from '../../components/querylist/ListContainer'

interface IQueryComponentProps {
  modulePrefix: string
  data: any
  subscription: any
  selectedItemHandler(id : any): any
}

class QueryComponent extends React.Component<IQueryComponentProps, {}> {

  public componentWillMount() {
    const { subscribeToMore, refetch } = this.props.data;
    subscribeToMore({
      document: customersSubscription,
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
      />
    )
  }
}

export default graphql<any>(queryAllCustomers)(QueryComponent)