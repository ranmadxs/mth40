import alphabet from 'alphabet';
import _ from 'lodash';

const xlsHelper = {

  getGridBase: function(axys) {
    let firstRow = [{readOnly: true, value: '', className: 'axys'}];

    for (let index = 0; index < axys.x; index++) {
      firstRow.push({value: alphabet.upper[index], readOnly: true, width: 70, className: 'axys'});
    }
    
    let content =[];
    for (let index = 0; index < axys.y; index++) {
      let contentRow = [{readOnly: true, value: (index + 1), width: 40, className: 'axys'}];
      for (let index2 = 0; index2 < axys.x; index2++) {
        contentRow.push({readOnly: true, value: '', key: `${alphabet.upper[index2]}${index+1}`, expr: ''});
      };
      content.push(contentRow);
      
    }
    let grid= [
      firstRow,
    ];
    grid = grid.concat(content);
    return grid;
  },
  getGridHeader: function(axys) {
    let grid = [];
    let row2 = [
      {readOnly: true, value: 2, width: 40, className: 'axys'}, 
      {readOnly: true, value: 'Most Value Player', className: 'colspawn3', rowSpan: 2},      
      {readOnly: true, value: ''},
      {value: 'Ofensivo', colSpan: 3, readOnly: true, className: 'colspawn2'},
      {readOnly: true, value: ''},
      {value: 'Defensivo', colSpan: 3, readOnly: true, className: 'colspawn1'},
      {readOnly: true, value: ''},
    ];

    let row3 = [
      {readOnly: true, value: 3, width: 40, className: 'axys'}, 
      {readOnly: true, value: ''},
      {readOnly: true, value: 'Kill', className: 'colorr'},
      {readOnly: true, value: 'Wound', className: 'colorg'},
      {readOnly: true, value: 'Objetive', className: 'colorb'},
      {readOnly: true, value: ''},
      {readOnly: true, value: 'Death', className: 'colorr'},
      {readOnly: true, value: 'Wound', className: 'colorg'},
      {readOnly: true, value: 'Saving', className: 'colorb'},
      {readOnly: true, value: ''},
    ];    

    grid[2] = row2;
    grid[3] = row3;
    return grid;
  },

  getUnitRow: function (unitScore, idy) {
    /** Header PartScor */
    console.log(unitScore, 'unitScore');
    const unitName = unitScore.alias?unitScore.alias:unitScore.name;
    let row = [
      {readOnly: true, value: idy, width: 40, className: 'axys'}, 
      {readOnly: true, value: unitScore.mvp.score, className: 'axys'},
      {
        id: `${unitScore.id}`,
        readOnly: false, 
        value: unitName, 
        width: 120, 
        className: 'colspawn5', 
        type:'alias',
        name: unitScore.name,
        unitId: unitScore.unitId
      },
      {
        id: `${unitScore.id}`, type:'offensive', subType:'kill', key: `C${idy}`, 
        readOnly: false, className: 'colorr',        
        value: unitScore.offensive.kill
      },
      {
        id: `${unitScore.id}`, type:'offensive', subType:'wound', key: `D${idy}`,
        readOnly: false, className: 'colorg',
        value: unitScore.offensive.wound
      },
      {
        id: `${unitScore.id}`, type:'offensive', subType:'objetive', key: `E${idy}`,
        readOnly: false, className: 'colorb',
        value: unitScore.offensive.objetive
      },
      {readOnly: true, value: ''},
      {
        id: `${unitScore.id}`, type:'defensive', subType:'death', key: `G${idy}`,
        readOnly: false, className: 'colorr',
        value: unitScore.defensive.death
      },
      {
        id: `${unitScore.id}`, type:'defensive', subType:'wound', key: `H${idy}`,
        readOnly: false, className: 'colorg',
        value: unitScore.defensive.wound
      },
      {
        id: `${unitScore.id}`, type:'defensive', subType:'saving', key: `I${idy}`,
        readOnly: false, className: 'colorb',
        value: unitScore.defensive.saving
      },
      {readOnly: true, value: ''},
    ];    
    return row;
  },

  getParticipantScoreGrid: function(player, y0 = 5){
    const mainFaction = player.roster.mainFaction.name;
    let grid = [];
    /** Header PartScor */
    let row = [
      {readOnly: true, value: y0, width: 40, className: 'axys'}, 
      {readOnly: true, value: ''},
      {readOnly: true, value: mainFaction.toUpperCase(), width: 320, className: 'colspawn4'},      
      {readOnly: true, value: 0, className:'colorr'},
      {readOnly: true, value: 0, className: 'colorg'},
      {readOnly: true, value: 0, className: 'colorb'},
      {readOnly: true, value: ''},
      {readOnly: true, value: 0, className: 'colorr'},
      {readOnly: true, value: 0, className: 'colorg'},
      {readOnly: true, value: 0, className: 'colorb'},
      {readOnly: true, value: ''},
    ];
    let y = y0;
    grid[y] = row;
    const dy = 2;
    let formulas = {
      kill: [], oWound: [], objetive: [],
      death: [], dWound: [], saving: []
    };
    player.units.forEach(unit => {
      y = y + dy;
      formulas.kill.push(`C${y}`);
      formulas.oWound.push(`D${y}`);
      formulas.objetive.push(`E${y}`);
      formulas.death.push(`G${y}`);
      formulas.dWound.push(`H${y}`);
      formulas.saving.push(`I${y}`);
      grid[y] = this.getUnitRow(unit, y);
    });
    grid[y0][3] = {readOnly: true, value: 0, expr: `=${formulas.kill.join('+')}`, className:'colspawn4'};
    grid[y0][4] = {readOnly: true, value: 0, expr: `=${formulas.oWound.join('+')}`, className:'colspawn4'};
    grid[y0][5] = {readOnly: true, value: 0, expr: `=${formulas.objetive.join('+')}`, className:'colspawn4'};

    grid[y0][7] = {readOnly: true, value: 0, expr: `=${formulas.death.join('+')}`, className:'colspawn4'};
    grid[y0][8] = {readOnly: true, value: 0, expr: `=${formulas.dWound.join('+')}`, className:'colspawn4'};
    grid[y0][9] = {readOnly: true, value: 0, expr: `=${formulas.saving.join('+')}`, className:'colspawn4'};

    return grid;
  },

  merge: function (...arrays) {
    let array = [];
    arrays.forEach(arrayElement => {
      let idx = 0;
      for (let index = 0; index < arrayElement.length; index++) {
        const element = arrayElement[index];  
        if (!_.isEmpty(element)) {
          array[idx] = element;
        }
        idx++;
      }
    });
    return array;
  },

  getGridObject: function (props) {
    const {
      axys = {
        x: 10,
        y: 50,
        dy: 2,
      },
      data: { players },
    } = props;
    let gridBase = this.getGridBase(axys);
    let gridHeader = this.getGridHeader(axys);
       
    let grid = this.merge(gridBase, gridHeader);
    let y = 5;
    let playersInfo = [];
    players.forEach(player => {
      let gridPartScore = this.getParticipantScoreGrid(player, y);
      const playerInfo = {
        name: player.roster.mainFaction.name,
        y: y,
        x: 5,
      };
      y = y + axys.dy*(player.units.length + 1);
      grid = this.merge(grid, gridPartScore);
      playersInfo.push(playerInfo);
    });
    
    return {
      grid: grid,
      playersInfo: playersInfo,
    };
  }
};

export default xlsHelper;