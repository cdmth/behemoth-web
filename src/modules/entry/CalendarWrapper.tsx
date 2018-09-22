import * as React from 'react'
import BigCalendar from 'react-big-calendar'
import * as moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../calendarStyle.css'
import { countHours } from '../../helpers/timeHelper'

BigCalendar.momentLocalizer(moment)

function Event({ event } : any) {
  return (
    <span>
      <span className="is-pulled-left">
        <p className="is-size-5">{event.name}</p>
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
    this.setState({
      view: x
    })
  }

  public onSelectSlot(times) {
    this.props.handleCreateClick(times)
  }

  public onSelectedEvent(entry) {
    this.props.handleEntryClick(entry)
  } 


  public render() {
    const minTime = new Date();
    minTime.setHours(7,0,0);

    const maxTime = new Date()
    maxTime.setHours(22,0,0)


    return (
      <div className="" style={{backgroundColor:"#002b36"}}>
        <BigCalendar 
        events={this.props.events} 
        view={this.state.view}
        onView={this.onView}
        views={['day', 'work_week', 'week', 'month']}
        selectable={this.props.selectable}
        onSelectSlot={(times:any) => this.onSelectSlot(times)}
        onSelectEvent={(entry:any) => this.onSelectedEvent(entry)}
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