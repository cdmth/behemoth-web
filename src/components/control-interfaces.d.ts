export interface ISelectedItemHandler {
  selectedItemHandler(id : string): void
}

export interface ISelectedItemId extends ISelectedItemHandler {
  selectedItemId: string
}

export interface IToggleEdit {
  edit: boolean,
  editComponent(): void 
}

export interface IEditName {
  name: string
  selectedItemId: string
}

export interface IEditItem {
  edit: boolean
}

// Wrap Component
export interface IWrapComponentState {
  selectedItemId: string
}

export interface IWrapComponentProps {
  moduleName: string
  modulePrefix: string
  addItemText: string
  queryAll: any
  subscription: any
  addMutation: any
  deleteMutation: any
  queryOne: any
  updateMutation: any
}

// LeftContainer Component
export interface ILeftContainerProps {
  selectedItemHandler(id : string): any
  moduleName: string
  modulePrefix: string
  addItemText: string
  queryAll: any
  subscription: any
}

// RightContainer Component
export interface IRightContainerProps {
  selectedItemHandler(id : string): void
  selectedItemId: string
  modulePrefix: string
  addItemText: string
  addMutation: any
  deleteMutation: any
  queryOne: any
  updateMutation: any
}

// Title Component
export interface ITitleProps {
  moduleName: string
}

// Controls Component
export interface IControlsProps extends ISelectedItemHandler {
  addItemText: string
}

// Create Component
export interface ICreateComponent {
  selectedItemHandler(id : string): void
  modulePrefix: string
  addMutation: any
  addItemText: string
  deleteMutation: any
}

export interface ICreateComponentState {
  id: string
  input: string
}

// Open single item Component
export interface IOpenSingleComponentProps {
  selectedItemHandler(id : string): void
  selectedItemId: string
  deleteMutation: any
  queryOne: any
  updateMutation: any
}

// Delete single item component
export interface IDeleteComponent {
  selectedItemHandler(id : string): void
  selectedItemId: string
  deleteMutation: any
}

export interface IUpdateComponent {
  selectedItemId: string
  updateMutation: any
  name: string
}

export interface ICustomerSelectComponent {
  id: string
  onChange(e : any): void
}

export interface IProjectWorkersProps {
  selectedItemId: string
}

export interface ICreateProjectWorkerProps {
  selectedItemId: string
}

export interface ICreateProjectWorkerState {
  workerId: string
  workerName: string
}