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

interface IUpdateCustomerProps {
  selectedCustomerId: string
  name: string
}

export { ISingleCustomerProps, ISingleCustomerState, IListCustomerState, IDeleteCustomerProps, IUpdateCustomerProps}