import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Container, Tabs, Tab, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { TabPanel } from '../../../components/TabMenu/tabPanel';
import { connect } from 'react-redux';
import CargoActions from '../../../redux/actions/cargoActions';
import CargoTable from '../../../components/Tables/CargoTable';
import BankingForm from '../../../components/BankingForm';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: { marginTop: '20px' },
}));

const Cargo = ({ getCargoes, cargoes, pay, gatewayData }) => {
  const TabsName = ['Create', 'Show'];
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const states = ['pending', 'verified', 'paid', 'shipped', 'delivered', 'rejected'];

  useEffect(() => {
    getCargoes();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container className={classes.container} component="main" maxWidth="xl">
      <div className={classes.root}>
        <Paper square>
          <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} aria-label="disabled tabs example">
            <Tab label="در حال بررسی" {...a11yProps(states.indexOf('pending'))} />
            <Tab label="تایید شده" {...a11yProps(states.indexOf('verified'))} />
            <Tab label="پرداخت شده" {...a11yProps(states.indexOf('paid'))} />
            <Tab label="فرستاده شده" {...a11yProps(states.indexOf('shipped'))} />
            <Tab label="تحویل داده شده" {...a11yProps(states.indexOf('delivered'))} />
            <Tab label="رد شده" {...a11yProps(states.indexOf('rejected'))} />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={states.indexOf('pending')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} />
        </TabPanel>
        <TabPanel value={value} index={states.indexOf('verified')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} pay={(cargoId) => pay(cargoId)} />
        </TabPanel>
        <TabPanel value={value} index={states.indexOf('paid')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} />
        </TabPanel>
        <TabPanel value={value} index={states.indexOf('delivered')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} />
        </TabPanel>
        <TabPanel value={value} index={states.indexOf('shipped')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} />
        </TabPanel>
        <TabPanel value={value} index={states.indexOf('rejected')}>
          <CargoTable cargoes={cargoes} stateEnum={states[value]} />
        </TabPanel>
      </div>
      {gatewayData && gatewayData?.data?.form_parameters ? <BankingForm gatewayData={gatewayData.data} /> : null}
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    cargoes: state.cargo.cargoes.list,
    gatewayData: state.cargo.gatewayData.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCargoes: () => dispatch({ type: CargoActions.CARGO.GET_CARGOES.REQUESTING }),
    pay: (cargoId) => dispatch({ type: CargoActions.CARGO.PAY.REQUESTING, payload: cargoId }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cargo);
