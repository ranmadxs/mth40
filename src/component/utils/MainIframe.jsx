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
    console.log(process.env, "process.env");
    const MTH40_API_HOST = process.env.MTH40_API_HOST || 'http://localhost';
    console.log(MTH40_API_HOST, 'MTH40_API_HOST');
    //const MTH40_API_HOST = process.env.MTH40_API_HOST?process.env.MTH40_API_HOST:"http://localhost";
    const MTH40_API_PORT = process.env.MTH40_API_PORT?process.env.MTH40_API_PORT:4001;
    const urlIframe = '/rosterImport.html?MTH40_API_HOST=' + MTH40_API_HOST + "&MTH40_API_PORT=" + MTH40_API_PORT;
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