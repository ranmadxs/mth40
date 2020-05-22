import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {styles} from './TournamentStyle'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => (styles(theme)));

export const TournamentSelect = (props) => {
    const {
        formHelper = 'None', 
        inputLabel = 'None',
        items = [{id: 1, name: 'Torneo1'}, {id: 2, name: 'Torneo2'}],
    } = props;
    const classes = useStyles();
    const [selectedVal, setSelectedVal] = React.useState('');
    const handleChange = (event) => {
        setSelectedVal(event.target.value);
    };    
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">{inputLabel}</InputLabel>
            <Select
                labelId="tournamenty-simple-select"
                id="tournament-simple-select"
                value={selectedVal}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {items.map((item) =>
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                )}
            </Select>
            <FormHelperText>{formHelper}</FormHelperText>
        </FormControl>        
    );
};