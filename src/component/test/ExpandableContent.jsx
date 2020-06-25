/* eslint-disable */
import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core/';
import Checkbox from '@material-ui/core/Checkbox';
import MinimizeIcon from '@material-ui/icons/Minimize';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const ExpandableContent = (props) => {
  /*const {
    roster,
  } = props;
  */
    return (
        <ExpansionPanel>         
          <ExpansionPanelSummary>
            <Table>
            <TableBody>           
              <TableRow>
                <TableCell style={{width: '1%'}}><IndeterminateCheckBoxIcon /></TableCell>
                <TableCell colSpan={2}><Typography>Flujo de despacho</Typography></TableCell>
                <TableCell colSpan={3}></TableCell>
              </TableRow>
            </TableBody>
            </Table>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell>Despacho Directo Ripley</TableCell>
                <TableCell><Checkbox /></TableCell>
                <TableCell><Checkbox /></TableCell>
                <TableCell><Checkbox /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell>Despacho Directo Mercado</TableCell>
                <TableCell style={{width: '20%'}}><Checkbox /></TableCell>
                <TableCell style={{width: '20%'}}><Checkbox /></TableCell>
                <TableCell style={{width: '20%'}}><Checkbox /></TableCell>
              </TableRow>              
            </TableBody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>     
    );
}

ExpandableContent.propTypes = {
}