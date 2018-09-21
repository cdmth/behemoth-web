import * as moment from 'moment'

export const countHours = (start, end) => {
  const duration = moment.duration(moment(end).diff(moment(start)))
  const hours : any= Math.round(duration.asHours()).toString()
  const minutes : any = (duration.asHours() % 1 * 60).toString()

  const resultHours = hours === '0' && minutes === '0' ? '' : hours
  const resultMinutes = minutes === '0' ? (hours === '0' ? '' : ':00h') : ':' + minutes + 'h'

  return resultHours + resultMinutes
}