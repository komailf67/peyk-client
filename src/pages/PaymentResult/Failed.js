/* eslint-disable */
import { Button, Card, CardContent, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import history from '../../utils/history';
import queryString from 'query-string';
import CargoActions from '../../redux/actions/cargoActions';
import BankingForm from '../../components/BankingForm';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: { marginTop: '20px' },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  mainGrid: { justifyContent: 'center' },
  title: {
    fontSize: 16,
    marginTop: '20px',
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    fontSize: '50px',
  },
});
const Failed = ({ pay, gatewayData }) => {
  const [cargiId, setCargoId] = useState(false);
  useEffect(() => {
    const params = queryString.parse(history?.location?.search);
    if (params?.cargoId) {
      setCargoId(params.cargoId);
    }
  }, []);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <Grid container spacing={4} className={classes.mainGrid}>
        <Grid item>
          <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
              <ErrorIcon color="secondary" className={classes.icon} />
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                پرداخت ناموفق بود، لطفا دوباره تلاش کنید.
              </Typography>
              <Button type="button" fullWidth variant="contained" color="primary" onClick={() => pay(cargiId)}>
                پرداخت مجدد
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {gatewayData && gatewayData?.data?.form_parameters ? <BankingForm gatewayData={gatewayData.data} /> : null}
    </Container>
    // {bankFormInfo && bankFormInfo.form_parameters ? <BankingForm gatewayData={bankFormInfo} /> : null}
  );
};

const mapStateToProps = (state) => {
  return {
    gatewayData: state.cargo.gatewayData.list,
  };
};
const mapDispatch = (dispatch) => ({
  pay: (cargoId) => dispatch({ type: CargoActions.CARGO.PAY.REQUESTING, payload: cargoId }),
});

export default connect(mapStateToProps, mapDispatch)(Failed);
