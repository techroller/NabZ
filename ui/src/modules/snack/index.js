import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/CloseIcon';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { makeStyles } from '@material-ui/core/styles';

import actions from './actions';

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const SnackWrapper = (props) => {

  const classes = useStyles();
  const {
    message,
    variant,
    onClose,
    ...other
  } = props;

  const Icon = variantIcon[variant];

  const messageComponent = (
    <span id="client-snackbar" className={classes.message}>
      <Icon className={classnames(classes.icon, classes.iconVariant)} />
      {message}
    </span>
  );

  const closeButton = (
    <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
      <CloseIcon className={classes.icon} />
    </IconButton>
  );

  return (
    <SnackbarContent
      className={classnames(classes[variant], classes.iconVariant)}
      aria-describedby="client-snackbar"
      message={messageComponent}
      action={closeButton}
      {...other}
    />
  );
};

const SnackMachine = (props) => {
  const {
    isOpen,
    variant,
    message,
    handleClose,
  } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={isOpen}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <SnackWrapper
        onClose={handleClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};

SnackMachine.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  handleClose: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    isOpen: state.isOpen,
    variant: state.variant,
    message: state.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleClose: () => dispatch(actions.close())
  };
};

const SnackMachineContainer = connect(mapStateToProps, mapDispatchToProps)(SnackMachine);

export default SnackMachineContainer;