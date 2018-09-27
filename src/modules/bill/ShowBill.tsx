import * as React from 'react'
import ReactToPrint from 'react-to-print'
import { Query } from 'react-apollo'
import { getBill } from '../../graphql/queries/queries'
import BillPrint from './BillPrint'

class ShowBill extends React.Component<any, any> {
 
  private componentRef

  constructor(props) {
    super(props)
  }

  public render() {
    return (
      <Query query={getBill} variables={{billId: this.props.match.params.id}}>
        {({loading, error, data}) => {
          if(loading) { return "Loadiiiing"}
          if(error) { return error}

          return (
            <div>
              <ReactToPrint
                trigger={() => <a href="#">Print this out!</a>}
                content={() => this.componentRef}
              />
              <BillPrint props={data.bill} ref={element => (this.componentRef = element)}/>
            </div>  
          )
        }}
      </Query>)
  }
}

export default ShowBill