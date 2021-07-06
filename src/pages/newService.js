import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CssBaseline,
  CardActions,
  TextField,
  Button,
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  FormControlLabel,
  Checkbox,
  CardHeader,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DropDownMenu from '../components/menus/DropDownMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minWidth: 275,
    marginBottom: '20px',
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
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Card className={classes.card}>
        {/* <CardHeader title="Shrimp and Chorizo Paella" /> */}
        <Box>
          <DropDownMenu buttonName="انتخاب مسیر" />
        </Box>
      </Card>
      <Card className={classes.card}>
        <CardHeader title="آدرس فرستنده" />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField required id="city" name="city" label="City" fullWidth autoComplete="shipping address-level2" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="state" name="state" label="State/Province/Region" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="address1" name="address1" label="Address line 1" fullWidth autoComplete="shipping address-line1" />
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Card className={classes.card}>
        <CardHeader title="آدرس گیرنده" />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField required id="city" name="city" label="City" fullWidth autoComplete="shipping address-level2" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="state" name="state" label="State/Province/Region" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="address1" name="address1" label="Address line 1" fullWidth autoComplete="shipping address-line1" />
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Card className={classes.card}>
        <CardHeader title="مشخصات بسته" />
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField required id="city" name="city" label="City" fullWidth autoComplete="shipping address-level2" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="state" name="state" label="State/Province/Region" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField required id="address1" name="address1" label="Address line 1" fullWidth autoComplete="shipping address-line1" />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
    // <Container component="main" maxWidth="md">
    //   <CssBaseline />
    //   <div className={classes.paper}>
    //     <Typography component="h1" variant="h5">
    //       ثبت درخواست
    //     </Typography>

    //     <form className={classes.form} noValidate>
    //       <Box>
    //         <DropDownMenu buttonName="انتخاب مسیر" />
    //       </Box>
    //       <FormControl className={classes.formControl} disabled>
    //         <InputLabel id="demo-simple-select-disabled-label">کشور مبدا</InputLabel>
    //         <Select
    //           labelId="demo-simple-select-disabled-label"
    //           id="demo-simple-select-disabled"
    //           value={10}
    //           // onChange={handleChange}
    //         >
    //           <MenuItem value="">
    //             <em>None</em>
    //           </MenuItem>
    //           <MenuItem value={10}>Ten</MenuItem>
    //         </Select>
    //         <div>
    //           <TextField required id="outlined-required" label="شهر" defaultValue="" variant="outlined" />
    //           <TextField required id="outlined-required" label="استان" defaultValue="" variant="outlined" />
    //         </div>
    //         <div>
    //           <TextField required id="outlined-required" label="آدرس" defaultValue="" variant="outlined" />
    //         </div>
    //       </FormControl>
    //     </form>
    //     <form className={classes.form} noValidate>
    //       <Box>
    //         <DropDownMenu buttonName="انتخاب مسیر" />
    //       </Box>
    //       <FormControl className={classes.formControl} disabled>
    //         <InputLabel id="demo-simple-select-disabled-label">کشور مبدا</InputLabel>
    //         <Select
    //           labelId="demo-simple-select-disabled-label"
    //           id="demo-simple-select-disabled"
    //           value={10}
    //           // onChange={handleChange}
    //         >
    //           <MenuItem value="">
    //             <em>None</em>
    //           </MenuItem>
    //           <MenuItem value={10}>Ten</MenuItem>
    //         </Select>
    //         <div>
    //           <TextField required id="outlined-required" label="شهر" defaultValue="" variant="outlined" />
    //           <TextField required id="outlined-required" label="استان" defaultValue="" variant="outlined" />
    //         </div>
    //         <div>
    //           <TextField required id="outlined-required" label="آدرس" defaultValue="" variant="outlined" />
    //         </div>
    //       </FormControl>
    //     </form>
    //     <Button type="button" fullWidth variant="contained" color="primary" className={classes.submit}>
    //       ادامه
    //     </Button>
    //   </div>
    // </Container>
  );
};

export default NewService;
