import { createMuiTheme } from '@material-ui/core/styles';


export const styles = (theme) => ({
    root: {
        maxWidth: 400,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    justifyContent:'center', 
    alignItems:'center',
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    medium: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },    
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },     
});

export const muiTheme = createMuiTheme({
    typography: {
      subtitle1: {
        fontSize: 12,
      },
      body1: {
        fontWeight: 500,
      },
      button: {
        fontStyle: 'italic',
      },
    },
  });