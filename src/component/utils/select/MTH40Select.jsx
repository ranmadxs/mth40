import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {styles} from './MTH40SelectStyle'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => (styles(theme)));

export const MTH40Select = (props) => {
    const {
        formHelper = 'None', 
        inputLabel = 'None',
        defaultValue = '',
        onChange,
        items = [],
        loading = false,
    } = props;
    const classes = useStyles();
    const [selectedVal, setSelectedVal] = React.useState('');
    useEffect(() => {
        setSelectedVal(defaultValue);
        // eslint-disable-next-line
    }, [items] );

    const handleChange = (event) => {
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
                disabled={loading}
                onChange={handleChange}
            >
                <MenuItem value="">
                    {<span className={classes.spanRed}>[... Seleccione]</span>}
                </MenuItem>
                {items.map((item) =>
                    <MenuItem key={item.id} value={item.id}>
                        {<span className={classes.spanItem}>{item.name}</span>}
                    </MenuItem>
                )}
            </Select>
            {loading && <CircularProgress size={42} className={classes.fabProgress} />}
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