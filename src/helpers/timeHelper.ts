import * as moment from 'moment'

export const durationInHours : any = (start : any, end : any) => moment.duration(moment(end).diff(moment(start))).asHours() 

export const countHours = (start, end) => {

  const hours : any= Math.round(durationInHours(start, end)).toString()
  const minutes : any = (durationInHours(start, end) % 1 * 60).toString()

  const resultHours = hours === '0' && minutes === '0' ? '' : hours
  const resultMinutes = minutes === '0' ? (hours === '0' ? '' : ':00h') : ':' + minutes + 'h'

  return resultHours + resultMinutes
}