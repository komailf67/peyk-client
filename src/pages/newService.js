import React, { useEffect } from 'react';
import { CssBaseline, TextField, Button, Typography, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DropDownMenu from '../components/menus/DropDownMenu';

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
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          ثبت درخواست
        </Typography>
        <Box>
          <DropDownMenu buttonName="انتخاب مسیر" />
        </Box>
        <form className={classes.form} noValidate>
          <TextField variant="outlined" margin="normal" required fullWidth id="smsCode" label="کد ارسالی" name="smsCode" autoComplete="smsCode" autoFocus />
          <Button type="button" fullWidth variant="contained" color="primary" className={classes.submit}>
            ادامه
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default NewService;
