import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Title from './Title';



const FormDialog = ({ onSubmit, onCancel, title, submitLabel='Submit', cancelLabel='Cancel', children }) => (
  <Dialog open onClose={onCancel} aria-labelledby="form-dialog-title">
    <Title id="form-dialog-title" onClose={onCancel}>{title}</Title>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">{cancelLabel}</Button>
      <Button onClick={onSubmit} color="primary">{submitLabel}</Button>
    </DialogActions>
  </Dialog>
);


FormDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  children: PropTypes.element,
};


export default FormDialog;
