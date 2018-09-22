/* tslint:disable */
import * as React from 'react'
import * as moment from 'moment'
import * as Chart from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import { durationInHours } from '../../helpers/timeHelper'


class LastDayChart extends React.Component<any, any> {

  public render() {
    // @ts-ignore
    Chart.defaults.global.animation = {
      duration: 1500,
      easing: 'easeOutQuint'
    }

    // @ts-ignore
    Chart.defaults.global.legend.display = false;

    const data = {
      labels: this.props.data.map((item) => moment(item.start).format('DD.MM')),
      datasets: [{
        data: this.props.data.map((item) => durationInHours(item.start, item.end)),
        backgroundColor: this.props.data.map(() => '#7bff00'),
        borderColor: this.props.data.map(() => '#073642')
      }]
    };

    data.labels.push('Missing from target')
    data.datasets[0].data.push(30)
    data.datasets[0].backgroundColor.push('transparent')
    data.datasets[0].borderColor.push('#073642')

    return (
      <div> 
        <Doughnut
            ref='BarChart'
            data={data}
          />
      </div>
    )
  }
}

export default LastDayChart;