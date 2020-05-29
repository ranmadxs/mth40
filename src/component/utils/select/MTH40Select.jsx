import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {styles} from './MTH40SelectStyle'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => (styles(theme)));

export const MTH40Select = (props) => {
    const {
        formHelper = 'None', 
        inputLabel = 'None',
        onChange,
        items = [],
    } = props;
    const classes = useStyles();
    const [selectedVal, setSelectedVal] = React.useState('');
    const handleChange = (event) => {
        console.log(event.target.value, 'TournamentId');
        setSelectedVal(event.target.value);
        if (onChange) {
            onChange(event.target.value);
        }
    };    
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="input-select-label">{inputLabel}</InputLabel>
            <Select
                labelId="label-simple-select"
                id="id-simple-select"
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

MTH40Select.propTypes = {
    formHelper: PropTypes.string,
    inputLabel: PropTypes.string,
    items: PropTypes.array,
    onChange: PropTypes.func,
  };