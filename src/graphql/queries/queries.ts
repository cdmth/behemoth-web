import gql from "graphql-tag";

// Get all customers
export const queryAllCustomers = gql`
  {
    customers {
      _id
      name
    }
  }
`

// Get single customer
export const queryCustomer = gql`
  query Customer($_id: String!) {
    customer(_id: $_id) {
      name
    }
  }
`

// Customers subscription
export const customersSubscription = gql`
  subscription {
    customers {
      _id
      name
    }
  }
`

// Get all workers
export const queryAllWorkers = gql`
  {
    workers {
      _id
      name
    }
  }
`

// Get single worker
export const queryWorker = gql`
  query worker($_id: String!) {
    worker(_id: $_id) {
      name
    }
  }
`

// Workers subscription
export const workersSubscription = gql`
  subscription {
    workers {
      _id
      name
    }
  }
`

// Get all projects by customer
export const queryAllProjects= gql`
  {
    customers {
      _id
      name
      projects {
        _id
        name
      }
    }
  }
`

// Get single project
export const queryProject = gql`
    query project($_id: String!) {
      project(_id: $_id) {
        name
      }
    }
`

// Get all projects subscription
export const projectsSubscription = gql`
  subscription {
    projects {
      _id
      name
    }
  }
`

export const entriesByProjectId = gql`
  query entriesByProjectId($projectId: String!) {
    entriesByProjectId(projectId: $projectId) {
      _id
      name
      workerId
      description
      start
      end
      projectId
    }
  }
`
