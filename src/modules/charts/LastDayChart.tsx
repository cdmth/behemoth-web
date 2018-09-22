/* tslint:disable */
import * as React from 'react'
import * as moment from 'moment'
import * as Chart from 'chart.js'
import { Bar, Bubble } from 'react-chartjs-2';

import { durationInHours } from '../../helpers/timeHelper'
import DashboardCalendar from '../dashboard/DashboardCalendar';


class LastDayChart extends React.Component<any, any> {

  public render() {
    // @ts-ignore
    Chart.defaults.global.animation = {
      duration: 1500,
      easing: 'easeOutQuint'
    }

    const labels = this.props.data.map((item) => moment(item.start).format('DD.MM'))
    const data = this.props.data.map((item) => durationInHours(item.start, item.end))
    const chartData = {
      labels,
      datasets: [{
        label: "Last days",
        backgroundColor: '#7bff00',
        data
      }]
    }

    const bubbleSet = this.props.data.map((item) => {
      return {
        x: moment(item.start).day(),
        y: moment(item.start).week(),
        r: durationInHours(item.start, item.end)
      }
    })

    const bubbleData = {
      datasets: [{
        label: "Last days",
        backgroundColor: '#7bff00',
        data: bubbleSet
      }]
  }

    return (
      <div>
        <Bar
            ref='BarChart'
            data={chartData}
          />
        <Bubble
          data={bubbleData} />
        <DashboardCalendar events={this.props.data}/>  
      </div>
    )
  }
}

export default LastDayChart;