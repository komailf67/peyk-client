import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Container, Tabs, Tab, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { TabPanel } from '../../../components/TabMenu/tabPanel';
import { connect } from 'react-redux';
import CargoActions from '../../../redux/actions/cargoActions';
import CargoTable from '../../../components/Tables/CargoTable';

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

const Cargo = ({ getCargoes, cargoes }) => {
  const TabsName = ['Create', 'Show'];
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
            <Tab label="در حال بررسی" {...a11yProps(0)} />
            <Tab label="تایید شده" {...a11yProps(1)} />
            <Tab label="رد شده" {...a11yProps(2)} />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <CargoTable cargoes={cargoes} stateEnum="pending" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CargoTable cargoes={cargoes} stateEnum="verified" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CargoTable cargoes={cargoes} stateEnum="rejected" />
        </TabPanel>
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    cargoes: state.cargo.cargoes.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCargoes: () => dispatch({ type: CargoActions.CARGO.GET_CARGOES.REQUESTING }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cargo);
