import * as React from 'react'
import BigCalendar from 'react-big-calendar'
import * as moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { countHours } from '../../helpers/timeHelper'

BigCalendar.momentLocalizer(moment)

function Event({ event } : any) {
  return (
    <span>
      <span className="is-pulled-left">
        <p className="is-size-5">{event.title}</p>
        <p className="is-size-6">{event.description}</p>
      </span>
      <p className="is-size-5 is-pulled-right"><strong className="strong-alter">{countHours(event.start, event.end)}</strong></p>
    </span>
  )
}

class SingleCustomer extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      view: 'week'
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
    const minTime = new Date();
    minTime.setHours(7,0,0);

    const maxTime = new Date()
    maxTime.setHours(22,0,0)

    const events = []
    
    return (
      <div className="" style={{backgroundColor:"#002b36"}}>
        <BigCalendar 
        events={events} 
        view={this.state.view}
        onView={this.onView}
        views={['day', 'work_week', 'week', 'month']}
        onSelectEvent={(entry:any) => this.onSelectSlot(entry)}
        min={minTime}
        max={maxTime}
        components={{
          event: Event
        }}
        />
      </div>
    )
  }
}

export default SingleCustomer