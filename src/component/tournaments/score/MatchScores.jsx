import _ from 'lodash';
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
import './MatchScoreStyle.css';
import * as mathjs from 'mathjs';
import alphabet from 'alphabet';
import Snackbar from '@material-ui/core/Snackbar';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import { muiThemeCustom as muiTheme } from './styles';
import { ThemeProvider } from '@material-ui/core/styles';

//TODO: Agregar Datacheet como componente
//https://nadbm.github.io/react-datasheet/
//https://github.com/nadbm/react-datasheet
//TODO: Agregar hipervínculos y cosas al excel
export const MatchScores = (props) => {
  const {
    sheet: {grid = [], playersInfo =[]},
    currentMVP,
    updateUnitScoreOption,
    calculateMVP,
    vertical = 'top',
    horizontal = 'right',
    open = true,
  } = props;

  const getScope = (grid) => {
    let scope = {};
    let x = 0;
    grid.forEach(row => {
      let y = 0;
      if (x > 0) {
        row.forEach(cell => {
          if (y > 0 && cell && !isNaN(parseInt(cell.value)) ) {
            const key = `${alphabet.upper[y-1]}${x}`;
            scope[key] = parseInt(cell.value);
          }
          y++;
        });
      }
      x++;
    });
    return scope;
  }

  const initScope = getScope(grid);
  const [state, setState] = useState({
    grid: grid,
    scope: initScope,
  });

  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);

  useEffect(() => {
  
    if(currentMVP && currentMVP.row) {
      console.log(currentMVP, 'currentMVP');
      let localGrid = state.grid;
      console.log(state.grid, 'grid');
      localGrid[currentMVP.row][1] = {...localGrid[currentMVP.row][1], value: currentMVP.value};
      setState({...state, localGrid});
    }
  // eslint-disable-next-line
  }, [currentMVP]);
  
  const onCellsChanged = (changes) => {
    const grid = state.grid.map(row => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
      const celda = grid[row][col];
      console.log(grid[row], 'grid[row]');
      const unitScore = {
        offensive: {          
          kill: grid[row][3].value,
          wound: grid[row][4].value,
          objetive: grid[row][5].value,
        }, 
        defensive: {
          death: grid[row][7].value,
          wound: grid[row][8].value,
          saving: grid[row][9].value,
        },
        row: row
      };
      celda.alias = value;      
      updateUnitScoreOption(celda);
      calculateMVP(unitScore);
    });
    const scope = getScope(grid);
    setState({ grid, scope });
  };

  const valueRender = (cell) => {
    if (!_.isEmpty(cell) && !_.isEmpty(cell.expr)) {
      const expr = cell.expr.replace('=', '');
      const scope = state.scope;
      try {
        cell.value = mathjs.evaluate(expr, scope);
        const expr1 = grid[playersInfo[0].y][playersInfo[0].x].expr;
        if(expr1 === cell.expr){
          setPlayer1(cell.value);
        }
        const expr2 = grid[playersInfo[1].y][playersInfo[1].x].expr;
        if(expr2 === cell.expr){
          setPlayer2(cell.value);
        }
      } catch (e) {
        console.error('Error al evaluar la función de la celda:',cell.col);
      };
    }
    return cell.value;
  };

  const dataRender = (cell) => {
    return cell.expr;
  };

  const getSnakMsg = () =>{
    return (<>
      <Table style={{border: '1px solid white'}}>
        <TableHead>
          <TableRow>
            <TableCell><Typography>{playersInfo[0].name.substring(0, 6)}</Typography></TableCell>
            <TableCell style={{width: '2%'}}><Typography>V/S</Typography></TableCell>
            <TableCell><Typography>{playersInfo[1].name.substring(0, 6)}</Typography></TableCell>
          </TableRow>          
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{player1}</TableCell>
            <TableCell></TableCell>
            <TableCell>{player2}</TableCell>
           </TableRow>          
        </TableBody>
      </Table>
    </>);
  }
  return (<>
    <ThemeProvider theme={muiTheme}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        message={getSnakMsg()}
        key={vertical + horizontal}
      />
      <ReactDataSheet
        data={state.grid}
        valueRenderer={valueRender}
        dataRenderer={dataRender}
        onCellsChanged={onCellsChanged}
      />
    </ThemeProvider>      
  </>);
};

MatchScores.propTypes = {
  sheet: PropTypes.any.isRequired,
  currentMVP: PropTypes.any.isRequired,
  updateUnitScoreOption: PropTypes.func.isRequired,
  calculateMVP: PropTypes.func.isRequired,
};