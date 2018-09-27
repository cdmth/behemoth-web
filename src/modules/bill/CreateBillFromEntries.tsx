import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import { getProjectsAndEntries } from '../../graphql/queries/queries'
import { createBill } from '../../graphql/mutations/mutations'

const createBillArgs = (project) => {
  const unbilled = project.entries.filter(entry => {
    return entry.bill === null
  })
  
  let earliestStart
  let latestEnd

  unbilled.forEach(entry => {
    if (entry.start < earliestStart || !earliestStart) {
      earliestStart = entry.start
    }
    
    if (entry.end > latestEnd || !latestEnd) {
      latestEnd = entry.end
    }
  })

  const createBillArgs = { 
    projectId: project._id, 
    customerId: project.customerId, 
    billingPeriodStart: earliestStart, 
    billingPeriodEnd: latestEnd
  }

  return createBillArgs
}

const createBillFrom = () => {
  return (<div>
      <Query query={getProjectsAndEntries}>
        {({ error, loading, data }) => {
          if(loading) { return <Loading /> }
          if(error) { return `Error! ${error}` }

          return data.projects.map(project => (
            <div>
              <h1>{project.name}</h1>
              <ul>
                {project.entries ? project.entries.map(entry => (
                  <li>
                    <span>Start {entry.start}</span> - <span>End {entry.end}</span>
                    <span>$$$ {entry.price}</span>
                    <span>Bill status: {entry.bill ? entry.bill.status : 'ADD ME TO BILL!'}</span>
                    {entry.bill ? <Link key={entry.bill._id} to={`/bills/${entry.bill._id}`}>{entry.bill._id}</Link> : ''}
                  </li>
                )) : ''} 
              </ul>
              <Mutation mutation={createBill}>
                {(create, {loading}) => {
                  if (loading) { return <Loading /> }
                  return <button onClick={() => create({variables: createBillArgs(project)})}>Add unbilled entries to bill</button> 
                }}
              </Mutation> 
            </div>)
          )
        }}
      </Query>
    </div>
  )
}

export default createBillFrom