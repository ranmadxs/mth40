export const styles = (theme) => {
  return({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      fabProgress: {
        color: '#3F51B5',
        position: 'absolute',
        top: -7,
        left: -65,
        zIndex: 1,
      },
      root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
      },
      paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
      },
      spanItem: {
        color: '#3F51B5', 'font-size': '12px'
      },
      spanRed: {
        color: '#B07C79', 'font-size': '12px'
      },      
    });
};