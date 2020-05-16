import React from 'react';
import PropTypes from 'prop-types';

import { withStyles  } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Title = withStyles(styles)(({ classes, onClose, id, children }) => (
  <DialogTitle disableTypography className={classes.root}>
    <Typography variant="h6" id={id}>{children}</Typography>
    <IconButton aria-label="close" onClick={onClose} className={classes.closeButton}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
));


Title.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.element,
};


export default Title;
