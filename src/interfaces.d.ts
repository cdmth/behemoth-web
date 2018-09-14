interface ISingleCustomerProps {
  selectedCustomerId: string
}

interface ISingleCustomerState {
  edit: boolean
}

interface IListCustomerState {
  selectedCustomerId: string
}

interface IDeleteCustomerProps {
  selectedCustomerId: string
}

interface IGetCustomerProps {
  openCustomer: any
}

interface ICreateCustomerProps {
  addCustomerHandler: any
}

interface IUpdateCustomerProps {
  selectedCustomerId: string
  name: string
}

export { ISingleCustomerProps, ISingleCustomerState, IGetCustomerProps, ICreateCustomerProps, IListCustomerState, IDeleteCustomerProps, IUpdateCustomerProps}