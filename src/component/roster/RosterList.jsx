import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
//https://www.npmjs.com/package/react-data-table-component#demo-and-examples

export const RosterList = (props) => {  
  const { 
    roster, 
  } = props;
  

  useEffect(() => {
  }, [roster]);

  const columns = [
    {
      name: 'ID',
      selector: '_id',
      sortable: false,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      right: false,
    },
    {
      name: 'Warlord',
      selector: 'teamOwner',
      sortable: true,
      right: false,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      right: false,
    },
  ];

  return (    
    <div>
      <h3>Hello Roster List</h3>
      <DataTable        
        title="Rosters"
        columns={columns}
        data={roster.list}
      />
    </div>
    )
  };
    
  RosterList.propTypes = {
    roster:   PropTypes.object.isRequired,
  //  loadListRoster:    PropTypes.func.isRequired,
  }