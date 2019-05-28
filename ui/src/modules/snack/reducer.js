import {Types} from './actions';

export const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case Types.CLOSE:
      return {
        ...state,
        isOpen: true,
        variant: action.variant,
        message: action.message
      };
    case Types.OPEN:
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
};