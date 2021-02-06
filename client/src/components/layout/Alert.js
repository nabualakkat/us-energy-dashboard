import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = ({ alerts }) => {
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  if (alerts !== null && alerts.length > 0 && open === false) {
    setOpen(true);
  }
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            key={alert.id}
            severity={alert.alertType}
            elevation={6}
            variant="filled"
          >
            {alert.msg}
          </MuiAlert>
        </Snackbar>
      </div>
    ))
  );
};
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);