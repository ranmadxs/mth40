import React from 'react';
import {Logger} from './Logger'
import { CircularProgress } from '@material-ui/core';
import mth40 from '../../config';

require('dotenv').config();

export const MainIframe = () => {
    const [estado, setEstado] = React.useState({loading: true});

    const hideSpinner = () => {
        setEstado({
          loading: false
        });
    };
    const urlIframe = '/rosterImport.html?API_MTH40_URL=' + mth40.config.API_MTH40_URL;
    return (
        <div className="container rsvp-wrapper">
            <Logger msg={estado} />
            {estado.loading ? (
                <CircularProgress/>
            ) : null}
            <iframe
                title='Roster Import'
                src={urlIframe}
                width="100%"
                height="700"
                onLoad={hideSpinner}
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
            />            
        </div>
    );
}