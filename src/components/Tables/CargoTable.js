import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));
const CargoTable = ({ cargoes, stateEnum }) => {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell>آدرس مبدا</TableCell>
              <TableCell>آدرس مقصد</TableCell>
              <TableCell>قیمت بسته</TableCell>
              <TableCell>وزن</TableCell>
              {stateEnum === 'rejected' ? <TableCell>دلیل ریجکت</TableCell> : null}
              {stateEnum === 'verified' ? <TableCell>هزینه</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {cargoes?.data?.result?.map((item, index) =>
              item.state_enum === stateEnum ? (
                <TableRow key={index + 1}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {item.origin_address.address_line_one.substring(0, 30)}
                  </TableCell>
                  <TableCell>{item.destination_address.address_line_one.substring(0, 30)}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                  {stateEnum === 'rejected' ? <TableCell>{item.reject_reason}</TableCell> : null}
                  {stateEnum === 'verified' ? <TableCell>{item.cost}</TableCell> : null}
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CargoTable;
