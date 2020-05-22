import React from 'react';
import {Logger} from './Logger'
import { CircularProgress } from '@material-ui/core';

require('dotenv').config();

export const MainIframe = () => {
    const [estado, setEstado] = React.useState({loading: true});

    const hideSpinner = () => {
        setEstado({
          loading: false
        });
    };
    const NODE_ENV = process.env.NODE_ENV;
    const urlIframe = '/rosterImport.html?NODE_ENV=' + NODE_ENV;
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