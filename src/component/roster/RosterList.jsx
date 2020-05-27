import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Box} from '@material-ui/core';
import {
  //useHistory,
  Link
} from "react-router-dom";
//https://www.npmjs.com/package/react-data-table-component#demo-and-examples

// moment.utc(date).format(formatDate, 'YYYY/MM/DD');
export const RosterList = (props) => {  
  const { 
    listRoster, 
    loadListRoster,
  } = props;
  
  //let history = useHistory();
  //const [estado, setEstado] = useState('rosters');

  const formatDateCustom = (fecha) => {
    return moment.utc(fecha).format('YYYY/MM/DD');
  }

  useEffect(() => {
    loadListRoster();
    // eslint-disable-next-line
  }, [] );    

  const columns = [
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
      name: 'Faction',
      selector: 'mainFaction',
      sortable: true,
      right: false,
    },    
    {
      name: 'Created At',
      sortable: true,
      right: false,
      cell: row => <div>{formatDateCustom(row.createdAt)}</div>,
    },
    {
      name: 'Actions',
      sortable: false,
      right: false,
      cell: row => 
        <Box mt={1} mb={1}>
          <Link to={`/rosterImport`}>
            <VisibilityIcon fontSize="small" />
          </Link>
        </Box>,
      width: '140px',
    },
  ];

  return (    
    <div>
      <h3>Hello Roster List</h3>
      <DataTable        
        title="Rosters"
        columns={columns}
        data={listRoster}
      />
    </div>
    )
  };
    
  RosterList.propTypes = {
    listRoster:   PropTypes.array.isRequired,
    loadListRoster:    PropTypes.func.isRequired,
  }