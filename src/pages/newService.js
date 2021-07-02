import React, { useEffect } from 'react';
import { Grid, Paper, Box, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const NewService = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" xs={6}>
      <Box width="50%">
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
      </Box>
      <Box width="50%">
        <FormControl>
          <InputLabel htmlFor="my-input">Email addrrrress</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
      </Box>
      {/* <Grid item xs={3}> */}

      {/* </Grid> */}
    </Grid>
    // <div className={classes.root}>
    //   <Grid container spacing={3}>
    //     <Grid item xs={12}>
    //       <Box component="div" m={1}>
    //         <FormControl>
    //           <InputLabel htmlFor="my-input">Email address</InputLabel>
    //           <Input id="my-input" aria-describedby="my-helper-text" />
    //           <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
    //         </FormControl>
    //       </Box>
    //       {/* <Paper className={classes.paper}>xs=12</Paper> */}
    //     </Grid>
    //   </Grid>
    // </div>
  );
};

export default NewService;
