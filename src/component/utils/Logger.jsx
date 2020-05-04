import React from 'react';
import Log from 'react-log';

export const Logger = ({level='DEBUG', msg=''}) => {
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
            <span
              style={{
                color: 'black',
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'Open Sans, sans-serif',
              }}                
            >
            {' '} [{level}]
            </span>
            {msg}
          </p>
        </Log>
    )
};

export const lolaso = ({level='No label', msg=''}) => {
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