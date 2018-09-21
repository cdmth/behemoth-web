import * as React from 'react'
import { graphql } from 'react-apollo';
import { queryAllProjects, projectsSubscription } from '../../graphql/queries/queries'
import Loading from '../../components/Loading'
import ProjectListContainer from '../../components/querylist/ProjectListcontainer'

class QueryComponent extends React.Component<any, {}> {

  public componentWillMount() {
    const { subscribeToMore, refetch } = this.props.data;
    subscribeToMore({
      document: projectsSubscription,
      updateQuery: () => { 
        refetch().then((data : any) => data) 
      }
    });
  }

  public mapFunction() {
    return this.props.data.customers.map((customer : any) => (
      <ProjectListContainer 
        key={`${customer._id}-list`}
        selectedItemHandler={this.props.selectedItemHandler}
        modulePrefix={this.props.modulePrefix}
        data={customer}
        selectedItemId={this.props.selectedItemId}
      />
    ))
  }

  public render() {
    const { loading, error } = this.props.data
    if (loading) { return <Loading /> }
    if (error) { return `Error! ${error}` }

    return (
      <div className="project-by-customer">
        {this.mapFunction()}
      </div>
    )
  }
}

export default graphql<any>(queryAllProjects)(QueryComponent)