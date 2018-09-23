import * as React from 'react'
import { Mutation } from 'react-apollo'
import { DatePicker } from 'antd'
import Loading from '../../components/Loading'

import ProjectsSelectComponent from '../../components/select/ProjectSelectComponent'

import { createBill } from '../../graphql/mutations/mutations'

class CreateBill extends React.Component<any, any> {
  constructor(props) {
    super(props)

    this.state = {
      customerId: '',
      projectId: '',
      billingPeriodStart: '',
      billingPeriodEnd: ''
    }
  }  

  public render() {
    return (
      <div>
        <ProjectsSelectComponent 
          customerId={this.state.customerId} 
          onChange={event => this.setState({[event.target.name]: event.target.value})}/>
        <div className="field">
          <label className="label">Billing period start</label>
          <DatePicker
            onChange={(date : any) => {
              this.setState({
                billingPeriodStart: date
              })
            }}
          />
        </div>
        <div className="field">
          <label className="label">Billing period end</label>
          <DatePicker
            onChange={(date : any) => {
              this.setState({
                billingPeriodEnd: date
              })
            }}
          />
        </div>

        <Mutation mutation={createBill}>
          {(create, {loading}) => {
            if (loading) { return <Loading /> }
            return <button onClick={() => create({variables: this.state})}>Create bill €</button> 
          }}
        </Mutation>
      </div>
    )
  }
}

export default CreateBill