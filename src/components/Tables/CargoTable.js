import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, List, ListItem, Grid, ListItemText } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import RawModal from '../modal/RawModal';
const useStyles = makeStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#ecedef',
    },
    '&:first-child': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  primary: {
    ...theme.typography.subtitle2,
    color: theme.palette.text.hint,
  },
  primaryValue: {
    ...theme.typography.subtitle2,
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  table: {
    minWidth: 650,
  },
  icon: {
    cursor: 'pointer',
  },
}));
const CargoTable = ({ cargoes, stateEnum, pay }) => {
  const [showCargoModalStatus, setShowCargoModalStatus] = useState(false);
  const [selectedCargo, setSelectedCargo] = useState(null);

  const classes = useStyles();

  const handlePayment = (cargoId) => {
    pay(cargoId);
  };
  const handleShowCargo = (cargo) => {
    setShowCargoModalStatus(true);
    setSelectedCargo(cargo);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell>مسیر</TableCell>
              <TableCell>زمان ثبت</TableCell>
              <TableCell>هزینه</TableCell>
              <TableCell>وزن</TableCell>
              {stateEnum === 'rejected' ? <TableCell>دلیل ریجکت</TableCell> : null}
              {stateEnum === 'verified' ? <TableCell>هزینه</TableCell> : null}
              {stateEnum === 'verified' ? <TableCell>پرداخت</TableCell> : null}
              <TableCell>مشاهده</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cargoes?.data?.result?.map((item, index) =>
              item.state.slug === stateEnum ? (
                <TableRow key={index + 1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {item.origin_address.country.name}-{item.destination_address.country.name}
                  </TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                  {stateEnum === 'rejected' ? <TableCell>{item.reject_reason}</TableCell> : null}
                  {stateEnum === 'verified' ? <TableCell>{item.cost}</TableCell> : null}
                  {stateEnum === 'verified' ? (
                    <TableCell>
                      <PaymentIcon className={classes.icon} color="primary" onClick={() => handlePayment(item.id)} />
                    </TableCell>
                  ) : null}
                  <TableCell>
                    <VisibilityIcon className={classes.icon} onClick={() => handleShowCargo(item)} color="primary" />
                  </TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showCargoModalStatus && (
        <RawModal maxWidth={'lg'} status={showCargoModalStatus} cancelButtonFunc={() => setShowCargoModalStatus(false)}>
          <List>
            <ListItem className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <ListItemText classes={{ primary: classes.primary }} primary={'قیمت'} />
                </Grid>
                <Grid item xs={9}>
                  <ListItemText classes={{ primary: classes.primaryValue }} primary={selectedCargo.value} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <ListItemText classes={{ primary: classes.primary }} primary={'زمان'} />
                </Grid>
                <Grid item xs={9}>
                  <ListItemText classes={{ primary: classes.primaryValue }} primary={selectedCargo.created_at} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <ListItemText classes={{ primary: classes.primary }} primary={'آدرس فرستنده'} />
                </Grid>
                <Grid item xs={9}>
                  <ListItemText classes={{ primary: classes.primaryValue }} primary={selectedCargo.origin_address.address_line_one} />
                </Grid>
              </Grid>
            </ListItem>
            <ListItem className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <ListItemText classes={{ primary: classes.primary }} primary={'آدرس گیرنده'} />
                </Grid>
                <Grid item xs={9}>
                  <ListItemText classes={{ primary: classes.primaryValue }} primary={selectedCargo.destination_address.address_line_one} />
                </Grid>
              </Grid>
            </ListItem>
            {/* <ListItem className={classes.root}>
                        <Grid container spacing={1}>
                          <Grid item xs={3}>
                            <ListItemText classes={{ primary: classes.primary }} primary={'توضیحات'} />
                          </Grid>
                          <Grid item xs={9}>
                            <ListItemText classes={{ primary: classes.primaryValue }} primary={'22222222222222222'} />
                          </Grid>
                        </Grid>
                      </ListItem> */}
          </List>
          {/* <CargoTable cargoes={{ data: userCargoes }} changableStates={[]} /> */}
        </RawModal>
      )}
    </>
  );
};

export default CargoTable;
