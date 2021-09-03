import React, { useContext, Fragment, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AccountItem from "./AccountItem";
import Spinner from "../layouts/Spinner";
import AccountContext from "../../context/account/accountContext";

const Accounts = () => {
  const accountContext = useContext(AccountContext);
  const { accounts, filtered, getAccounts, loading } = accountContext;

  useEffect(() => {
    getAccounts();
    // eslint-disable-next-line
  }, []);

  if (accounts !== null && accounts.length === 0 && !loading) {
    return <h4>Please add a Note</h4>;
  }
  return (
    <Fragment>
      {accounts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(account => (
                <CSSTransition
                  key={account._id}
                  timeout={500}
                  classNames="item"
                >
                  <AccountItem account={account} />
                </CSSTransition>
              ))
            : accounts.map(account => (
                <CSSTransition
                  key={account._id}
                  timeout={500}
                  classNames="item"
                >
                  <AccountItem account={account} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Accounts;
