export interface ISingleCustomerProps {
  selectedCustomerId: string
}

export interface ISingleCustomerState {
  edit: boolean
}

export interface IListCustomerState {
  selectedCustomerId: string
}

export interface IDeleteCustomerProps {
  selectedCustomerId: string
}

export interface IGetCustomerProps {
  openCustomer: any
}

export interface ICreateCustomerProps {
  addCustomerHandler: any
}

export interface IUpdateCustomerProps {
  selectedCustomerId: string
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
  start: number,
  end: number, 
  description: string
}
