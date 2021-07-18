/* eslint-disable */
import { Card, CardContent, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
const Success = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Container className={classes.container} component="main" maxWidth="md">
      <Grid container spacing={4} className={classes.mainGrid}>
        <Grid item>
          <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
              <CheckCircleIcon color="primary" className={classes.icon} />
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                پرداخت با موفقیت انجام شد.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Success;
