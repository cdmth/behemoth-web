import * as React from 'react'
import BigCalendar from 'react-big-calendar'
import * as moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendarStyle.css'

// @ts-ignore
BigCalendar.momentLocalizer(moment)

class SingleCustomer extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <BigCalendar 
        events={[]} 
        view={'week'}
        />
      </div>
    )
  }
}

export default SingleCustomer