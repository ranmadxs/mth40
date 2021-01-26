import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {BottomNavigation, Divider, Box} from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import {styles} from './HeaderStyle'
import PropTypes from 'prop-types';

import {
    useHistory
} from "react-router-dom";
// const [estado, setEstado] = React.useState('home');

const useStyles = makeStyles(styles);

export const MainHeader = (props) => {  
    const {
        menu,
        setMenuStatus,
    } = props;
    //console.log(menu, "Menu");
    const classes = useStyles();
    const showLabel = true;
    let history = useHistory();

    const handleChange = (event, newValue) => {
        setMenuStatus(newValue);
        history.push(newValue);
    };
  
    return (
        <Box mt={1} mb={2}>
            <Box mt={1} mb={2}>
            <BottomNavigation value={menu.status} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} showLabel={showLabel} />
                <BottomNavigationAction label="Tournaments" value="/tournaments" icon={<SportsEsportsIcon />} showLabel={showLabel}/>
                <BottomNavigationAction label="Rosters" value="/rosters" icon={<PermMediaIcon />} showLabel={showLabel} />
                <BottomNavigationAction label="Favorites" value="/favorites" icon={<FavoriteIcon />} showLabel={showLabel} />
                <BottomNavigationAction label="Roster Import" value="/rosterImport" icon={<SystemUpdateAltIcon />} showLabel={showLabel} />
                <BottomNavigationAction label="Friendly Games" value="/friendlyGames" icon={<ThumbsUpDownIcon />} showLabel={showLabel} />
            </BottomNavigation>            
            </Box>        
            <Divider variant="middle" />
        </Box>
    );
  }
  
MainHeader.propTypes = {
    menu: PropTypes.object.isRequired,    
    setMenuStatus: PropTypes.func.isRequired,
}