import * as React from 'react'
import BigCalendar from 'react-big-calendar'
import * as moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { durationInHours } from '../../helpers/timeHelper'

BigCalendar.momentLocalizer(moment)

// 

const eventStyles = {
  event: {
      backgroundColor:'transparent',
      color: 'white',
      border: "none",
      padding: "0",
      margin: "-14px 0px 0px 0px"
  },
}

const Event = ({ event } : any) => {
  const factor = 3.5
  const radius = durationInHours(event.start, event.end)
  
  return (
    <span>
      <div className="hour-circle" style={{
        'backgroundColor': '#7bff00', 
        'margin': '0 auto', 
        'width': `${radius * factor}px`, 
        'height': `${radius * factor}px`, 
        'borderRadius': `${(radius * factor) / 2}px`}} />
    </span>
  )
}

class DashboardCalendar extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      view: 'month'
    }
  }

  public onView(x) {
    this.setState({
      view: x
    })
  }

  public onSelectSlot(x) {
    console.log(x)
  }

  public render() {
    const minTime = new Date();
    minTime.setHours(7,0,0);

    const maxTime = new Date()
    maxTime.setHours(22,0,0)


    const entries = this.props.events.map((item: any) => {
      return {
        workerId: item.workerId,
        title: item.name,
        start: moment(item.start).toDate(),
        end: moment(item.end).toDate(),
        name: item.name,
        projectId: item.projectId,
        _id: item._id,
        description: item.description
      }
    })
    
    return (
      <div className="" style={{backgroundColor:"#002b36", height: '320px'}}>
        <BigCalendar 
        events={entries} 
        view={this.state.view}
        onView={this.onView}
        views={['month']}
        onSelectEvent={(entry:any) => this.onSelectSlot(entry)}
        min={minTime}
        max={maxTime}
        components={{
          event: Event
        }}
        eventPropGetter={(event,start,end,isSelected)=>{
          return {
              style: eventStyles.event
          }
        }}
        />
      </div>
    )
  }
}

export default DashboardCalendar