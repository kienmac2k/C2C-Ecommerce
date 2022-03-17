import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const SnackbarComp = ({ open, handleClose, msg, status }) => (
  <Snackbar
    sx={{ zIndex: 1000000 }}
    open={open}
    onClose={handleClose}
    autoHideDuration={3000}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <Alert variant="filled" severity={status}>
      {msg}
    </Alert>
  </Snackbar>
);
SnackbarComp.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  msg: PropTypes.string,
  status: PropTypes.string
};
export default SnackbarComp;
