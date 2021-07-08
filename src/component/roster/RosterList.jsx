import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LinearProgress from '@material-ui/core/LinearProgress';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {styles} from './RosterStyle'
import {
  //useHistory,
  Link
} from "react-router-dom";
//https://www.npmjs.com/package/react-data-table-component#demo-and-examples

// moment.utc(date).format(formatDate, 'YYYY/MM/DD');

const useStyles = makeStyles((theme) => (styles(theme)));

export const RosterList = (props) => {  
  const { 
    listRoster, 
    loadListRoster,
    loading,
  } = props;
  // eslint-disable-next-line
  const classes = useStyles();  
  //let history = useHistory();
  //const [estado, setEstado] = useState('rosters');

  const formatDateCustom = (fecha) => {
    return moment.utc(fecha).format('YYYY/MM/DD');
  }

  const rosterLink = (roster) => {
    const linkRoster = '/statistics/rosterId='+roster._id;
    return (
      <Box mt={1} mb={1}>
        <Link to={linkRoster}>
          <VisibilityIcon fontSize="small" />
        </Link>
      </Box>      
    );
  }

  console.log(listRoster, 'listRoster');
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
        <Box mt={1} mb={1}>{rosterLink(row)}</Box>,
      width: '140px',
    },
  ];

  return (    
    <div>
      <h3>Hello Roster List</h3>
      {loading && <LinearProgress />}
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
    loading: PropTypes.bool.isRequired,
  }