import _ from 'lodash';
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
// import 'react-datasheet/lib/react-datasheet.css';
import {Container, makeStyles} from '@material-ui/core';
import './MatchScoreStyle.css';
import * as mathjs from 'mathjs';
import alphabet from 'alphabet';

//TODO: Agregar Datacheet como componente
//https://nadbm.github.io/react-datasheet/
//https://github.com/nadbm/react-datasheet
//TODO: Se podría abrir el excel en una nueva pantalla y la de 
//tournament valida los roser con hipervínculos y cosas
export const MatchScores = (props) => {
  const {
    grid = [],
  } = props;

  const getScope = (grid) => {
    let scope = {};
    let x = 0;
    //console.log(grid[7][3], 'C7');
    grid.forEach(row => {
      let y = 0;
      if (x > 0){
        row.forEach(cell => {
          if (y > 0 && cell && !isNaN(parseInt(cell.value)) ){
            const key = `${alphabet.upper[y-1]}${x}`;
            scope[key] = parseInt(cell.value);
          }
          y++;
        });
      }
      x++;
    });
    //console.log(scope, 'scope');
    return scope;
  }

  const initScope = getScope(grid);
  const [state, setState] = useState({
    grid: grid,
    scope: initScope,
  });

  useEffect(() => {
    console.log(state, 'state');
    // eslint-disable-next-line
  }, []);

//  const onCellsChanged = (changes) => changes.forEach(({cell, row, col, value}) => console.log("New expression :" + value))
  
  const onCellsChanged = (changes) => {
    const grid = state.grid.map(row => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
      console.log(cell, 'cell->Changed [old]');
      console.log(grid[row][col], 'cell->Changed [new]');
    });
    const scope = getScope(grid);
    console.log(scope, 'On Change')
    setState({ grid, scope });
  };

  const valueRender = (cell) => {
    if (!_.isEmpty(cell) && !_.isEmpty(cell.expr)) {      
      const expr = cell.expr.replace('=', '');
      const scope = state.scope;
      try{
        cell.value = mathjs.evaluate(expr, scope);
      }catch (e){
        console.error('Error al evaluar la función de la celda:',cell.col)
      };
      
      //const scope = _.mapValues(state, (val) => isNaN(val.value) ? 0 : parseFloat(val.value))
      //console.log(scope, 'scope');
    }
    return cell.value;
  };

  const dataRender = (cell) => {
    console.log(cell, 'cell->data Render (Este es para guardar directo en base de datos)');
    return cell.expr;
  };

  return (
    <div>
      <ReactDataSheet
        data={state.grid}
        valueRenderer={valueRender}
        dataRenderer={dataRender}
        onCellsChanged={onCellsChanged}
      />
    </div>
  );
};

MatchScores.propTypes = {
    grid: PropTypes.any.isRequired,
};