import { ICustomerSingleProps } from '../../interfaces'
import * as React from 'react'

export class CustomerSingle extends React.Component<ICustomerSingleProps, {}> {
  


  public render() {

    return (
      <span>{this.props.selectedCustomerId}</span>
    )
  }
}

export default CustomerSingle