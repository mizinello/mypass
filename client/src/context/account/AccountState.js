import React, { useReducer } from "react";
import axios from "axios";
import AccountContext from "./accountContext";
import accountReducer from "./accountReducer";

import {
  GET_ACCOUNTS,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ACCOUNT,
  FILTER_ACCOUNTS,
  CLEAR_ACCOUNTS,
  CLEAR_FILTER,
  ACCOUNT_ERROR
} from "../types";

const AccountState = props => {
  const initialState = {
    accounts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(accountReducer, initialState);

  //Get Account
  const getAccounts = async () => {
    try {
      const res = await axios.get("/api/accounts");
      dispatch({ type: GET_ACCOUNTS, payload: res.data });
    } catch (err) {
      dispatch({ type: ACCOUNT_ERROR, payload: err.response.msg });
    }
  };

  //Add Account
  const addAccount = async account => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/accounts", account, config);
      dispatch({ type: ADD_ACCOUNT, payload: res.data });
    } catch (err) {
      dispatch({ type: ACCOUNT_ERROR, payload: err.response.msg });
    }
  };

  //Delete Account
  const deleteAccount = async id => {
    try {
      await axios.delete(`/api/accounts/${id}`);
      dispatch({ type: DELETE_ACCOUNT, payload: id });
    } catch (err) {
      dispatch({ type: ACCOUNT_ERROR, payload: err.response.msg });
    }
  };

  //Update Account
  const updateAccount = async account => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/accounts/${account._id}`,
        account,
        config
      );
      dispatch({ type: UPDATE_ACCOUNT, payload: res.data });
    } catch (err) {
      dispatch({ type: ACCOUNT_ERROR, payload: err.response.msg });
    }
  };

  //Clear Accounts
  const clearAccounts = () => {
    dispatch({ type: CLEAR_ACCOUNTS });
  };

  //Set current account
  const setCurrent = account => {
    dispatch({ type: SET_CURRENT, payload: account });
  };

  //Clear current Account
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Filter Account
  const filterAccounts = text => {
    dispatch({ type: FILTER_ACCOUNTS, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <AccountContext.Provider
      value={{
        accounts: state.accounts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addAccount,
        deleteAccount,
        setCurrent,
        clearCurrent,
        updateAccount,
        filterAccounts,
        clearFilter,
        getAccounts,
        clearAccounts
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountState;
