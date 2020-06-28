import _ from 'lodash';
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ReactDataSheet from 'react-datasheet';
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
    updateUnitScoreOption,
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

  useEffect(() => {
    // eslint-disable-next-line
  }, []);
  
  const onCellsChanged = (changes) => {
    const grid = state.grid.map(row => [...row]);
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
      updateUnitScoreOption(grid[row][col]);
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
      } catch (e) {
        console.error('Error al evaluar la función de la celda:',cell.col);
      };
    }
    return cell.value;
  };

  const dataRender = (cell) => {
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
    updateUnitScoreOption: PropTypes.func.isRequired,
};