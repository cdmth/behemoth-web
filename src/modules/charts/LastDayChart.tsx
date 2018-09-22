/* tslint:disable */
import * as React from 'react'
import * as moment from 'moment'
import { Bar } from 'react-chartjs-2';

import { durationInHours } from '../../helpers/timeHelper'


class LastDayChart extends React.Component<any, any> {

  public render() {

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

    console.log(data)

    return (
      <Bar
        data={chartData}
      />
    )
  }
}

export default LastDayChart;