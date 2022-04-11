import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function getDefaultSnackbarSettings() {
  return ({
    isOpen: false,
    status: "error",
    message: "",
    delay: 3000
  })
}

export function changeSnackbarSettings(status, msg, setSnackbarSettingsCallback, delay = 3000) {
  setSnackbarSettingsCallback({
    isOpen: true,
    status: status,
    message: msg,
    delay: delay
  })
}

export function getSnackBarJSX(snackbarSetings, setSnackbarSettingsCallback) {
  if (!snackbarSetings.isOpen)
    return null;
  return (
    <Snackbar
      open={snackbarSetings.isOpen}
      onClose={() => setSnackbarSettingsCallback(getDefaultSnackbarSettings())}
      autoHideDuration={snackbarSetings.delay}
    >
      <Alert onClose={() => setSnackbarSettingsCallback(getDefaultSnackbarSettings())} severity={snackbarSetings.status}>{snackbarSetings.message}</Alert>
    </Snackbar>
  )
}