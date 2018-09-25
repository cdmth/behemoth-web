import * as React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import { getBills } from '../../graphql/queries/queries'

const ListBills = () => {
  return (
    <div>
    <Query query={getBills} >
      {({ error, loading, data }) => {
        if(loading) { return <Loading /> }
        if(error) {return `Error! ${error}` }

        return (
          data.bills.map(bill => (<Link key={bill._id} to={`/bills/${bill._id}`}>{bill._id}</Link>))
        )
      }} 
    </Query>
    </div>
  )
}

export default ListBills