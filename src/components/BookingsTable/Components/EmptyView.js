import React from 'react';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { makeStyles } from '@material-ui/styles';



const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 220,
  },
}));

const EmptyView = () => {
  const classes = useStyles();
  return (
    <Alert severity="info" classes={classes}>
      <AlertTitle>No Bookings</AlertTitle>
      There are no bookings for this day
    </Alert>
  );
};

export default EmptyView;
