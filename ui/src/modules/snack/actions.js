
export const Types = {
  OPEN: 'snackmachine/open',
  CLOSE: 'snackmachine/close'
};

const snackController = {
  open: (variant, message) => {
    return {
      type: Types.OPEN,
      variant,
      message
    };
  },
  close: () => {
    return {
      type: Types.CLOSE
    };
  }
}

export const snack = {
  success: (message) => snackController.open('success', message),
  info: (message) => snackController.open('info', message),
  warning: (message) => snackController.open('warning', message),
  error: (message) => snackController.open('error', message),
  close: () => snackController.close
};