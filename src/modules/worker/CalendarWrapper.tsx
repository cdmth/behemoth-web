import * as React from 'react'
import BigCalendar from 'react-big-calendar'
import * as moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.momentLocalizer(moment)

class SingleCustomer extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      view: 'work_week'
    }
  }

  public onView(x) {
    console.log(x)
    this.setState({
      view: x
    })
  }

  public onSelectSlot(x) {
    console.log(this.props)
  }

  public render() {
    return (
      <div>
        <BigCalendar
        events={[]}
        view={this.state.view}
        onView={this.onView}
        views={['day', 'work_week', 'week', 'month']}
        onSelectSlot={(e:any) => this.onSelectSlot(e)}
        />
      </div>
    )
  }
}

export default SingleCustomer