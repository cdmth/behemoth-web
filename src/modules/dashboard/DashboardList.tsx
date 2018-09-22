import * as React from 'react'
import Entry from '../../components/partials/Entry'

const DashboardList = (props) => {
  return (
    <div className="top-padding-20">
      {props.entries.map((entry:any) => (
        <Entry key={entry._id} entry={entry} />
      ))}
    </div>
  );
};

export default DashboardList