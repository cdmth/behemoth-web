import * as React from 'react'
import { countHours } from '../../helpers/timeHelper'
import * as moment from 'moment'

const Entry = (props) => {
  return (
    <div className="notification is-dark project-entry" key={props.entry._id}>
      <p className='is-size-7'>{props.entry.name}</p>
      <p className='is-size-7'>{moment(props.entry.start).format('DD.MM.YYYY HH:mm')} - {moment(props.entry.end).format('DD.MM.YYYY HH:mm')}</p>
      <p className="is-size-5"><strong className="strong-alter">{countHours(props.entry.start, props.entry.end)}</strong></p>
      <p className='is-size-9'>{props.entry.description}</p>                  
    </div>
  );
};

export default Entry