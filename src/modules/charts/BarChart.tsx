/* tslint:disable */
import * as React from 'react'
import { 
  select,
  scaleBand,
  scaleLinear
} from 'd3'
import { durationInHours } from '../../helpers/timeHelper'
import * as moment from 'moment'

class BarChart extends React.Component<any, any> {

  node: any
  xscale: any
  yscale: any
  domain: any

  constructor(props) {
    super(props)

    this.draw.bind(this)

    this.state = {
      data: [
      { year: 2012, percent: 50 },
      { year: 2013, percent: 30 },
      { year: 2014, percent: 80 },
      { year: 2015, percent: 20 },
      { year: 2016, percent: 55 },
      { year: 2017, percent: 83 },
      ]
    }
  }

  public componentDidMount() {
    this.draw()
  }

  public draw() {
    const node: any = select(this.node)
    const bounds = node.node().getBoundingClientRect();
    const w = bounds.width
    const h = bounds.height
    const { data } = this.props

    const xscale = scaleBand()
    // @ts-ignore
    xscale.domain(data.map(d => moment(d.start).format('DD.MM')))
    // @ts-ignore
    xscale.range([0, w-10])

    const yscale = scaleLinear()

    // @ts-ignore
    yscale.domain([0, 10]) 
    // @ts-ignore
    yscale.range([0, h])


    console.log(h)

    const upd = node.selectAll('rect').data(data)
    upd.enter()
      .append('rect')
      .attr('x', (d:any) => xscale(moment(d.start).format('DD.MM')))
      .attr('y', (d:any) => h - yscale(durationInHours(d.start, d.end)))
      .attr('width', xscale.bandwidth())
      .attr('height', (d:any) => yscale(durationInHours(d.start, d.end)))
      .attr('class', 'test-class')
  }

  public componentDidUpdate() {
    this.draw()
  }

  public render() {
    return (
      <svg
        style={{ width: '100%', height: '100%'}}
        ref={node => {
          this.node = node;
        }} />
    );
  }
}

export default BarChart;