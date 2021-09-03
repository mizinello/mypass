import {
  GET_ACCOUNTS,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  CLEAR_ACCOUNTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ACCOUNT,
  FILTER_ACCOUNTS,
  CLEAR_FILTER,
  ACCOUNT_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
        loading: false
      };
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [action.payload, ...state.accounts],
        loading: false
      };
    case UPDATE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map(account =>
          account._id === action.payload._id ? action.payload : account
        ),
        current: null,
        loading: false
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          account => account._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_ACCOUNTS:
      return {
        ...state,
        accounts: null,
        filtered: null,
        error: null,
        current: null
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case FILTER_ACCOUNTS:
      return {
        ...state,
        filtered: state.accounts.filter(account => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return account.name.match(regex) || account.type.match(regex);
        })
      };
    case ACCOUNT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
