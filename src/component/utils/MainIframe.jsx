import React from 'react';
import {Logger} from './Logger'
import { CircularProgress } from '@material-ui/core';

export const MainIframe = () => {
    const [estado, setEstado] = React.useState({loading: true});

    const hideSpinner = () => {
        setEstado({
          loading: false
        });
    };

    return (
        <div className="container rsvp-wrapper">
            <Logger msg={estado} />
            {estado.loading ? (
                <CircularProgress/>
            ) : null}
            <iframe
                title='Roster Import'
                src="/rosterImport.html"
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