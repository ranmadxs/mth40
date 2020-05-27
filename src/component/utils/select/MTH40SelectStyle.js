export const styles = (theme) => {
  return({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
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
    });
};