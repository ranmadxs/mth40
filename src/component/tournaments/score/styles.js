import { createMuiTheme } from '@material-ui/core/styles';

export const muiThemeCustom = createMuiTheme({
  overrides: {
    MuiSnackbarContent: {
      root: {
        minWidth: '101px !important',
        padding: '5px',
        opacity: '0.75 !important',
      },
    },
    MuiTableCell: {
      body: {
        color: 'white',
      },
      head: {
        color: 'white',
      },      
    },
  }
});