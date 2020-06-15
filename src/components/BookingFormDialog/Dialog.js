import React from 'react';
import PropTypes from 'prop-types';

import withWidth from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Title from './Title';



export const Container = withWidth()(({ onClose, title, children, width, component='div' }) => (
  <MuiDialog
    open
    onClose={onClose}
    aria-labelledby="form-dialog-title"
    maxWidth="sm"
    PaperProps={{
      component,
      mx: 1,
    }}
    fullScreen={width === 'xs'}
  >
    <Title id="form-dialog-title" onClose={onClose}>{title}</Title>
    {children}
  </MuiDialog>
));

Container.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};


export const Body = DialogContent;


export const Actions = DialogActions;


export const SubmitButton = props => <Button type="submit" color="primary" {...props} />;


export const CancelButton = props => <Button type="button" color="primary" {...props} />;


export const ResetButton = props => <Button type="reset" color="primary" {...props} />;
