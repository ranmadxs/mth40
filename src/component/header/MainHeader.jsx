import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BottomNavigation, Divider, Box} from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import {styles} from './HeaderStyle'
import {
    useHistory
} from "react-router-dom";
// const [estado, setEstado] = React.useState('home');

const useStyles = makeStyles(styles);

function LabelBottomNavigation(props) {
    const uri = window.location.pathname.length>1?window.location.pathname.replace("/", ""):window.location.pathname;
    //console.log(uri, "setEstado");
    const classes = useStyles();
    const [estado, setEstado] = useState(uri);
    let history = useHistory();

    const handleChange = (event, newValue) => {
        setEstado(newValue);
        history.push(newValue);
    };
  
    return (
        <Box mt={1} mb={2}>
            <Box mt={1} mb={2}>
            <BottomNavigation value={estado} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} showLabel='true'/>
                <BottomNavigationAction label="Tournaments" value="tournaments" icon={<SportsEsportsIcon />} showLabel='true'/>
                <BottomNavigationAction label="Rosters" value="rosters" icon={<PermMediaIcon />} showLabel='true' />
                <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} showLabel='true' />
                <BottomNavigationAction label="Roster Import" value="rosterImport" icon={<SystemUpdateAltIcon />} showLabel='true' />
            </BottomNavigation>            
            </Box>        
            <Divider variant="middle" />
        </Box>
    );
  }
  

  export default LabelBottomNavigation;