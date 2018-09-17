export interface ISingleCustomerProps {
  selectedCustomerId: string
}

export interface ISingleCustomerState {
  edit: boolean
}

export interface ISingleWorkerProps {
  selectedWorkerId: string
}

export interface ISingleWorkerState {
  edit: boolean
}

export interface IListWorkerState {
  selectedWorkerId: string
}

export interface IListWorkerState {
  selectedWorkerId: string
}

export interface IListCustomerState {
  selectedCustomerId: string
}

export interface IDeleteCustomerProps {
  selectedCustomerId: string
}

export interface IDeleteWorkerProps {
  selectedWorkerId: string
}

export interface IGetCustomerProps {
  openCustomer: any
}

export interface IGetWorkersProps {
  openWorker: any
}

export interface ICreateCustomerProps {
  addCustomerHandler: any
}

export interface IUpdateCustomerProps {
  selectedCustomerId: string
  name: string
}

export interface IUpdateWorkerProps {
  selectedWorkerId: string,
  name: string
}

export interface ISingleProjectProps {
  selectedProjectId: string
}

export interface ISingleProjectState {
  edit: boolean
}

export interface IListProjectState {
  selectedProjectId: string
}

export interface IDeleteProjectProps {
  selectedProjectId: string
}

export interface IGetProjectProps {
  openProject: any
}

export interface ICreateProjectProps {
  addProjectHandler: any
}

export interface IUpdateProjectProps {
  selectedProjectId: string
  name: string
}

export interface ICreateEntryState {
  projectId: string,
  workerId: string,
  start: number,
  end: number, 
  description: string
}

export interface IProjectWorkersProps {
  selectedProjectId: string
}

export interface ICreateProjectWorkerProps {
  selectedProjectId: string
}

export interface ICreateProjectWorkerState {
  workerName: string,
  workerId: string
}

export interface ICreateWorkerProps {
  addWorkerHandler: any
}