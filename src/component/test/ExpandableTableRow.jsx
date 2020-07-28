/* eslint-disable */
import React from 'react'
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core/';
import { ExpandableContent } from './ExpandableContent';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: '0px',
      }
    },    
    MuiTableRow: {
      root: {
        height: 11,
        border: '0px solid red',
        '&.MuiTableRow-footer': {
          borderBottom: 'unset',
        },
      },
    },
    MuiExpansionPanelSummary: {
      content: {
        margin: '0px',
      }
    },
  },
});

export const ExpandableTableRow = (props) => {
  /*const {
    roster,
  } = props;
  */
    return (
      <div>
      <ThemeProvider theme={theme}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}><Typography>Menu</Typography></TableCell>
              <TableCell style={{width: '20%'}}><Typography>Consultar</Typography></TableCell>
              <TableCell style={{width: '20%'}}><Typography>Editar</Typography></TableCell>
              <TableCell style={{width: '20%'}}><Typography>Crear</Typography></TableCell>
            </TableRow> 
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <ExpandableContent />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <ExpandableContent />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>        
        </ThemeProvider>
      </div>
    );
}

ExpandableTableRow.propTypes = {
}