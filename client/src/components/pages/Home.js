import React, { useContext, useEffect } from "react";
import Accounts from "../accounts/Accounts";
import AccountForm from "../accounts/AccountForm";
import AccountFilter from "../accounts/AccountFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <div>
        <AccountForm />
      </div>
      <div>
        <AccountFilter />
        <Accounts />
      </div>
    </div>
  );
};

export default Home;
