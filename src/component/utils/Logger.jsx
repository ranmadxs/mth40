import React from 'react';
import Log from 'react-log';
import moment from 'moment';

export const Logger = ({level='DEBUG', msg=''}) => {
    let now = moment().format('YYYY-MM-DDTHH:MM:SS');
    console.log(`[${now}] [${level}]`, msg);
    return ('')
};

export const LoggerPrety = ({level='No label', msg=''}) => {
    return (
      <Log>
        <p 
          style={{
            color: 'black',
            fontSize: '12px',
            fontWeight: 'normal',
            fontFamily: 'Open Sans, sans-serif',
          }}
        >
          {msg}  
          <span
            style={{
              color: 'black',
              fontSize: '12px',
              fontWeight: 'bold',
              fontFamily: 'Open Sans, sans-serif',
            }}                
          >
           [{level}]
          </span>
        </p>
      </Log>
    )
  };